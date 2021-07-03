import React from 'react';
import InputSquare from 'components/login/InputSquare';
import LandingSquare from 'components/login/LandingSquare';

export default function LoginPage() {
  return (
    <div className='loginContainer'>
      <InputSquare />
      <LandingSquare />
    </div>
  );
}
