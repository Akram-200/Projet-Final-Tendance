const express = require('express')
const { body } = require('express-validator')

const validateMiddleware = require('../middlewares/validate.middleware')
const authController = require('../controllers/auth.controller')

const router = express.Router()

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Email invalide'),
        body('password').notEmpty().withMessage('Mot de passe obligatoire')
    ],
    validateMiddleware,
    authController.login
)

module.exports = router