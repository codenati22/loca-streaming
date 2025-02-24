const express = require("express");
const { streamVideo, listVideos } = require("../controllers/videoController");

const router = express.Router();

router.get("/stream/:videoId", streamVideo);
router.get("/videos", listVideos);

module.exports = router;
