const express = require('express')
const router = express.Router()
const languageController =   require('../controllers/language.controller');

// Retrieve all languages for a user_id
router.get('/:id', languageController.findByUserId);
// Retrieve all languages
router.get('/', languageController.findAll);

module.exports = router