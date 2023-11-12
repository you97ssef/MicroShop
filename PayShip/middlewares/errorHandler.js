const ErrorHandler = (err, req, res, next) => {
    const status = err.statusCode || 500;

    const errMsg = err.message || "Something went wrong";
    res.status(status).json({
        message: errMsg,
        details: err,
        stack: process.env.NODE_ENV === "development" ? err.stack : {},
    });
};

module.exports = ErrorHandler;
