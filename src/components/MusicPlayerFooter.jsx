import  { useState } from 'react';

const MusicPlayerFooter = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffleOn, setIsShuffleOn] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleShuffleToggle = () => {
    setIsShuffleOn(!isShuffleOn);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img
          className="w-12 h-12 object-cover rounded"
          src="https://source.unsplash.com/random/100x100"
          alt="Album Cover"
        />
        <div>
          <p className="text-sm font-bold">Song Title</p>
          <p className="text-xs">Artist Name</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          className="text-gray-300 hover:text-white focus:outline-none"
          onClick={handleShuffleToggle}
        >
          {isShuffleOn ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 2l10 10M17 2l-10 10"
              />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          )}
        </button>

        <button
          className="text-gray-300 hover:text-white focus:outline-none"
          onClick={handlePlayPause}
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default MusicPlayerFooter;
