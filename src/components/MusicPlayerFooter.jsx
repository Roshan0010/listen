/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const MusicPlayerFooter = ({ music, playlist, play, setPlay }) => {
  console.log(music);
  console.log(playlist);

  const [currentTrack, setCurrentTrack] = useState(0);
  const [playlistState, setPlaylistState] = useState(playlist); // New state for the playlist

  useEffect(() => {
    if (music) {
      // Find the index of the selected song in the original playlist
      const selectedIndex = playlist.findIndex(
        (item) => item.song_id === music,
      );

      if (selectedIndex !== -1) {
        // Clone the playlist and move the selected song to the first position
        const newPlaylist = [...playlist];
        [newPlaylist[0], newPlaylist[selectedIndex]] = [
          newPlaylist[selectedIndex],
          newPlaylist[0],
        ];

        // Update the playlist state to trigger a re-render
        setPlaylistState(newPlaylist);
      }
    }
  }, [music, playlist]);

  const handleClickNext = () => {
    setCurrentTrack((currentTrack + 1) % playlistState.length);
  };

  const handlePrevious = () => {
    if (currentTrack === 0) {
      setCurrentTrack(playlistState.length - 1);
    } else {
      setCurrentTrack((currentTrack - 1) % playlistState.length);
    }
  };

  const handleEnd = () => {
    setCurrentTrack((currentTrack + 1) % playlistState.length);
  };

  // const handleShuffle = () => {
  //   // Shuffle the playlist and update the state
  //   const shuffledPlaylist = [...playlistState].sort(() => Math.random() - 0.5);
  //   setPlaylistState(shuffledPlaylist);
  // };
  // <button onClick={handleShuffle}>Shuffle</button>

  return (
    <div className="fixed h-[9%] bottom-0 left-0 right-0 bg-gray-900 text-white  flex items-center justify-between">
      <AudioPlayer
        className="bg-gray-900"
        volume="0.5"
        src={`https://cloud.appwrite.io/v1/storage/buckets/65abfba2b3c80c44c884/files/${playlistState[currentTrack].song_id}/view?project=65aba948a96699b1bdd6`}
        showSkipControls
        onClickNext={handleClickNext}
        onEnded={handleEnd}
        onClickPrevious={handlePrevious}
        onError={() => {
          console.log('play error');
        }}
        autoPlay
        onPlay={(e) => setPlay(true)}
        onPause={(e) => setPlay(false)}
        progressColor=""
        trackColor="yourCustomColorForTrack"
        volumeColor="yourCustomColorForVolumeControl"
        sliderColor="yourCustomColorForSlider"
        // Try other props!
      />
    </div>
  );
};

export default MusicPlayerFooter;
