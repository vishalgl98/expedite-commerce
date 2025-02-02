import {
  throwBadRequest,
  throwUnauthorized,
} from 'common/utils/error.utils.mjs';
const env = process.env;

export const checkHeader = async (event) => {
  try {
    if (!event.headers['Authorization'])
      throwBadRequest('Missing Authorization header in request');
    if (event.headers['Authorization'] === env.X_API_KEY) return true;
    throwUnauthorized('Not valid request');
  } catch (error) {
    throw error;
  }
};
