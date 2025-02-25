# loca-streaming : 🎉

# Video Streaming App with Live Chat

A modern, Twitch-inspired video streaming platform with a robust backend and real-time chat powered by WebSockets. This project showcases a scalable Node.js backend with Express, efficient video streaming, and seamless live chat functionality, designed for a smooth user experience. The main focus is on the **backend architecture** and **WebSocket implementation** to enable real-time communication.

**Social Tag**: `#stay_connected_central_live_chat`  
**Developed by**: Natnael Girma <br>
**Telegram**: <a href="https://t.me/n_a_t_n_a_e_l_g_i_r_m_a">
<img src="![alt text](image-1.png)" width="200" alt="Telegram QR Code"></a>

**Date**: February 2025
**live Demo**: https://loca-stream.onrender.com

---

## Features

- **Video Streaming**: Streams MP4 files with range-based requests for efficient playback.
- **Live Chat**: Real-time messaging using WebSockets, with in-memory chat history.
- **Thumbnail Support**: Dynamic thumbnail serving from a dedicated assets folder.
- **Twitch-Like UI**: Responsive frontend with a homepage for video selection and a video room for playback and chat.
- **Backend Focus**: Modular architecture with Express routes, controllers, and **WebSocket** services.
- **Deployment**: Hosted on Render’s free tier for easy access.

---

## Tech Stack

### Backend

- **Node.js**: Core runtime environment.
- **Express**: Web framework for routing and static file serving.
- **WebSocket (ws)**: Real-time chat functionality.
- **dotenv**: Environment variable management.
- **morgan**: Request logging.
- **express-validator**: Input validation.

### Frontend

- **HTML/CSS/JavaScript**: Lightweight, modular frontend with ES6 imports.
- **Dynamic Imports**: Page-specific logic loading.

### Deployment

- **Render**: Cloud hosting with free tier support.

---

---

## Installation

### Prerequisites

- **Node.js**: v16 or higher.
- **Git**: For cloning the repository.
- Sample video files (`.mp4`) and thumbnails (`.png`/`.jpeg`) for testing.

### Steps

**Clone the Repository**:

```bash
git clone https://github.com/codenati22/loca-streaming.git
cd loca-streaming
npm install
create .env with PORT=3000
npm run dev
Open http://localhost:3000 in your browser.


```

**Sample**
<br>
<img src="public\assets\image\screenshot.png" width="60%" height="auto">
