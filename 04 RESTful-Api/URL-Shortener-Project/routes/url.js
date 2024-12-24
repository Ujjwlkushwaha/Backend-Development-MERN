const express = require("express");
const router = express.Router();
const {
  createShortUrl,
  getOriginalUrl,
  deleteShortUrl,
  urlAnalytics,
  getAnalyticsForm
} = require("../controllers/url.controller");

//✅ POST /url -
//  Generates a new short URL and returns the Shortened URL in  the format example.com/random_id

router.post("/", createShortUrl);

// ✅ GET /url/:shortId - Retrieves the original URL from the short URL
router.get("/:shortId", getOriginalUrl);

// ✅ GET /url/analytics/:shortId - Retrieves the analytics of the short URL
router.get("/analyticsForm", getAnalyticsForm)

router.get("/analytics/:shortId", urlAnalytics);

// ✅ DELETE /url/:shortId - Deletes the short URL
router.delete("/:shortId", deleteShortUrl);

module.exports = router;
