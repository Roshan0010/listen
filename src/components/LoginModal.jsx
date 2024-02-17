/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const LoginModal = ({ setLoginModal }) => {
  const [registerOrLogin, setRegisterOrLogin] = useState(true);

  return (
    <div
      className="fixed inset-0 overflow-y-auto bg-gray-900 flex justify-center items-center
      backdrop-blur"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
      onClick={() => setLoginModal(false)}
    >
      <div
        className="bg-gray-900 z-10 h-[25rem] w-[35rem] flex justify-center rounded-xl "
        style={{ backgroundColor: '' }}
        onClick={(e) => e.stopPropagation()}
      >
        {registerOrLogin ? (
          <Login setRegisterOrLogin={setRegisterOrLogin} />
        ) : (
          <Register setRegisterOrLogin={setRegisterOrLogin} />
        )}
      </div>
    </div>
  );
};

export default LoginModal;
