/* eslint-disable react/prop-types */
import React from 'react';
import GenerList from '../components/GenerList';

const PlaylistPage = ({ data, wideImage }) => {
  console.log(data);
  const day = new Date();
  return (
    <div className="h-[90vh] w-[80%] flex flex-col relative mt-4 ">
      <div className="w-full h-[50%] relative">
        {/* <span className="absolute top-[80%] mb-2 text-7xl left-3">
          {image.title}
        </span> */}
        <img
          className="h-[25rem] w-full rounded-xl"
          src={wideImage}
          alt="xyz"
        />
      </div>
      <div className="h-[50%]flex mt-20 flex-col gap-5 overflow-y-auto">
        {data && data.map((item) => <GenerList key={item.id} item={item} />)}
      </div>
    </div>
  );
};

export default PlaylistPage;
