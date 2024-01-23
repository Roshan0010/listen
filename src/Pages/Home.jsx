/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */

import { useEffect, useState } from 'react';
import MusicCards from '../components/MusicCards';
import { database } from '../lib/appwrite';
import SearchSong from '../components/SearchSong';
import GenearCard from '../components/GenearCard';

function Home({ data, loading, generImages }) {
  const [gener, setGener] = useState([]);

  useEffect(() => {
    setGener(generImages);
  }, [generImages]);

  // useEffect(() => {
  //   // This will run whenever 'data' is updated
  //   console.log(gener);
  // }, [gener]);

  return (
    <div className="h-[100%] w-[90%]  ">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <SearchSong />
          <span className="text-3xl ml-3">All songs:</span>
          <div className="  flex mt-2 gap-y-10 gap-x-10 overflow-x-auto">
            <div className="flex w-auto space-x-4">
              {data &&
                data.map((item) => <MusicCards key={item.id} item={item} />)}
            </div>
          </div>
          <span className="text-3xl ml-3">Gener:</span>
          <div className=" mb-20 mt-2 gap-y-10 gap-x-10 overflow-x-auto ">
            <div className="flex w-auto space-x-4">
              {gener &&
                gener.map((item) => <GenearCard key={item.id} item={item} />)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
