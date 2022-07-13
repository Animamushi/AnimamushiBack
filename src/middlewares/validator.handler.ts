const boom = require('@hapi/boom');

function validatorHandler(schema: any, property: any) {
    return (req: any, _res: any, next: any) => {
        const data = req[property];
        const { error } = schema.validate(data, { abortEarly: false })
        if (error) {
            next(boom.badRequest(error));
        }
        next();
    }
}

export default validatorHandler