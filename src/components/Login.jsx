/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import CustomDropdown from './CustomDropDown';
import { account, database } from '../lib/appwrite';

const Login = ({ setRegisterOrLogin }) => {
  const [userType, setUserType] = useState('listener');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userOptions = [
    { value: 'listener', label: 'listener' },
    { value: 'contributor', label: 'contributor' },
  ];

  const handleUserChange = (selectedOption) => {
    setUserType(selectedOption.value);
  };

  const LoginHandle = () => {
    // console.log(name);
    // console.log(email);
    // console.log(password);
    // console.log(userType);
    const res = {
      email,
      password,
      user: userType,
    };

    const promise = database.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_USER_COLLECTION,
      ID.unique(),
      res,
    );

    promise.then(
      (response) => {
        console.log(response); // Success
      },
      (error) => {
        console.log(error); // Failure
      },
    );
  };

  return (
    <div className="p-4 w-full flex flex-col items-center gap-10  ">
      <p className=" text-5xl"> Login</p>

      <input
        type="email"
        placeholder="Email"
        className="w-[90%] p-2 rounded-lg bg-gray-700"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        className="w-[90%] p-2 rounded-lg bg-gray-700"
        onChange={(e) => setPassword(e.target.value)}
      />
      <CustomDropdown
        options={userOptions}
        value={userType}
        onChange={handleUserChange}
        placeholder={userType}
        className="text-white w-[90%] bg-gray-700"
      />
      <div className="w-100 flex flex-col">
        <button
          type="button"
          // onClick={() => handleSubmit()}
          className="text-white bg-[#265470] text-xl    hover:bg-[#1D3D55] focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
              mb-3"
        >
          Login
        </button>
        <div className="flex gap-1">
          <p>{`Do not Have an Account? `} </p>
          <button
            onClick={() => setRegisterOrLogin(false)}
            className=" opacity-[70%]"
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
