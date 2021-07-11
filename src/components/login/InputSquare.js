import React, { useState } from 'react';
import 'css/login/InputSquare.css';
import Login from './Login';
import Register from './Register';
import Forget from './Forget';

export default function InputSquare() {
  const [window, setwindow] = useState(0);
  return (
    <>
      {window == 0 ? (
        <Login setcurrentWindow={setwindow} />
      ) : window == 1 ? (
        <Register setcurrentWindow={setwindow} />
      ) : window == 2 ? (
        <Forget setcurrentWindow={setwindow} />
      ) : null}
    </>
  );
}
