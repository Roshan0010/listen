/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { storage } from "../lib/appwrite";

const MusicCards = ({ item }) => {
  const { title, artist, image_id } = item;
  const [image, setImage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await storage.getFileView(
          import.meta.env.VITE_APPWRITE_BUCKET_ID_PHOTO,
          image_id
        );
        setImage(result); // Assuming `result` contains the image data
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchData();

    // Cleanup logic if needed
    return () => {
      // Cleanup logic here
    };
  }, [image_id]);


  return (
    <div className='w-[19rem] h-[20rem] rounded-xl'>
      <img src={image} alt={`${title} cover`} className='bg-pink-400 w-full h-[80%] rounded-xl object-cover' />
      <div className='flex flex-col mt-2'>
        <div>{title}</div>
        <div className='text-slate-500'>{artist}</div>
      </div>
    </div>
  );
};

export default MusicCards;
