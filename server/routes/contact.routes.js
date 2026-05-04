const express = require('express')
const { body } = require('express-validator')

const authMiddleware = require('../middlewares/auth.middleware')
const validateMiddleware = require('../middlewares/validate.middleware')
const contactController = require('../controllers/contact.controller')

const router = express.Router()

router.post(
    '/contact',
    [
        body('name').notEmpty().withMessage('Le nom est obligatoire'),
        body('email').isEmail().withMessage('Email invalide'),
        body('message').notEmpty().withMessage('Le message est obligatoire')
    ],
    validateMiddleware,
    contactController.createMessage
)

router.get(
    '/messages',
    authMiddleware,
    contactController.getMessages
)

module.exports = router