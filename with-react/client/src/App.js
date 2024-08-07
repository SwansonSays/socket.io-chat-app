import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import { ConnectionState } from './components/ConnectionState';
import { ConnectionManager } from './components/ConnectionManager';
import { Events } from './components/Events';
import { MyForm } from './components/MyForm';

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onMessage(msg) {
      setMessages(previousMsg => [...previousMsg, msg]);
    }

    socket.on('connection', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('chat message', onMessage);

    return () => {
      socket.off('connection', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('chat message', onMessage);
    };
  }, []);

  return (
    <div className='App'>
      <ConnectionState isConnect={ isConnected } />
      <Events events={ messages } />
      <ConnectionManager />
      <MyForm />
    </div>
  );
}