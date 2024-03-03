/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

// const playlist = [
//   { src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
//   { src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
//   { src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
// ];

const MusicPlayerFooter = ({ music, playlist }) => {
  console.log(music);
  console.log(playlist);

  const [currentTrack, setTrackIndex] = useState(0);

  const handleClickNext = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < playlist.length - 1 ? currentTrack + 1 : 0,
    );
  };

  const handleEnd = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < playlist.length - 1 ? currentTrack + 1 : 0,
    );
  };

  return (
    <div className="fixed h-[9%] bottom-0 left-0 right-0 bg-gray-900 text-white  flex items-center justify-between">
      <AudioPlayer
        volume="0.5"
        src={`https://cloud.appwrite.io/v1/storage/buckets/65abfba2b3c80c44c884/files/${playlist[currentTrack].song_id}/view?project=65aba948a96699b1bdd6`}
        showSkipControls
        onClickNext={handleClickNext}
        onEnded={handleEnd}
        onError={() => {
          console.log('play error');
        }}
        // Try other props!
      />
    </div>
  );
};

export default MusicPlayerFooter;
