const errorHandler = (error, req, res, next) => {
  // console.log(error, "<<<<<");
  let status = 500;
  let message = "Internal Server Error";
  if (error.name == "SequelizeValidationError") {
    status = 400;
    message = error.errors[0].message;
  }
  if (error.name == "SequelizeDatabaseError") {
    status = 400;
    message = "Invalid Data Type";
  }
  if (error.name == "SequelizeUniqueConstraintError") {
    status = 400;
    message = "Email must be unique";
  }
  if (error.message == "Email or password is required") {
    status = 400;
    message = error.message;
  }
  if (error.message == "File Required") {
    status = 400;
    message = error.message;
  }
  if (error.name == "SequelizeForeignKeyConstraintError") {
    status = 400;
    message = "Foreign key error";
  }
  // if (error.message == "Unauthorized") {
  //   status = 401;
  //   message = "Unauthorized";
  // }
  if (error.name == "JsonWebTokenError") {
    status = 401;
    message = "Token Error";
  }
  if (error.message == "Email/password invalid") {
    status = 401;
    message = "error invalid email or password";
  }
  if (error.message == "Unauthenticated") {
    status = 401;
    message = "Unauthenticated";
  }
  if (error.message == "Forbidden") {
    status = 403;
    message = "Forbidden";
  }
  if (error.message == "Not Found") {
    status = 404;
    message = "Error not found";
  }
  res.status(status).json({ message });
};

module.exports = errorHandler;
