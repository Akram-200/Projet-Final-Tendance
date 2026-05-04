const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Portfolio API',
            version: '1.0.0',
            description: 'Documentation simple de l’API du portfolio'
        }
    },
    apis: []
}

const swaggerSpec = swaggerJsdoc(options)

swaggerSpec.paths = {
    '/health': {
        get: {
            summary: 'Vérifier que le serveur fonctionne',
            responses: {
                200: {
                    description: 'Serveur en ligne'
                }
            }
        }
    },
    '/api/projects': {
        get: {
            summary: 'Retourne tous les projets',
            responses: {
                200: {
                    description: 'Liste des projets'
                }
            }
        },
        post: {
            summary: 'Créer un projet protégé par JWT',
            responses: {
                201: {
                    description: 'Projet créé'
                }
            }
        }
    },
    '/api/projects/{id}': {
        get: {
            summary: 'Retourne un projet par id',
            responses: {
                200: {
                    description: 'Projet trouvé'
                }
            }
        },
        put: {
            summary: 'Modifier un projet protégé par JWT',
            responses: {
                200: {
                    description: 'Projet modifié'
                }
            }
        },
        delete: {
            summary: 'Supprimer un projet protégé par JWT',
            responses: {
                200: {
                    description: 'Projet supprimé'
                }
            }
        }
    },
    '/api/skills': {
        get: {
            summary: 'Retourne les compétences',
            responses: {
                200: {
                    description: 'Liste des compétences'
                }
            }
        }
    },
    '/api/experiences': {
        get: {
            summary: 'Retourne les expériences',
            responses: {
                200: {
                    description: 'Liste des expériences'
                }
            }
        }
    },
    '/api/contact': {
        post: {
            summary: 'Envoyer un message de contact',
            responses: {
                201: {
                    description: 'Message reçu'
                }
            }
        }
    },
    '/api/messages': {
        get: {
            summary: 'Voir les messages, route protégée',
            responses: {
                200: {
                    description: 'Liste des messages'
                }
            }
        }
    },
    '/api/auth/login': {
        post: {
            summary: 'Connexion admin',
            responses: {
                200: {
                    description: 'Token JWT retourné'
                }
            }
        }
    }
}

function setupSwagger(app) {
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

module.exports = setupSwagger