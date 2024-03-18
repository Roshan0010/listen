/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom'; // corrected import
import { MusicContext } from '../context/MusicContext';

const CustomDropSearch = ({ data }) => {
  const [filterData, setFilterData] = useState([]);
  const { setMusic, music, setIsPlaying } = useContext(MusicContext);
  const navigate = Navigate; // removed function call
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
  const handleOptionClick = (option) => {
    setMusic(option.song_id);
    setIsPlaying(true);
    // Fix the navigation path
  };
  return (
    <div className="relative inline-block w-[70%] ">
      <input
        placeholder="Kya sunnna hai ?..."
        type="text"
        className="w-full h-14 p-2 rounded-lg bg-gray-700 cursor-pointer flex justify-between
        outline-none"
        onChange={searchHandler}
      />

      {filterData && (
        <div className="absolute z-50 w-full mt-2 bg-gray-700 rounded-3xl shadow-md">
          {filterData.map((option) => (
            <NavLink
              to={`songs/${option.$id}`}
              key={option.$id}
              className="p-2 cursor-pointer bg-[#111827] hover:bg-gray-600 flex round"
              onClick={() => handleOptionClick(option)}
            >
              <div className="  flex justify-between items-center  w-full h-26 rounded-2xl px-8 mt-2 ">
                <p className="text-2xl">{option.title}</p>
                <div className="flex justify-between gap-4">
                  <img
                    loading="lazy"
                    src={`https://cloud.appwrite.io/v1/storage/buckets/65ad5ffc6721b8fd030b/files/${option.image_id}/view?project=65aba948a96699b1bdd6`}
                    alt={`${option.title} cover`}
                    className="bg-pink-400 w-[70px] h-[70px] rounded-xl object-cover"
                  />
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};
export default CustomDropSearch;
