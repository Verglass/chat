
const io = require('socket.io')(4000, { 
    cors: { 
        origin: "*" 
    } 
})

io.on('connection', socket => {
    socket.on('message', msg => {
        io.emit('message', msg)
    })

    socket.on('room-request', roomId => {
        socket.join(roomId)
        socket.emit('room-joined', roomId)
    })
})
