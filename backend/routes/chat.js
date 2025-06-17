const express = require('express');
const { chatWithAI } = require('../api/chat');
const router = express.Router();

router.post('/', chatWithAI);

module.exports = router;
