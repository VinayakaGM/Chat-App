export const globalErrorHandler = (err, req, res, next) => {
  // err.status ? (err.status = err.status) : (err.status = 500);
  err.statusCode=err.statusCode || 500

  res.status(err.statusCode).json({
    message: err.message,
    stack: err.stack,
  });
};
