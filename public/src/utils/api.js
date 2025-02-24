const BASE_URL = "http://localhost:3000/api";

async function fetchVideos() {
  try {
    const response = await fetch(`${BASE_URL}/videos`);
    if (!response.ok) throw new Error("Failed to fetch videos");
    return await response.json();
  } catch (error) {
    console.error("Error fetching videos:", error);
    return { videos: [] };
  }
}

async function fetchChatHistory() {
  try {
    const response = await fetch(`${BASE_URL}/chat/history`);
    if (!response.ok) throw new Error("Failed to fetch chat history");
    return await response.json();
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return { messages: [] };
  }
}

export { fetchVideos, fetchChatHistory };
