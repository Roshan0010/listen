/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import { useContext, useEffect, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const MusicPlayerFooter = ({ play, setPlay, music }) => {
  const [isShuffleOn, setIsShuffleOn] = useState(false);

  const handlePlayPause = () => {};

  const handleShuffleToggle = () => {
    setIsShuffleOn(!isShuffleOn);
  };
  console.log(music);
  return (
    <div className="fixed h-[9%] bottom-0 left-0 right-0 bg-gray-900 text-white  flex items-center justify-between">
      <AudioPlayer
        className="bg-gray-900"
        autoPlay
        src={music.href}
        onPlay={(e) => setPlay(true)}
        onPause={(e) => setPlay(false)}
        // other props here
      />
    </div>
  );
};

export default MusicPlayerFooter;
