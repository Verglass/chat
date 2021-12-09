import { SocketContext, socket } from './contexts/socket';
import Chat from './components/Chat';
import Room from './components/Room';
import './App.css';

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <Chat />
      <Room />
    </SocketContext.Provider>
  );
}

export default App;
