import React from 'react';

import SignOut from 'utils/SignOut.js';

export default function ProfileBar() {
  return (
    <div className='profileBar'>
      <span className='indicator'></span>
      <button>
        <i className='fas fa-sign-out-alt'></i>
        <span>Logout</span>
      </button>
      <button>
        <i className='fas fa-cog'></i>
        <span>Settings</span>
      </button>
      <button>
        <i className='fas fa-user'></i>
        <span>Profile</span>
      </button>
    </div>
  );
}
