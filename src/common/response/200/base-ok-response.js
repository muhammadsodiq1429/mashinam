"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseOkResponse = void 0;
var BaseOkResponse = /** @class */ (function () {
    function BaseOkResponse(statusCode, message, data, dataName) {
        this.statusCode = statusCode;
        this.message = message;
        this[dataName] = data;
        this.message = message;
        this.statusCode = statusCode;
    }
    return BaseOkResponse;
}());
exports.BaseOkResponse = BaseOkResponse;
