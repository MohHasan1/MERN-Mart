
// If no other middleware handle the request. (this function creates a Error object and pass it to the custom error handler)
// if throw is not used, this function creates an Error object
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error); // calls the next middleware
};

// Overwriting the default express handler: (whenever any throw Error is done, it comes to this function)
const errorHandler = (err, req, res, next) => {
    // In Express.js, res.statusCode represents the HTTP status code of the response. By accessing res.statusCode, you're retrieving the current status code of the response that has been set earlier in the middleware chain.
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let msg = err.message;

    // check for mongoose error:
    if (err.name === 'CastError' && err.kind === 'ObjectId')
    {
        msg = `Resource not found`;
        statusCode = 404;
    }

    res.status(statusCode).json(
        {
            msg,
            stack: process.env.NODE_ENV === 'production' ? 'Stack trace not available in production' : err.stack,
        }
    );
};

export { notFound, errorHandler };