const db = require('../db')

function getSkills(req, res) {
    const skills = db.prepare('SELECT * FROM skills').all()
    res.json(skills)
}

module.exports = {
    getSkills
}