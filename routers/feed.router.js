const express = require('express');
const { authenticate } = require('../services/auth.service');
const { loadFeed } = require('../services/feed.service');

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  await loadFeed(req, res);
});

module.exports = router;
