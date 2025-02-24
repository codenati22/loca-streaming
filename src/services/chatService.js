const WebSocket = require("ws");
const { chatHistory } = require("../controllers/chatController");
const { maxMessageLength } = require("../config");

class ChatService {
  constructor(server) {
    console.log("Initializing WebSocket server...");
    this.wss = new WebSocket.Server({ server });
    this.clients = new Set();

    this.init();
  }

  init() {
    console.log("WebSocket event listeners set up.");
    this.wss.on("connection", (ws) => {
      console.log("New client connected");
      this.clients.add(ws);

      ws.on("message", (message) => {
        try {
          const msg = message.toString("utf8").trim();
          if (!msg) {
            ws.send(JSON.stringify({ error: "Message cannot be empty" }));
            return;
          }
          if (msg.length > maxMessageLength) {
            ws.send(
              JSON.stringify({
                error: `Message too long (max ${maxMessageLength} chars)`,
              })
            );
            return;
          }
          if (
            !/^[a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(msg)
          ) {
            ws.send(JSON.stringify({ error: "Invalid characters in message" }));
            return;
          }

          const formattedMsg = `anonymous: ${msg}`; // Add username prefix
          chatHistory.push({
            text: formattedMsg,
            timestamp: new Date().toISOString(),
          });
          if (chatHistory.length > 1000) chatHistory.shift();

          this.broadcast(formattedMsg); // Broadcast to all, including sender
        } catch (err) {
          console.error("Error processing message:", err);
          ws.send(JSON.stringify({ error: "Failed to process message" }));
        }
      });

      ws.on("close", () => {
        console.log("Client disconnected");
        this.clients.delete(ws);
      });

      ws.on("error", (err) => {
        console.error("WebSocket error:", err);
        this.clients.delete(ws);
      });
    });

    this.wss.on("error", (err) => {
      console.error("WebSocket server error:", err);
    });
  }

  broadcast(message) {
    this.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}

module.exports = ChatService;
