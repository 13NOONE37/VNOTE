import React from 'react';
import 'css/login/LoginComponent.css';

import { ReactComponent as Land } from 'resources/Land2.svg';
import Login from './Login';
import Register from './Register';
import Forget from './Forget';

export default function LoginComponent() {
  return (
    <div className='LoginComponent'>
      <Login />
      <Land />
    </div>
  );
}
