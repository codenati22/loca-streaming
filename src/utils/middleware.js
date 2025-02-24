const morgan = require("morgan");

const requestLogger = morgan("dev");

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: "Unknown endpoint" });
};

module.exports = { requestLogger, unknownEndpoint };
