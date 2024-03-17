/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */

import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const GenearCard = ({ item }) => (
  <div className="w-[19rem] h-[20rem] rounded-xl   ">
    <NavLink to={`/genre/${item.title}`}>
      <img
        loading="lazy"
        src={item.url}
        alt={`${item.title} cover`}
        className="bg-pink-400 w-full h-[80%] rounded-xl object-cover"
      />
    </NavLink>
    <div className="top-[80%] left-[10%] ml-3  text-4xl">{item.title}</div>
  </div>
);

export default GenearCard;
