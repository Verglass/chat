import { useState, useContext, useEffect } from "react"
import { v4 as uuid } from "uuid"
import { SocketContext } from "../contexts/socket"

export default function Room() {
    const socket = useContext(SocketContext)

    const [room, setRoom] = useState()
    const [isRoomDisplayed, setIsRoomDisplayed] = useState(false)
    const [value, setValue] = useState()

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        joinRoom(value)
    }

    const handleClick = (e) => {
        e.preventDefault()
        joinRoom(uuid())
    }

    const joinRoom = (roomId) => {
        socket.emit('room-request', roomId)
    }

    useEffect(() => {

        socket.on('room-joined', room => {
            setRoom(room)
            setIsRoomDisplayed(true)
        })

    }, [socket])

    return (
        <div className="room-container">
            {isRoomDisplayed &&
                <h1>You are in room: {room}</h1>}
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} />
                <button type="submit">Join a Room</button>
                <button onClick={handleClick}>Create a room</button>
            </form>
        </div>
    )
}
