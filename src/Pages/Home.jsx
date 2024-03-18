/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */

import { useEffect, useState } from 'react';
import MusicCards from '../components/MusicCards';
import GenearCard from '../components/GenearCard';
import TodaysPoster from '../components/TodaysPoster';
import Spinner from '../components/Spinner';
import CustomDropSearch from '../components/customDropSearch';
import { database, storage, id } from '../lib/appwrite';
import PlaylistCard from '../components/PlaylistCard';

// import Weekdays from '../config/weekDb';
// import TodaySong from '../components/TodaySong';

function Home({ data, loading, generImages }) {
  const [gener, setGener] = useState([]);
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    setGener(generImages);
  }, [generImages]);

  useEffect(() => {
    const fetchAllPlaylist = async () => {
      try {
        const docs = await database.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_PLAYLIST_COLLECTION,
        );
        setPlaylist(docs.documents);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllPlaylist();
  }, []);

  return (
    <div className="h-[100%] w-[95%]  ">
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {/* <SearchSong /> */}
          <div className="w-full h-full flex flex-col iem justify-center gap-3 z-100 ">
            <div className="w-full flex justify-center">
              <CustomDropSearch data={data} className="text-slate-800 w-full" />
            </div>

            <span className="text-3xl ml-3">Songs for the Day:</span>
            <div className="  flex mt-2 gap-y-10 ">
              <TodaysPoster />
            </div>
            <span className="text-3xl ml-3">Genere:</span>
            <div className=" flex mt-2 gap-y-10 gap-x-10 overflow-x-auto ">
              <div className="flex w-auto space-x-4">
                {gener &&
                  gener.map((item) => <GenearCard key={item.id} item={item} />)}
              </div>
            </div>
            <span className="text-3xl ml-3">All Playlist:</span>
            <div className="  flex mt-2 gap-y-10 gap-x-10 overflow-x-auto">
              <div className="flex w-auto space-x-4">
                {playlist &&
                  playlist.map((item) => (
                    <PlaylistCard key={item.$id} item={item} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

// Add data to the dependency array

// useEffect(() => {
//   // This will run whenever 'todayData' is updated
//   console.log(todayData);
// }, [todayData]);

// useEffect(() => {
//   // This will run whenever 'data' is updated
//   console.log(gener);
// }, [gener]);
