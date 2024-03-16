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
    // const res = {
    //   email,
    //   password,
    //   user: userType,
    // };
    const id = email.replace(/@.*$/, '') + password + userType.substring(0, 3);

    const promise = database.getDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_USER_COLLECTION,
      id,
    );

    promise.then(
      (response) => {
        // console.log(response); // Success
      },
      (error) => {
        console.log(error); // Failure
      },
    );
  };

  return (
   
  );
};

export default Login;
