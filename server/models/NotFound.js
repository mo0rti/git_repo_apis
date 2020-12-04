const Response = require("../models/Response")

class NotFound extends Response {
  constructor() {
    super(false, "Data Not Found");
  }
}

module.exports = NotFound
