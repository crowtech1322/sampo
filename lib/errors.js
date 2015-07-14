var _ = require('underscore');
var createError = require('create-error');

var BaseError  = createError('BaseError', {status: 500, errorCode: 'INTERNAL_ERROR'});

BaseError.prototype.dto = function () {
    if (_.has(this, 'errorData')) return {
        errorCode: this.errorCode,
        errorData: this.errorData
    };
    return { errorCode: this.errorCode };
};

var BadRequest = createError(BaseError, 'BadRequest', {status: 400, errorCode: 'VALIDATION_ERROR'});
var NotFound = createError(BaseError, 'NotFound', {status: 404, errorCode: 'UNKNOWN_RESOURCE'});
var ServerError = createError(BaseError, 'ServerError');

module.exports = {
    BaseError: BaseError,
    BadRequest: BadRequest,
    NotFound: NotFound,
    ServerError: ServerError,
};
