class ResponseDTO {
    constructor(statusCode, statusMessage, data, error) {
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
        this.data = data;
        this.error = error
    }
    create() {
        return Object.assign({}, {
            statusCode: this.statusCode,
            message: this.statusMessage,
            data: this.data,
            error: this.error
        })
    }
    notFound() {
        return Object.assign({}, {
            statusCode: 404,
            message: "Not Found",
            data: {},
            error: "Not Found"
        })
    }
    internalError(){
        return Object.assign({}, {
            statusCode: 500,
            message: "Internal Error",
            data: {},
            error: "Can not make the request"
        })
    }
}

module.exports = ResponseDTO