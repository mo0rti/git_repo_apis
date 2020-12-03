const Response = require("../models/Response")

class NotFound extends Response {
  constructor() {
    super(404, "Not Found");
  }
}

module.exports = NotFound
