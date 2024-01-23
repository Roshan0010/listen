/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { storage } from '../lib/appwrite';

const GenearCard = ({ item }) => {
  const [image, setImage] = useState('');
  return (
    <div className="w-[19rem] h-[20rem] rounded-xl   ">
      <NavLink to={`${item.title}`}>
        <img
          src={item.url}
          alt={`${item.title} cover`}
          className="bg-pink-400 w-full h-[80%] rounded-xl object-cover"
        />
      </NavLink>
      <div className="top-[80%] left-[10%] ml-3  text-4xl">{item.title}</div>
    </div>
  );
};

export default GenearCard;
