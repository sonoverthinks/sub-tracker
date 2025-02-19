const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Server Error";

  console.error(err);

  // Handle Mongoose bad ObjectId
  if (err.name === "CastError") {
    message = "Resource not found";
    statusCode = 404;
  }

  // Handle Mongoose duplicate key error
  else if (err.code === 11000) {
    message = "Duplicate field value entered";
    statusCode = 400;
  }

  // Handle Mongoose validation error
  else if (err.name === "ValidationError") {
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    statusCode = 400;
  } else {
    // Send the error response
    res.status(statusCode).json({
      success: false,
      error: message,
    });
  }
};

export default errorMiddleware;
