
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { SiApplemusic } from 'react-icons/si';
import { TbMusicPlus } from 'react-icons/tb';
import { MdOutlineAddAPhoto } from 'react-icons/md';
import { client } from '../lib/appwrite';
import { ID, Storage } from 'appwrite';

const Modal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState(''); // New state for artist
  // const [photo, setPhoto] = useState(null);
  // const [music, setMusic] = useState(null);
  const [photoID,setphotoID]=useState('');
  const [musicID,setMusicID]=useState('');

  useEffect(() => {
    // Reset form fields when the modal is closed
    if (!isOpen) {
      setTitle('');
      setArtist('');
      setphotoID('');
      setMusicID('null');
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
    const storage = new Storage(client);

    const promise = storage.createFile(import.meta.env.VITE_APPWRITE_BUCKET_ID_MUSIC,ID.unique(), selectedPhoto);


promise.then(function (response) {
    setphotoID(response.$id);
}, function (error) {
    console.log(error); // Failure
});

  };





  const handleMusicChange = (e) => {
    const selectedMusic = e.target.files[0];
    const storage = new Storage(client);

    const promise = storage.createFile(import.meta.env.VITE_APPWRITE_BUCKET_ID_MUSIC,ID.unique(), selectedMusic);


promise.then(function (response) {
    setMusicID(response.$id);
    console.log(response.$id);
}, function (error) {
    console.log(error); // Failure
});
  };

  const handleSubmit = () => {
    console.log('Title:', title);
    console.log('Artist:', artist);
    console.log('Photoid:', photoID);
    console.log('Musicid:', musicID);

    onClose();
  };

  return (
    <div className={`modal w-[30%] inset-0 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div className="modal-content h-full fixed top-1/2 transform -translate-y-1/2 w-[30%] bg-gray-700 p-8 rounded-md shadow-md transition-opacity duration-1000 ease-in-out">
        <div className='w-full flex flex-col-reverse justify-center   '>
          <div className="text-6xl w-full text-center ml-40 mb-10" onClick={onClose}><SiApplemusic/></div>
        </div>

        <form>
          <div className='flex gap-3 mt-5'>
            <label className="block mb-2 text-2xl">Title:</label>
            <input className="w-full p-2 border  bg-slate-800 rounded" type="text" value={title} onChange={handleTitleChange} />
          </div>

          {/* New input field for the artist */}
          <div className='flex gap-3 mt-5'>
            <label className="block mb-2 text-2xl">Artist:</label>
            <input className="w-full p-2 border  bg-slate-800 rounded" type="text" value={artist} onChange={handleArtistChange} />
          </div>

          <div className='flex gap-5 items-center relative'>
            <label className="block mt-4 mb-2 text-2xl">Photo:</label>
            <div className="mt-6 bg-green-800  text-white p-2 rounded-xl h-14  w-14" >
              <MdOutlineAddAPhoto className='absolute text-4xl  '></MdOutlineAddAPhoto>
              <input className="w-full opacity-0" type="file" accept="image/*" onChange={handlePhotoChange} />
            </div>
          </div>
          <div className='flex gap-5 items-center relative'>
            <label className="block mt-4 mb-2 text-2xl">Music:</label>
            <div className="mt-6 bg-green-800  text-white p-2 rounded-xl h-14  w-14 " >
              <TbMusicPlus className='absolute text-4xl  '></TbMusicPlus>
              <input className="w-full  border rounded opacity-0 " type="file" accept="audio/*" onChange={handleMusicChange} />
            </div>
          </div>

          <div className='bg-re-400 flex justify-center items-center'>
            <button className="mt-6 w-full bg-blue-500 px-16 text-white p-2 rounded-xl" type="button" onClick={handleSubmit}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;

