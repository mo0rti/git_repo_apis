const Response = require("../models/Response")

class InternalError extends Response {
  constructor(error) {
    super(500, "Internal Error", error);
  }
}

module.exports = InternalError
