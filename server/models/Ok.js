const Response = require("../models/Response")

class Ok extends Response {
    constructor(data) {
        super(true, "Success", data);
    }
}

module.exports = Ok
