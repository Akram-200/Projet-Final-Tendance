const db = require('../db')

function getExperiences(req, res) {
    const experiences = db.prepare('SELECT * FROM experiences').all()
    res.json(experiences)
}

module.exports = {
    getExperiences
}