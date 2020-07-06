const express = require('express')
const router = express.Router()
const recruitController =   require('../controllers/recruit.controller');
// Retrieve all recruits
router.get('/', recruitController.findAll);
// Create a new recruit
router.post('/', recruitController.create);
// Retrieve a single recruit with id
router.get('/:id', recruitController.findById);
// Update a recruit with id
router.put('/:id', recruitController.update);
// Delete a recruit with id
router.delete('/:id', recruitController.delete);
//set as favourite
router.put('/setfavourite/:id', recruitController.setFavourite);
//set display
router.put('/display/:id', recruitController.display);
module.exports = router