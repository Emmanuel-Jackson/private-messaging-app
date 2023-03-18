import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

const ENDPOINT = 'https://private-messaging-app.onrender.com/';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a state for loading
  const [delay, setDelay] = useState(8000);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
    
    // Set isLoading to false once the socket connects
    socket.on('connect', () => {
      setIsLoading(false);
    });

    setTimeout(() => {
      setIsLoading(false);
    }, delay);

  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  // Render a loading message if isLoading is true
  if (isLoading) {
    return (
      <div className="loading">
        <h2 style={{ color: 'white', textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>Connecting to server...</h2>
      </div>
    );
  }  

  // Render the chat UI once isLoading is false
  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />  
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />       
      </div>
      <TextContainer users={users}/>
    </div>
  );
}

export default Chat;
