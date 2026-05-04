const jwt = require('jsonwebtoken')

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: 'Token manquant' })
    }

    const token = authHeader.split(' ')[1]

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET || 'change_this_secret')
        req.user = user
        next()
    } catch (error) {
        res.status(401).json({ message: 'Token invalide' })
    }
}

module.exports = authMiddleware