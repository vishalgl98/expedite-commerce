export const ERROR = {
  SYNTAX_ERROR: "SyntaxError",
  BAD_REQUEST: "BadRequest",
  VALIDATION_ERROR: "ValidationError",
  UNAUTHORIZED: "Unauthorized",
  ACCESS_CONTROL_ERROR: "AccessControlError",
  FORBIDDEN: "Forbidden",
  NOT_FOUND: "NotFound",
  DUPLICATE: "Duplicate",
  PRECONDITION_FAILED: "PreconditionFailed",
  UNPROCESSABLE_ENTITY: "UnprocessableEntity",
  TOO_MANY_REQUESTS: "TooManyRequests",
  INTERNAL_SERVER_ERROR: "InternalServerError",
};

export const throwBadRequest = (message = "Bad Request") => {
  const err = new Error(message);
  err.name = ERROR.BAD_REQUEST;
  throw err;
};

export const throwCustomJoiValidationError = (
  message = "ValidationError",
  field_name
) => {
  const err = new Error(message);
  err.name = ERROR.VALIDATION_ERROR;
  err.details = [];
  err.details.push({
    context: { key: field_name },
    type: "custom",
    message,
  });
  throw err;
};

export const throwUnauthorized = (message = "Unauthorized") => {
  const err = new Error(message);
  err.name = ERROR.UNAUTHORIZED;
  throw err;
};

export const throwForbidden = (message = "Forbidden") => {
  const err = new Error(message);
  err.name = ERROR.FORBIDDEN;
  throw err;
};

export const throwNotFound = (itemName = "Item", fullMessage = null) => {
  const message = fullMessage || `${itemName} Not Found`;
  const err = new Error(message);
  err.name = ERROR.NOT_FOUND;
  throw err;
};

export const throwDuplicate = (itemName = "Item") => {
  const err = new Error(`${itemName} Already Exists`);
  err.name = ERROR.DUPLICATE;
  throw err;
};

export const throwPreconditionFailed = (message = "Precondition Failed") => {
  const err = new Error(message);
  err.name = ERROR.PRECONDITION_FAILED;
  throw err;
};

export const throwUnprocessableEntity = (message = "Unprocessable Entity") => {
  const err = new Error(message);
  err.name = ERROR.UNPROCESSABLE_ENTITY;
  throw err;
};

export const throwTooManyRequests = (message = "Too Many Requests") => {
  const err = new Error(message);
  err.name = ERROR.TOO_MANY_REQUESTS;
  throw err;
};

export const throwInternalServerError = (message = "Internal Server Error") => {
  const err = new Error(message);
  err.name = ERROR.INTERNAL_SERVER_ERROR;
  throw err;
};

export default {
  ERROR,
  throwBadRequest,
  throwCustomJoiValidationError,
  throwUnauthorized,
  throwForbidden,
  throwNotFound,
  throwDuplicate,
  throwPreconditionFailed,
  throwUnprocessableEntity,
  throwTooManyRequests,
  throwInternalServerError,
};
