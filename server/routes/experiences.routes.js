const express = require('express')
const experiencesController = require('../controllers/experiences.controller')

const router = express.Router()

router.get('/', experiencesController.getExperiences)

module.exports = router