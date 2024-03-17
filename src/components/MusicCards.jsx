/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { storage } from '../lib/appwrite';

const MusicCards = ({ item }) => {
  const { title, artist, image_id, $id } = item;
  const [image, setImage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = storage.getFileView(
          import.meta.env.VITE_APPWRITE_BUCKET_ID_PHOTO,
          image_id,
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
  }, [image_id]);

  return (
    <div className="w-[17rem] h-[19rem] rounded-xl">
      <NavLink to={`songs/${$id}`}>
        <img
          loading="lazy"
          src={image}
          alt={`${title} cover`}
          className="bg-pink-400 w-full h-[80%] rounded-xl object-cover"
        />
        <div className="flex flex-col mt-2">
          <div>{title}</div>
          <div className="text-slate-500">{artist.slice(0, 30)}</div>
        </div>
      </NavLink>
    </div>
  );
};

export default MusicCards;
