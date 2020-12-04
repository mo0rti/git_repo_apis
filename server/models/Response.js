class Response {
    constructor(isSucceed, message, data) {
        this.isSucceed = isSucceed;
        this.message = message;
        this.data = data;
    }
}

module.exports = Response
