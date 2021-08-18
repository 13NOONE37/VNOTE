import React from 'react';
import 'css/login/LandingSquare.css';
import ImageLaptop from './ImageLaptop';
// import {ReactComponent as ImageLaptop} from '../../Resources/laptop.svg';

export default function LandingSquare() {
  return (
    <div className='landingSquare'>
      <main>
        <div className='word'>
          <span>
            <h1>VDE</h1>
            <h1>SK</h1>
          </span>
          <h2>What you seek Is placed here</h2>
        </div>
        <div>
          <ImageLaptop />
          <span>
            <button>Read more</button>
            <button classn='singInButton'>Sign in</button>
          </span>
        </div>
      </main>
    </div>
  );
}
