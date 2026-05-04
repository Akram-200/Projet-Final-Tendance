const express = require('express')
const skillsController = require('../controllers/skills.controller')

const router = express.Router()

router.get('/', skillsController.getSkills)

module.exports = router