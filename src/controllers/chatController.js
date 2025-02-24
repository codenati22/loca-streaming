const chatHistory = [];

const getChatHistory = (req, res) => {
  try {
    const limit = 50;
    const messages = chatHistory.slice(-limit);
    res.status(200).json({ messages });
  } catch (err) {
    console.error("Error fetching chat history:", err);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
};

module.exports = { getChatHistory, chatHistory };
