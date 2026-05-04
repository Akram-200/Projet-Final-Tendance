const express = require('express')
const { body } = require('express-validator')

const authMiddleware = require('../middlewares/auth.middleware')
const validateMiddleware = require('../middlewares/validate.middleware')
const projectsController = require('../controllers/projects.controller')

const router = express.Router()

const projectValidation = [
    body('title').notEmpty().withMessage('Le titre est obligatoire'),
    body('description').notEmpty().withMessage('La description est obligatoire'),
    body('image').notEmpty().withMessage('L’image est obligatoire'),
    body('github').notEmpty().withMessage('Le lien GitHub est obligatoire'),
    body('live').notEmpty().withMessage('Le lien live est obligatoire')
]

router.get('/', projectsController.getProjects)
router.get('/:id', projectsController.getProjectById)

router.post(
    '/',
    authMiddleware,
    projectValidation,
    validateMiddleware,
    projectsController.createProject
)

router.put(
    '/:id',
    authMiddleware,
    projectValidation,
    validateMiddleware,
    projectsController.updateProject
)

router.delete(
    '/:id',
    authMiddleware,
    projectsController.deleteProject
)

module.exports = router