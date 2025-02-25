export function initVideoPlayer() {
  const videoPlayer = document.getElementById("video-player");
  if (!videoPlayer) {
    console.error("Video player element not found");
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const videoFile = urlParams.get("video");

  if (!videoFile) {
    videoPlayer.innerHTML =
      "<p>No video selected. Please choose one from the homepage.</p>";
    return;
  }

  const videoUrl = `/api/stream/${encodeURIComponent(videoFile)}`;
  console.log(`Playing video: ${videoUrl}`);

  videoPlayer.innerHTML = `
    <h3>${videoFile.replace(".mp4", "")}</h3>
    <video controls autoplay width="100%">
      <source src="${videoUrl}" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  `;

  const videoElement = videoPlayer.querySelector("video");
  videoElement.addEventListener("error", (e) => {
    console.error("Video playback error:", e);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initVideoPlayer);
} else {
  initVideoPlayer();
}
