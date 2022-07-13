"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const boom = require('@hapi/boom');
function validatorHandler(schema, property) {
    return (req, _res, next) => {
        const data = req[property];
        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
            next(boom.badRequest(error));
        }
        next();
    };
}
exports.default = validatorHandler;
