/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { FaCirclePlay } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';
import { storage } from '../lib/appwrite';

const GenerList = ({ item }) => {
  const [image, setImage] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = storage.getFileView(
          import.meta.env.VITE_APPWRITE_BUCKET_ID_PHOTO,
          item.image_id,
        );
        setImage(result); // Assuming `result` contains the image data
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchData();

    // Cleanup logic if needed
    return () => {
      // Cleanup logic here
    };
  }, []);

  return (
    <div className=" w-full h-[5.5rem]  rounded-xl flex gap-3 justify-between">
      <div className="flex gap-3">
        <img src={image} className="h-[5.2rem] w-[6rem] rounded-lg" />
        <div className="flex flex-col gap-3">
          <span className="text-2xl"> {item.title}</span>
          <span className="italic opacity-40">{item.artist}</span>
        </div>
      </div>
      <NavLink to={`/songs/${item.$id}`} className=" clear-start ml-5 w-[7%]">
        <FaCirclePlay size={50} className="h-[100%] " />
      </NavLink>
    </div>
  );
};

export default GenerList;
