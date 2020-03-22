const express = require('express')
const router = express.Router()
const certificateController =   require('../controllers/certificate.controller');

// Retrieve all certificates for a user_id
router.get('/:id', certificateController.findByUserId);

module.exports = router