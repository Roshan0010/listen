/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { TbPlaylist } from 'react-icons/tb';
import { MusicContext } from '../context/MusicContext';

const PlaylistCard = ({ item }) => {
  const { setCurrentPlaylist } = useContext(MusicContext);
  console.log(item);
  return (
    <div className="w-[17rem] h-[17rem] bg-black rounded-xl relative">
      <NavLink
        to={`/playlist/${item.playlist_name}`}
        onClick={() => setCurrentPlaylist(item.allSongs)}
      >
        <img
          loading="lazy"
          src={`https://cloud.appwrite.io/v1/storage/buckets/65ad5ffc6721b8fd030b/files/${item.allSongs[0].image_id}/view?project=65aba948a96699b1bdd6`}
          className="bg-pink-400 w-full h-full rounded-xl object-cover"
        />

        <div className="absolute text-3xl z-40 flex items-end inset-0  justify-center ">
          {item.playlist_name}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
          {/* Search icon component goes here */}
          <TbPlaylist className="w-[50%] h-[50%]" />
        </div>
      </NavLink>
    </div>
  );
};

export default PlaylistCard;

// playlist_name: 'test', $id: '65f710ef97ba87d9ed48', $createdAt: '2024-03-17T15:49:03.632+00:00', $updatedAt: '2024-03-17T15:49:03.632+00:00', $permissions: Array(0), …}
// $id: "65f710ef97ba87d9ed48"
// $permissions
// :
// []
// $updatedAt: "2024-03-17T15:49:03.632+00:00"
// allSongs: (3) [{…}, {…}, {…}]
// playlist_name:"test"
