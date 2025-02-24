export function renderNavbar() {
  // Add export
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  navbar.innerHTML = `
    <div class="navbar-container">
      <div class="navbar-left">
        <img src="/assets/logo.png" alt="Logo" class="navbar-logo">
        <span class="navbar-title">Streaming App</span>
      </div>
      <div class="navbar-right">
        <a href="/" class="navbar-link">Home</a>
        <a href="/video_room.html" class="navbar-link">Watch</a>
      </div>
    </div>
  `;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderNavbar);
} else {
  renderNavbar();
}
