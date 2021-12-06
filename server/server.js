const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, { 
    cors: { 
        origin: "*" 
    } 
})

io.on('connection', socket => {
    socket.on('message', msg => {
        io.emit('message', msg)
    })
})

server.listen(4000, () => {
    console.log('a user connected on port 4000')
})