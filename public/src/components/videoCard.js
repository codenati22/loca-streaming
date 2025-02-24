function renderVideoCard(video) {
  const card = document.createElement("div");
  card.className = "video-card";
  card.innerHTML = `
    <a href="/video_room.html?video=${encodeURIComponent(video.filename)}">
      <img src="${video.thumbnail}" alt="${
    video.filename
  }" class="video-thumbnail">
      <h3 class="video-title">${video.filename.replace(".mp4", "")}</h3>
    </a>
  `;
  return card;
}

export { renderVideoCard };
