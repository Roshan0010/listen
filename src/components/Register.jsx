/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import Select from 'react-select';
import { ID } from 'appwrite';
import CustomDropdown from './CustomDropDown';
import { account, database } from '../lib/appwrite';

const Register = ({ setRegisterOrLogin }) => {
  const [userType, setUserType] = useState('listener');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const userOptions = [
    { value: 'listener', label: 'listener' },
    { value: 'contributor', label: 'contributor' },
  ];

  const handleUserChange = (selectedOption) => {
    setUserType(selectedOption.value);
  };

  const RegisterHandle = () => {
    // console.log(name);
    // console.log(email);
    // console.log(password);
    // console.log(userType);
    const res = {
      name,
      email,
      password,
      user: userType,
    };

    const promise = database.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_USER_COLLECTION,
      ID.unique(), // encription dekh lena
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
    <div className="p-4 w-full flex flex-col items-center gap-4  ">
      <p className=" text-5xl"> Register</p>

      <input
        type="text"
        placeholder="Name"
        className="w-[90%] p-2 rounded-lg bg-gray-700"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        className="w-[90%] p-2 rounded-lg bg-gray-700"
        onChange={(e) => setEmail(e.target.value)}
      />

      <CustomDropdown
        options={userOptions}
        value={userType}
        onChange={handleUserChange}
        placeholder={userType}
        className="text-white w-[90%] bg-gray-700"
      />
      <input
        type="password"
        placeholder="password"
        className="w-[90%] p-2 rounded-lg bg-gray-700"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="w-100 flex flex-col">
        <button
          type="button"
          onClick={() => RegisterHandle()}
          className="text-white bg-[#265470] text-xl    hover:bg-[#1D3D55] focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
              mb-3"
        >
          Register
        </button>
        <div className="flex gap-1">
          <p>{`Already have an  account? `} </p>
          <button
            onClick={() => setRegisterOrLogin(true)}
            className=" opacity-[70%]"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
