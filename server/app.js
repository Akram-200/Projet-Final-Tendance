require('dotenv').config()

const express = require('express')
const cors = require('cors')

const projectsRoutes = require('./routes/projects.routes')
const skillsRoutes = require('./routes/skills.routes')
const experiencesRoutes = require('./routes/experiences.routes')
const contactRoutes = require('./routes/contact.routes')
const authRoutes = require('./routes/auth.routes')

const errorMiddleware = require('./middlewares/error.middleware')
const setupSwagger = require('./swagger')

const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}))

app.use(express.json())

app.get('/health', function(req, res) {
    res.json({ status: 'ok' })
})

app.use('/api/projects', projectsRoutes)
app.use('/api/skills', skillsRoutes)
app.use('/api/experiences', experiencesRoutes)
app.use('/api', contactRoutes)
app.use('/api/auth', authRoutes)

setupSwagger(app)

app.use(errorMiddleware)

module.exports = app