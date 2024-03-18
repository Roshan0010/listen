/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import { FaCirclePlay } from 'react-icons/fa6';
import { useParams } from 'react-router';
import GenerList from '../components/GenerList';
import { MusicContext } from '../context/MusicContext';

const PlaylistPage = ({ data, wideImage, isDataPresent = true }) => {
  const [playlistData, setPlaylistData] = useState([]);
  const { playlist_name } = useParams();

  const { setPlaylist, setMusic, setIsPlaying } = useContext(MusicContext);
  useEffect(() => {
    if (isDataPresent) {
      setPlaylistData(data);
    } else {
      setPlaylistData([]); // Reset playlistData if isDataPresent is false
    }
  }, [data, isDataPresent]);

  function onPLayPlaylist() {
    if (playlistData.length > 0) {
      const songs = playlistData.map((item) => item.song_id);

      setPlaylist(songs);
      setMusic(songs[0]);
      setIsPlaying(true);
      console.log(songs);
    }
  }

  console.log(data);
  return (
    <div className="h-[90vh] w-[80%] flex flex-col relative mt-4 ">
      <div className="w-full  relative">
        <div>
          {playlist_name && (
            <div className="absolute top-[80%] text-5xl left-3">
              {playlist_name}
            </div>
          )}
          <button
            onClick={() => onPLayPlaylist()}
            className="absolute top-[80%] right-3"
          >
            <FaCirclePlay size={50} className="h-[100%] " />
          </button>
        </div>

        <img
          loading="lazy"
          className="h-[25rem] w-full rounded-xl"
          src={wideImage}
        />
      </div>
      <div className="h-[50%]flex mt-20 flex-col gap-5 overflow-y-auto">
        {playlistData &&
          playlistData.map((item) => <GenerList key={item.id} item={item} />)}
      </div>
    </div>
  );
};

export default PlaylistPage;
