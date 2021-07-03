import React, { useState } from 'react';
import 'css/login/InputSquare.css';
import Login from './Login';
import Register from './Register';
import Forget from './Forget';

export default function InputSquare() {
  const [window, setwindow] = useState(0); //0 is login 1 is register 2 is forget password
  return (
    <div className='inputSquare'>
      <div className='topBar'></div>
      <div className='inputField'>
        <div className='window'>
          {window == 0 ? (
            <Login setcurrentWindow={setwindow} />
          ) : window == 1 ? (
            <Register setcurrentWindow={setwindow} />
          ) : window == 2 ? (
            <Forget setcurrentWindow={setwindow} />
          ) : null}
        </div>
        <footer>
          <ul>
            <li>About</li>
            <li>Terms</li>
            <li>Privacy</li>
            <li>Contact</li>
          </ul>
        </footer>
      </div>
    </div>
  );
}
