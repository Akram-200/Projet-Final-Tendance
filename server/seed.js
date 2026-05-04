require('dotenv').config()

const bcrypt = require('bcrypt')
const db = require('./db')

const projectCount = db.prepare('SELECT COUNT(*) as count FROM projects').get().count

if (projectCount === 0) {
    db.prepare(`
    INSERT INTO projects (title, description, image, github, live)
    VALUES (?, ?, ?, ?, ?)
  `).run(
        'Portfolio étudiant',
        'Un portfolio professionnel créé avec React, Tailwind CSS et une API Express.',
        'https://placehold.co/600x400',
        'https://github.com',
        'https://example.com'
    )

    db.prepare(`
    INSERT INTO projects (title, description, image, github, live)
    VALUES (?, ?, ?, ?, ?)
  `).run(
        'Chat temps réel',
        'Un système de chat simple utilisant Socket.IO.',
        'https://placehold.co/600x400',
        'https://github.com',
        'https://example.com'
    )

    db.prepare(`
    INSERT INTO projects (title, description, image, github, live)
    VALUES (?, ?, ?, ?, ?)
  `).run(
        'API REST',
        'Une API REST avec Express, SQLite, JWT et documentation Swagger.',
        'https://placehold.co/600x400',
        'https://github.com',
        'https://example.com'
    )

    db.prepare('INSERT INTO skills (name, level) VALUES (?, ?)').run('React', 80)
    db.prepare('INSERT INTO skills (name, level) VALUES (?, ?)').run('Node.js', 75)
    db.prepare('INSERT INTO skills (name, level) VALUES (?, ?)').run('Express', 70)
    db.prepare('INSERT INTO skills (name, level) VALUES (?, ?)').run('Socket.IO', 70)
    db.prepare('INSERT INTO skills (name, level) VALUES (?, ?)').run('Docker', 65)

    db.prepare(`
    INSERT INTO experiences (title, place, year)
    VALUES (?, ?, ?)
  `).run(
        'Étudiant en développement web',
        'Collège LaSalle',
        '2024 à 2026'
    )

    db.prepare(`
    INSERT INTO experiences (title, place, year)
    VALUES (?, ?, ?)
  `).run(
        'Projet final full stack',
        'Portfolio professionnel',
        '2026'
    )
}

const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com'
const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

const existingAdmin = db.prepare('SELECT * FROM admins WHERE email = ?').get(adminEmail)

if (!existingAdmin) {
    const hashedPassword = bcrypt.hashSync(adminPassword, 10)

    db.prepare(`
    INSERT INTO admins (email, password)
    VALUES (?, ?)
  `).run(adminEmail, hashedPassword)
}

console.log('Base de données prête')