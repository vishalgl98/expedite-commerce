import { ERROR } from 'common/utils/error.utils.mjs';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Credentials': true,
};

const getStatusCode = ({ error }) => {
  let statusCode = 500;
  switch (error.name) {
    case ERROR.SYNTAX_ERROR:
    case ERROR.BAD_REQUEST:
    case ERROR.VALIDATION_ERROR:
      statusCode = 400;
      break;
    case ERROR.UNAUTHORIZED:
      statusCode = 401;
      break;
    case ERROR.NOT_FOUND:
      statusCode = 404;
      break;
    case ERROR.FORBIDDEN:
    case ERROR.ACCESS_CONTROL_ERROR:
      statusCode = 406;
      break;
    case ERROR.DUPLICATE:
      statusCode = 409;
      break;
    case ERROR.PRECONDITION_FAILED:
      statusCode = 412;
      break;
    case ERROR.UNPROCESSABLE_ENTITY:
      statusCode = 422;
      break;
    case ERROR.TOO_MANY_REQUESTS:
      statusCode = 429;
      break;
    default:
      statusCode = 500;
      break;
  }
  return statusCode;
};

export const successHandler = ({ message, data }, { requestId } = {}) => {
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ message, ...data }),
  };
};

export const customSuccessHandler = ({ message, data }, { requestId } = {}) => {
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ message, data }),
  };
};

export const restErrorHandler = async (
  { error, event = false, context = false },
  { requestId } = {},
) => {
  const errorType =
    error.name || error.errorType || ERROR.INTERNAL_SERVER_ERROR;
  const statusCode = getStatusCode({ error });
  let message = error.message || error || 'Something Went Wrong';
  const errorData = {
    fields: [],
  };
  switch (error.name) {
    case ERROR.VALIDATION_ERROR:
      error.details.forEach((e) => {
        errorData.fields.push({
          key: e.context.key,
          type: e.type,
          message: e.message,
        });
      });
      message = errorData.fields.map((field) => field.message).join(', ');
      break;
  }
  return {
    statusCode,
    headers,
    body: JSON.stringify({
      message,
      errorMessage: message,
      errorType,
      errorData,
      ...error,
    }),
  };
};

export const graphqlErrorHandler = async (
  error,
  event = false,
  context = false,
) => {
  const errorType = error.errorType || ERROR.INTERNAL_SERVER_ERROR;
  const statusCode = getStatusCode({ error });
  let message = error.message || error || 'Something Went Wrong';
  const errorData = {
    fields: [],
  };
  switch (error.errorType) {
    case ERROR.VALIDATION_ERROR:
      error.details.forEach((e) => {
        errorData.fields.push({
          key: e.context.key,
          type: e.type,
          message: e.message,
        });
      });
      message = errorData.fields.map((field) => field.message).join(', ');
      break;
  }  
  return {
    statusCode,
    error: {
      errorType,
      message,
      errorData,
    }
  };
};