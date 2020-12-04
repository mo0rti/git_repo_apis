const Response = require("../models/Response")

class InternalError extends Response {
  constructor(error) {
    super(false, "An internal error occured", error);
  }
}

module.exports = InternalError
