import { fetchVideos } from "../utils/api.js";
import { renderVideoCard } from "../components/videoCard.js";

async function initHome() {
  const videoList = document.getElementById("video-list");
  if (!videoList) return;

  const data = await fetchVideos();
  videoList.innerHTML = "";

  data.videos.forEach((video) => {
    const card = renderVideoCard(video);
    videoList.appendChild(card);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHome);
} else {
  initHome();
}
