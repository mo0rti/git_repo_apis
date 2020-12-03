const Response = require("../models/Response")

class Ok extends Response {
    constructor(data) {
        super(200, "Success", data);
    }
}

module.exports = Ok
