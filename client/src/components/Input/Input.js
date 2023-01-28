import React from 'react'
import { IoSend } from 'react-icons/io5'
import './Input.css';

const Input = ({ setMessage, sendMessage, message }) => (
    <form className='form'>
        <input
            className='input'
            type='text'
            placeholder="Type a message..."
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
        />
        <button className="sendButton" onClick={e => sendMessage(e)}><IoSend/></button>
    </form>
)

export default Input