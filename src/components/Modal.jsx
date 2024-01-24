/* eslint-disable no-prototype-builtins */
/* eslint-disable no-continue */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { SiApplemusic } from 'react-icons/si';
import { TbMusicPlus } from 'react-icons/tb';
import { MdOutlineAddAPhoto } from 'react-icons/md';
import { ID } from 'appwrite';
import Select from 'react-select'; // Import react-select
import toast from 'react-hot-toast';
import { database, storage } from '../lib/appwrite';

const Modal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState(''); // New state for artist
  const [photoID, setphotoID] = useState('');
  const [musicID, setMusicID] = useState('');
  const [genre, setGenre] = useState('slow'); // New state for genre

  useEffect(() => {
    // Reset form fields when the modal is closed
    if (!isOpen) {
      setTitle('');
      setArtist('');
      setphotoID('');
      setMusicID('');
      setGenre('slow');
    }
  }, [isOpen]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // New function to handle changes in the artist input field
  const handleArtistChange = (e) => {
    setArtist(e.target.value);
  };

  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];

    const promise = storage.createFile(
      import.meta.env.VITE_APPWRITE_BUCKET_ID_PHOTO,
      ID.unique(),
      selectedPhoto,
    );

    promise.then(
      (response) => {
        setphotoID(response.$id);
      },
      (error) => {
        console.log(error); // Failure
      },
    );
  };
  const handleGenreChange = (selectedOption) => {
    setGenre(selectedOption.value);
  };

  const genreOptions = [
    { value: 'slow', label: 'Slow Songs' },
    { value: 'bhajans', label: 'Bhagans' },
    { value: 'love', label: 'Love Songs' },
    { value: 'english', label: 'english Songs' },
    { value: 'rap', label: 'rap' },

    // Add more genre options as needed
  ];

  const handleMusicChange = (e) => {
    const selectedMusic = e.target.files[0];

    const promise = storage.createFile(
      import.meta.env.VITE_APPWRITE_BUCKET_ID_MUSIC,
      ID.unique(),
      selectedMusic,
    );

    promise.then(
      (response) => {
        setMusicID(response.$id);
      },
      (error) => {
        console.log(error); // Failure
      },
    );
  };

  const handleSubmit = async () => {
    try {
      const res = await database.getDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_DAY_COLLECTION_ID,
        import.meta.env.VITE_APPWRITE_DAY_DOCUMENT_ID,
      );

      let minNum = Infinity;
      let minDay = 'Mon';

      for (const [key, value] of Object.entries(res)) {
        if (typeof value !== 'number') {
          continue;
        }

        const dayNumber = res[key];

        if (dayNumber !== undefined && minNum > value) {
          minNum = value;
          minDay = key;
        }
      }

      const result = {
        title,
        artist,
        genre,
        song_id: musicID,
        image_id: photoID,
        day: minDay,
      };

      const createDocumentPromise = database.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        ID.unique(),
        result,
      );

      await createDocumentPromise;

      const updateDocumentPromise = database.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_DAY_COLLECTION_ID,
        import.meta.env.VITE_APPWRITE_DAY_DOCUMENT_ID,
        { [minDay]: minNum + 1 },
      );

      await updateDocumentPromise;

      console.log('Success');
      toast.success('Successfully created song');
      onClose();
    } catch (error) {
      console.log(error); // Failure
      toast.error('Try again later');
    }
  };
  return (
    <div
      className={`modal w-[30%] inset-0 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="modal-content h-full fixed top-1/2 transform -translate-y-1/2 w-[30%] bg-gray-700 p-8 rounded-md shadow-md transition-opacity duration-1000 ease-in-out">
        <div className="w-full flex flex-col-reverse justify-center   ">
          <div
            className="text-6xl w-full text-center ml-40 mb-10"
            onClick={onClose}
          >
            <SiApplemusic />
          </div>
        </div>

        <form>
          <div className="flex gap-3 mt-5">
            <label className="block mb-2 mr-3 text-2xl">Title:</label>
            <input
              className="w-full p-2 border  bg-slate-800 rounded"
              type="text"
              value={title}
              onChange={handleTitleChange}
            />
          </div>

          {/* New input field for the artist */}
          <div className="flex gap-3 mt-5">
            <label className="block mb-2 text-2xl">Artist:</label>
            <input
              className="w-full p-2 border  bg-slate-800 rounded"
              type="text"
              value={artist}
              onChange={handleArtistChange}
            />
          </div>
          <div className="flex gap-3 mt-5">
            <label className="block mb-2 text-2xl">Genre:</label>
            <Select
              options={genreOptions}
              value={genre}
              onChange={handleGenreChange}
              placeholder={genre}
              className="text-slate-800 w-full"
            />
          </div>

          <div className="flex gap-5 items-center relative">
            <label className="block mt-4 mb-2 text-2xl">Photo:</label>
            <div
              className="mt-6 text-white p-2 rounded-xl h-14 w-14"
              style={{ backgroundColor: photoID ? 'red' : 'green' }}
            >
              <MdOutlineAddAPhoto className="absolute text-4xl  " />
              <input
                className="w-full opacity-0"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </div>
          </div>
          <div className="flex gap-5 items-center relative">
            <label className="block mt-4 mb-2 text-2xl">Music:</label>
            <div
              className="mt-6   text-white p-2 rounded-xl h-14  w-14 "
              style={{ backgroundColor: musicID ? 'red' : 'green' }}
            >
              <TbMusicPlus className="absolute text-4xl  " />
              <input
                className="w-full  border rounded opacity-0 "
                type="file"
                accept="audio/*"
                onChange={handleMusicChange}
              />
            </div>
          </div>

          <div className="bg-re-400 flex justify-center items-center">
            <button
              className="mt-6 w-full bg-blue-500 px-16 text-white p-2 rounded-xl"
              type="button"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
