
  
import React from 'react';

import { GoPrimitiveDot } from 'react-icons/go';

import './InfoBar.css';


const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
    <GoPrimitiveDot href="/" alt="close icon" color="white" fontSize="1.8em"/>
      <h3>{room}</h3>
    </div>
  </div>
);

export default InfoBar;