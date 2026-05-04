require('dotenv').config()

const http = require('http')
const { Server } = require('socket.io')

const app = require('./app')
const chatSocket = require('./socket/chatSocket')
const videoSocket = require('./socket/videoSocket')

const PORT = process.env.SERVER_PORT || 5000
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173'

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: CLIENT_URL,
        methods: ['GET', 'POST']
    }
})

chatSocket(io)
videoSocket(io)

server.listen(PORT, function() {
    console.log('Serveur lancé sur le port ' + PORT)
})