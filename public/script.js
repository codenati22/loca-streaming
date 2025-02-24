document.addEventListener("DOMContentLoaded", () => {
  console.log("Frontend loaded");
  const page = window.location.pathname.includes("video_room")
    ? "video_room"
    : "home";

  if (page === "home") {
    import("/src/pages/home.js").then((module) => module.initHome());
  } else if (page === "video_room") {
    import("/src/pages/videoPlayer.js").then((module) =>
      module.initVideoPlayer()
    );
    import("/src/components/chat.js").then((module) => module.initChat());
  }

  import("/src/components/navbar.js").then((module) => module.renderNavbar());
});
