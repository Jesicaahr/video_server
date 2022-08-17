const errorHandler = (err, req, res, next) => {
  if (err.name == 'MongoServerError') {
    return res.status(400).json({
      type: 'Bad Request',
      errors: err.message,
    });
  } else if (err.name == 'ValidationError') {
    return res.status(400).json({
      type: 'Bad Request',
      errors: err.message,
    });
  } else if (err.name == 'Not Found') {
    return res.status(404).json({
      type: 'Not Found',
      errors: err.message,
    });
  } else if (err.name == 'Bad Request') {
    return res.status(400).json({
      type: 'Bad Request',
      errors: err.message,
    });
  }
};

module.exports = errorHandler;
