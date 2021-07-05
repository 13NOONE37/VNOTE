import React from 'react';
import 'css/login/LoginComponent.css';
import InputSquare from './InputSquare';
import LandingSquare from './LandingSquare';

export default function LoginComponent() {
  return (
    <div className='loginContainer'>
      <InputSquare />
      <LandingSquare />
    </div>
  );
}
