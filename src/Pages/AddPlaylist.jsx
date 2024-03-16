/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const AddPlaylist = ({ data }) => {
  const [filterData, setFilterData] = useState([]);
  const [searchData, setSearchData] = useState(null);
  const [playlistData, setPlaylistData] = useState([]);
  const [playlistName, setPlaylistName] = useState(null); //
  const searchHandler = (event) => {
    const searchString = event.target.value.toLowerCase();

    const tempData = data
      .filter((item) => {
        const titleData = item.title.toLowerCase();
        return titleData.includes(searchString);
      })
      .sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();

        // Check if the search string is at the beginning of the title
        const startsWithA = titleA.startsWith(searchString);
        const startsWithB = titleB.startsWith(searchString);

        if (startsWithA && !startsWithB) {
          return -1; // a comes before b
        }
        if (!startsWithA && startsWithB) {
          return 1; // b comes before a
        }
        // If both or neither start with the search string, sort alphabetically
        return titleA.localeCompare(titleB);
      });

    if (searchString) {
      setFilterData(tempData.slice(0, 5));
    } else {
      setFilterData([]);
    }
  };

  const handleAddSong = (item) => {
    if (!playlistData.includes(item)) {
      setPlaylistData([...playlistData, item]);
    }
  };
  const handleRemoveSong = (item) => {
    // Filter out the item with the given id from the playlistData
    const updatedPlaylistData = playlistData.filter(
      (playlistItem) => playlistItem !== item,
    );
    // Set the updated playlistData
    setPlaylistData(updatedPlaylistData);
  };

  // ram siya ram

  return (
    <div className="w-full h-full flex justify-center gap-3  ">
      <div className="w-[70%]">
        <input
          type="text"
          onChange={searchHandler}
          className="bg-[#111827] w-full h-12 rounded-2xl px-8 outline-none"
          placeholder="Search Songs to Add..."
        />
        <div className="flex flex-col gap-1 z-10">
          {filterData &&
            filterData.map((item, index) => (
              <div
                key={index}
                className="bg-[#3b3e43] p-2 rounded-md flex justify-between px-4 "
              >
                {item.title}
                {!playlistData.includes(item) ? (
                  <button onClick={() => handleAddSong(item)}>+</button>
                ) : (
                  <button onClick={() => handleRemoveSong(item)}>-</button>
                )}
              </div>
            ))}
        </div>

        <div>
          <input
            type="text"
            onChange={(event) => {
              setPlaylistName(event.target.value);
            }}
            className="bg-[#111827] w-full h-12 rounded-2xl px-8 mt-5 outline-none"
            placeholder="Playlist Name"
          />
          <div>
            {playlistData &&
              playlistData.map((item) => (
                <div className="bg-[#111827] flex justify-between items-center  w-full h-32 rounded-2xl px-8 mt-2 ">
                  <p className="text-2xl">{item.title}</p>
                  <div className="flex justify-between gap-4">
                    <img
                      src={`https://cloud.appwrite.io/v1/storage/buckets/65ad5ffc6721b8fd030b/files/${item.image_id}/view?project=65aba948a96699b1bdd6`}
                      alt={`${item.title} cover`}
                      className="bg-pink-400 w-[100px] h-[100px] rounded-xl object-cover"
                    />
                    <button
                      onClick={() => handleRemoveSong(item)}
                      className="text-3xl"
                    >
                      -
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPlaylist;

// {data &&
//   data.map((item) => (
//     <div className="w-[17rem] h-[19rem] rounded-xl">
//       <img
//         src={`https://cloud.appwrite.io/v1/storage/buckets/65ad5ffc6721b8fd030b/files/${item.image_id}/view?project=65aba948a96699b1bdd6`}
//         alt={`${item.title} cover`}
//         className="bg-pink-400 w-full h-[80%] rounded-xl object-cover"
//       />
//       <div className="flex flex-col mt-2">
//         <div>{item.title}</div>
//         <div className="text-slate-500">{item.artist.slice(0, 30)}</div>
//       </div>
//     </div>
//   ))}
