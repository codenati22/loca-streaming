const express = require("express");
const http = require("http");
// const fs = require("fs");
const path = require("path");
const { port } = require("./config");
const videoRoutes = require("./routes/videoRoutes");
const ChatService = require("./services/chatService");
const chatRoutes = require("./routes/chatRoutes");
const { requestLogger, unknownEndpoint } = require("./utils/middleware");
const errorHandler = require("./utils/errorHandler");

// const filePath = path.resolve(__dirname, "../public/index.html");

// const homepage = fs.readFileSync(filePath, "utf-8");

const app = express();
const server = http.createServer(app);
const chatService = new ChatService(server);

app.use(express.static("public"));
app.use("/src", express.static(path.join(__dirname, "public", "src")));
app.use("/api", videoRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Video Streaming App!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.use(unknownEndpoint);

app.use(errorHandler);

server.listen(port, "0.0.0.0", () => {
  console.log(`Server running on ${port}`);
  console.log("WebSocket server should be ready...");
});
