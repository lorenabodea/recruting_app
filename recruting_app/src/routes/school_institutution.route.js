const express = require('express')
const router = express.Router()
const school_institutionController =   require('../controllers/school_institution.controller');

// Retrieve all school_institutions for a user_id
router.get('/:id', school_institutionController.findByUserId);

module.exports = router