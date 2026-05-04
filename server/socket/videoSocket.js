function videoSocket(io) {
    io.on('connection', function(socket) {
        socket.on('video:join', function(room) {
            socket.join(room)
            socket.to(room).emit('video:user-joined')
        })

        socket.on('video:offer', function(data) {
            socket.to(data.room).emit('video:offer', {
                offer: data.offer
            })
        })

        socket.on('video:answer', function(data) {
            socket.to(data.room).emit('video:answer', {
                answer: data.answer
            })
        })

        socket.on('video:ice', function(data) {
            socket.to(data.room).emit('video:ice', {
                candidate: data.candidate
            })
        })
    })
}

module.exports = videoSocket