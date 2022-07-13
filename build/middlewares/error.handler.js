"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boomErrorHandler = exports.errorHandler = exports.logErrors = void 0;
function logErrors(err, _req, _res, next) {
    console.error(err);
    next(err);
}
exports.logErrors = logErrors;
function errorHandler(err, _req, res, _next) {
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    });
}
exports.errorHandler = errorHandler;
function boomErrorHandler(err, _req, res, next) {
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    }
    next(err);
}
exports.boomErrorHandler = boomErrorHandler;
