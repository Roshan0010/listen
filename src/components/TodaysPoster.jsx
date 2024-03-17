/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { todaysImage, weekmap } from '../config/Data';

const TodaysPoster = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();

  return (
    <NavLink
      to={`/todays-music/${weekmap[dayOfWeek]}`}
      className=" h-[23rem] w-[100%]  bg-zinc-50 rounded-xl "
    >
      <img
        loading="lazy"
        src={todaysImage[dayOfWeek]}
        className="object-cover h-full w-full rounded-xl"
      />
    </NavLink>
  );
};

export default TodaysPoster;
