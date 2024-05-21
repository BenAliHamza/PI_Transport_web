const HttpResponseError = require("./httpResponseError");


const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpResponseError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = errorHandler;
