function chatSocket(io) {
    let usersCount = 0

    io.on('connection', function(socket) {
        usersCount++
        io.emit('users:count', usersCount)

        socket.on('user:joined', function(username) {
            socket.username = username
        })

        socket.on('message:send', function(message) {
            io.emit('message:receive', message)
        })

        socket.on('user:typing', function(username) {
            socket.broadcast.emit('user:typing', username)
        })

        socket.on('disconnect', function() {
            usersCount--
            io.emit('users:count', usersCount)
        })
    })
}

module.exports = chatSocket