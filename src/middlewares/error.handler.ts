function logErrors(err: any, _req: any, _res: any, next: any) {
    console.error(err);
    next(err);
}

function errorHandler(err: any, _req: any, res: any, _next: any) {
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    });
}

function boomErrorHandler(err: any, _req: any, res: any, next: any) {
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    }
    next(err);
}

export { logErrors, errorHandler, boomErrorHandler }