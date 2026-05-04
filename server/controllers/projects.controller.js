const db = require('../db')

function getProjects(req, res) {
    const projects = db.prepare('SELECT * FROM projects').all()
    res.json(projects)
}

function getProjectById(req, res) {
    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id)

    if (!project) {
        return res.status(404).json({ message: 'Projet introuvable' })
    }

    res.json(project)
}

function createProject(req, res) {
    const { title, description, image, github, live } = req.body

    const result = db.prepare(`
    INSERT INTO projects (title, description, image, github, live)
    VALUES (?, ?, ?, ?, ?)
  `).run(title, description, image, github, live)

    res.status(201).json({
        id: result.lastInsertRowid,
        title,
        description,
        image,
        github,
        live
    })
}

function updateProject(req, res) {
    const { title, description, image, github, live } = req.body

    db.prepare(`
    UPDATE projects
    SET title = ?, description = ?, image = ?, github = ?, live = ?
    WHERE id = ?
  `).run(title, description, image, github, live, req.params.id)

    res.json({ message: 'Projet modifié' })
}

function deleteProject(req, res) {
    db.prepare('DELETE FROM projects WHERE id = ?').run(req.params.id)
    res.json({ message: 'Projet supprimé' })
}

module.exports = {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
}