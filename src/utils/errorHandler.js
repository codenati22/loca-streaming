const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.stack);

  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  } else if (err.code === "ENOENT") {
    return res.status(404).json({ error: "Resource not found" });
  }

  res.status(500).json({ error: "Internal server error" });
};

module.exports = errorHandler;
