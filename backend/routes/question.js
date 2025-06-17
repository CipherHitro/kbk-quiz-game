const express = require('express')
const router = express.Router();
const { handleGenerateQuestions, handleFlipQuestions } = require('../controller/question')

router.post('/generate', handleGenerateQuestions)
router.post('/flip', handleFlipQuestions)

module.exports = router;
