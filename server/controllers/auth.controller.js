const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../db')

function login(req, res) {
    const { email, password } = req.body

    const admin = db.prepare('SELECT * FROM admins WHERE email = ?').get(email)

    if (!admin) {
        return res.status(401).json({ message: 'Identifiants invalides' })
    }

    const passwordIsValid = bcrypt.compareSync(password, admin.password)

    if (!passwordIsValid) {
        return res.status(401).json({ message: 'Identifiants invalides' })
    }

    const token = jwt.sign(
        {
            id: admin.id,
            email: admin.email
        },
        process.env.JWT_SECRET || 'change_this_secret',
        {
            expiresIn: '2h'
        }
    )

    res.json({ token })
}

module.exports = {
    login
}