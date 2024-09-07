const errorHandlerMiddleware = (err, req, res, next) => {
  if (err) {
    const statusCode = err.status || 500;
    console.log(err);
    if (statusCode == 500) {
      res
        .status(statusCode)
        .send({ status: "error", message: "internal server error" });
    } else {
      res.status(statusCode).send({ status: "error", message: err.message });
    }
  } else {
    next();
  }
};
export default errorHandlerMiddleware;
