const express = require('express')
const router = express.Router()
const feedbackController =   require('../controllers/feedback.controller');

//add feedback
router.post('/', feedbackController.create);

module.exports = router