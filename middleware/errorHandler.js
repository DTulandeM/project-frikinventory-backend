const ERROR_CODE = {
  CONNECTION_REFUSED: 102,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
  CONFLICT: 409,
};

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE.NOT_FOUND;
    this.name = "NotFoundError";
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE.UNAUTHORIZED;
    this.name = "unauthorizedError";
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE.BAD_REQUEST;
    this.name = "BadRequestError";
  }
}

module.exports = { NotFoundError, UnauthorizedError, BadRequestError };
