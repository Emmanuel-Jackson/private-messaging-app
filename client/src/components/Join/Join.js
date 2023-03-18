
import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Join.css';

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div>
      <div className='header'>
      <h1>Welcome to Chatprivacy</h1>
      <p>Unlimited amount of people can join your room. Keeping your messages private.</p>
      </div>
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Create or Join a room</h1>
        <div className='form-container'>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
          <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <button className={'button mt-20'} type="submit">Sign In</button>
        </Link>
        <p style={{ color: 'red', fontSize: "11.5px" }}>**Inactivity in a private room will expire and messages will not send. Close tab and create a new room if that happens.**</p>
      </div>
    </div>
    </div>
  );
}