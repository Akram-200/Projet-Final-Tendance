function errorMiddleware(error, req, res, next) {
    console.error(error)

    res.status(500).json({
        message: 'Erreur serveur'
    })
}

module.exports = errorMiddleware