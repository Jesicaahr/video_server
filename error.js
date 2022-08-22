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
  } else if (err.name == 'Unauthorized') {
    return res.status(401).json({
      type: 'Unauthorized',
      errors: err.message,
    });
  } else if (err.name == 'Forbidden') {
    return res.status(403).json({
      type: 'Unauthorized',
      errors: err.message,
    });
  } else if (err.name == 'CastError') {
    return res.status(400).json({
      type: 'Bad Request',
      errors: err.message,
    });
  } else {
    return res.status(500).json({
      type: 'Internal Server Error',
      errors: err.message,
    });
  }
};

module.exports = errorHandler;
