import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import './App.css';

const socket = io.connect("http://localhost:4000")


function App() {
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
    <>
      <ul>
        {messageList.map(msg => {
          return <li>{msg}</li>
        })}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" value={currentValue} onChange={handleChange} />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

export default App;
