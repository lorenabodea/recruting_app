const express = require('express')
const router = express.Router()
const jobController =   require('../controllers/job.controller');

// Retrieve all jobs for a user_id
router.get('/:id', jobController.findByUserId);

module.exports = router