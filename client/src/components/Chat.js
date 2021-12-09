import { useState, useEffect, useContext, useCallback } from 'react';
import { SocketContext } from '../contexts/socket';

export default function Chat() {
    const socket = useContext(SocketContext)

    const [messageList, setMessageList] = useState(["hej", "hello"])
    const [currentValue, setCurrentValue] = useState("")
    
    useEffect(() => {
        socket.on('message', msg => {
        setMessageList(messageList => {
            return [...messageList, msg]
        })
        })
    }, [socket])

    const handleChange = (e) => {
        setCurrentValue(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (currentValue !== "") {
        socket.emit('message', currentValue)
        }
    }

    return (
        <div className='chat-container'>
            <ul>
                {messageList.map(msg => {
                return <li>{msg}</li>
                })}
            </ul>
            <form onSubmit={handleSubmit}>
                <input type="text" value={currentValue} onChange={handleChange} />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}
