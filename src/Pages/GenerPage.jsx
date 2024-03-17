/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { FaCirclePlay } from 'react-icons/fa6';
import { storage } from '../lib/appwrite';
import GenerList from '../components/GenerList';
import { MusicContext } from '../context/MusicContext';

const GenerPage = ({ data, generwideImage }) => {
  const [generData, setGenerData] = useState(null);
  const { genre } = useParams();
  const [image, setImage] = useState('');
  const { setPlaylist, setMusic, setIsPlaying } = useContext(MusicContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tempData = data.filter((item) => item.genre === genre);
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

  function onPLayPlaylist() {
    if (generData.length > 0) {
      const songs = generData.map((item) => item.song_id);
      setPlaylist(songs);
      setMusic(songs[0]);
      setIsPlaying(true);
    }
  }

  return (
    <div className="h-[90vh] w-[80%] flex flex-col relative mt-4 ">
      <div className="w-full h-[50%] relative">
        <span className="absolute top-[80%] mb-2 text-7xl left-3">
          {image.title}
        </span>
        <button
          onClick={() => onPLayPlaylist()}
          className="absolute top-[90%] right-3"
        >
          <FaCirclePlay size={50} className="h-[100%] " />
        </button>
        <img
          loading="lazy"
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
