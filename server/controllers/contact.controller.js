const db = require('../db')

function createMessage(req, res) {
    const { name, email, message } = req.body
    const createdAt = new Date().toISOString()

    db.prepare(`
    INSERT INTO messages (name, email, message, createdAt)
    VALUES (?, ?, ?, ?)
  `).run(name, email, message, createdAt)

    res.status(201).json({ message: 'Message reçu' })
}

function getMessages(req, res) {
    const messages = db.prepare('SELECT * FROM messages ORDER BY id DESC').all()
    res.json(messages)
}

module.exports = {
    createMessage,
    getMessages
}