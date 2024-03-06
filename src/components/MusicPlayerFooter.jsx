/* eslint-disable no-useless-escape */
/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import React, { useContext, useEffect, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router';
import { MusicContext } from '../context/MusicContext';

const MusicPlayerFooter = () => {
  const {
    music,
    setMusic,
    prevMusicArr,
    setPrevMusicArr,
    playlist,
    setPlaylist,
    musicIdMap,
  } = useContext(MusicContext);
  console.log(prevMusicArr);
  console.log(music);
  console.log(playlist);
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate(); // Use useNavigate to get the navigate function

  // const [currentTrack, setCurrentTrack] = useState(0);
  // New state for the playlist

  const NavigatetoPage = (song) => {
    if (/^\/songs\/([^\/]+)$/.test(location.pathname)) {
      console.log('here');
      navigate(`/songs/${song}`);
    }
  };

  const handleClickNext = () => {
    setPrevMusicArr([...prevMusicArr, music]);
    // console.log(playlist);
    let index = null;
    for (let i = 0; i < playlist.length; i++) {
      if (playlist[i] === music) {
        index = i;
      }
    }
    console.log(index);
    // console.log(index);
    console.log(index + 1 >= playlist.length);
    console.log(!index);
    if (index === null || index === undefined || index + 1 >= playlist.length) {
      index = 0;
    } else {
      console.log('idhar');
      index += 1;
    }
    console.log(playlist);
    console.log(index);
    console.log(playlist[index]);
    setMusic(playlist[index]);
    NavigatetoPage(musicIdMap.get(playlist[index]));
  };

  const handlePrevious = () => {
    if (prevMusicArr.length > 0) {
      const temp = [...prevMusicArr]; // Copy the array to avoid mutating state directly
      const tempMusic = temp.pop();
      setPrevMusicArr(temp);
      // console.log(musicIdMap[music]);
      setMusic(tempMusic);
      // Callback function is executed after state is updated
      NavigatetoPage(musicIdMap.get(tempMusic));
    }
  };

  return (
    <div className="fixed h-[9%] bottom-0 left-0 right-0 bg-gray-900 text-white  flex items-center justify-between">
      <AudioPlayer
        className="bg-gray-900"
        volume="0.5"
        src={`https://cloud.appwrite.io/v1/storage/buckets/65abfba2b3c80c44c884/files/${music}/view?project=65aba948a96699b1bdd6`}
        showSkipControls
        onClickNext={handleClickNext}
        onEnded={handleClickNext}
        onClickPrevious={handlePrevious}
        onError={() => {
          console.log('play error');
        }}
        autoPlay
      />
    </div>
  );
};

export default MusicPlayerFooter;
