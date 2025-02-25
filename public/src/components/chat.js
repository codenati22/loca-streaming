import { fetchChatHistory } from "../utils/api.js";

function initChat() {
  const chatContainer = document.getElementById("chat");
  if (!chatContainer) return;

  chatContainer.innerHTML = `
    <div id="chat-messages" class="chat-messages"></div>
    <div class="chat-input">
      <input type="text" id="chat-input" placeholder="Type a message...">
      <button id="chat-send">Send</button>
    </div>
  `;

  const messagesDiv = document.getElementById("chat-messages");
  const input = document.getElementById("chat-input");
  const sendBtn = document.getElementById("chat-send");

  const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  const wsHost = window.location.host;
  const ws = new WebSocket(`${wsProtocol}//${wsHost}`);

  ws.onopen = () => console.log("Chat WebSocket connected");
  ws.onmessage = (event) => {
    const message = event.data;
    addMessage(message);
  };
  ws.onerror = (err) => console.error("Chat WebSocket error:", err);
  ws.onclose = () => console.log("Chat WebSocket closed");

  fetchChatHistory().then((data) => {
    data.messages.forEach((msg) => addMessage(msg.text));
    scrollToBottom();
  });

  function sendMessage() {
    const message = input.value.trim();
    if (message && ws.readyState === WebSocket.OPEN) {
      ws.send(message);
      input.value = "";
    }
  }

  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  function addMessage(text) {
    const msg = document.createElement("p");
    msg.textContent = text;
    messagesDiv.appendChild(msg);
    scrollToBottom();
  }

  function scrollToBottom() {
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initChat);
} else {
  initChat();
}

export { initChat };
