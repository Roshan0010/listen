/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { storage } from '../lib/appwrite';
import GenerList from '../components/GenerList';

const GenerPage = ({ data, generwideImage }) => {
  const [generData, setGenerData] = useState(null);
  const { genre } = useParams();
  const [image, setImage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tempData = data.filter((item) => item.genre === genre);
        console.log(tempData);
        // Use setGenerData to update the state with the filtered data
        setGenerData(tempData);
        const photo = generwideImage.filter((item) => item.title === genre);
        console.log(photo[0].url);
        setImage(photo[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the async function
    fetchData();
  }, [data, genre]); // Add data and genre to the dependency array

  return (
    <div className="h-[90vh] w-[80%] flex flex-col relative mt-4 ">
      <div className="w-full h-[50%] relative">
        <span className="absolute top-[80%] mb-2 text-7xl left-3">
          {image.title}
        </span>
        <img
          className="h-[25rem] w-full rounded-xl"
          src={image.url}
          alt={image.title}
        />
      </div>
      <div className="h-[50%]flex mt-20 flex-col gap-5 overflow-y-auto">
        {generData &&
          generData.map((item) => <GenerList key={item.id} item={item} />)}
      </div>
    </div>
  );
};

export default GenerPage;
