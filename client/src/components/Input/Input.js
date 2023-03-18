import React, { useState, useEffect } from 'react';
import { IoSend } from 'react-icons/io5';
import './Input.css';
import io from 'socket.io-client';
import debounce from 'lodash/debounce';
import typingIndicator from './typing-indicator.gif';
import messageSound from './message-sound.mp3';

const socket = io('https://private-messaging-app.onrender.com');

const useTypingFeature = (name) => {
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsername, setTypingUsername] = useState('');

  useEffect(() => {
    let timeout;

    socket.on('userTyping', (data) => {
      setIsTyping(true);
      setTypingUsername(data.username);
    });

    socket.on('userStopTyping', (data) => {
      setIsTyping(false);
      setTypingUsername('');

      // Clear the timeout if it exists
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
    });

    return () => {
      socket.off('userTyping');
      socket.off('userStopTyping');

      // Clear the timeout if it exists
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
    };
  }, []);

  const handleTyping = debounce((e) => {
    if (e.target.value !== '') {
      socket.emit('typing', { username: name, id: socket.id });
    } else {
      socket.emit('stopTyping', { id: socket.id });
    }

    // Start a timeout to stop the typing notification
    setTimeout(() => {
      socket.emit('stopTyping', { id: socket.id });
    }, 5000);
  }, 500);

  return { isTyping, typingUsername, handleTyping };
};

const Input = ({ setMessage, sendMessage, message, name }) => {
  const { isTyping, typingUsername, handleTyping } = useTypingFeature(name);

  const [messageAudio] = useState(new Audio(messageSound));

  const handleSendMessage = (event) => {
    event.preventDefault();

    if (message) {
      messageAudio.play(); // Play the message sound
      sendMessage(event);
    }
  };

  return (
    <>
      <div>
        {isTyping && (
          <img
            src={typingIndicator}
            alt="Typing Indicator"
            style={{ width: '75px', height: '50px', marginLeft: '10px', padding: '5px' }}
          />
        )}
      </div>
      <form className='form'>
        <input
          className='input'
          type='text'
          placeholder='Type a message...'
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
          onKeyPress={(event) =>
            event.key === 'Enter' ? handleSendMessage(event) : null
          }
          onKeyUp={handleTyping}
        />
        <button className='sendButton' onClick={handleSendMessage}>
          <IoSend />
        </button>
      </form>
    </>
  );
};

export default Input;
