
const io = require('socket.io')(4000, {
    cors: {
        origin: "*"
    }
})

io.on('connection', socket => {
    let room = socket.id

    socket.on('message', msg => {
        io.to(room).emit('message', msg)
    })

    socket.on('room-request', roomId => {
        socket.join(roomId)
        room = roomId
        socket.emit('room-joined', roomId)
    })
})
