/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { MdPlaylistAddCircle } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Home from './Pages/Home';

import Modal from './components/Modal';
import MusicPlayerFooter from './components/MusicPlayerFooter';
import SongPage from './Pages/SongPage';
import GenerPage from './Pages/GenerPage';
import { database } from './lib/appwrite';

function App() {
  // console.log(account);
  const [currentLocation, setCurrentLoction] = useState('');

  const generImages = [
    {
      title: 'slow',
      url: 'https://cloud.appwrite.io/v1/storage/buckets/65af6e78a7ee4064c3ef/files/65af7cae056ecac37c18/view?project=65aba948a96699b1bdd6&mode=admin',
    },
    {
      title: 'love',
      url: 'https://cloud.appwrite.io/v1/storage/buckets/65af6e78a7ee4064c3ef/files/65af7c9fe170e58a98be/view?project=65aba948a96699b1bdd6&mode=admin',
    },
    {
      title: 'bhajans',
      url: 'https://cloud.appwrite.io/v1/storage/buckets/65af6e78a7ee4064c3ef/files/65af73ac8a347c10ecbf/view?project=65aba948a96699b1bdd6&mode=admin',
    },
    {
      title: 'english',
      url: 'https://cloud.appwrite.io/v1/storage/buckets/65af6e78a7ee4064c3ef/files/65af7f58740bab484e4e/view?project=65aba948a96699b1bdd6&mode=admin',
    },
    {
      title: 'rap',
      url: 'https://cloud.appwrite.io/v1/storage/buckets/65af6e78a7ee4064c3ef/files/65af808f348e700354a5/view?project=65aba948a96699b1bdd6&mode=admin',
    },
  ];
  const generwideImage = [
    {
      title: 'slow',
      url: 'https://cloud.appwrite.io/v1/storage/buckets/65af6e78a7ee4064c3ef/files/65af95c3e5e34f6a0b7e/view?project=65aba948a96699b1bdd6&mode=admin',
    },
    {
      title: 'love',
      url: 'https://cloud.appwrite.io/v1/storage/buckets/65af6e78a7ee4064c3ef/files/65af962ace4e9d50a15d/view?project=65aba948a96699b1bdd6&mode=admin',
    },
    {
      title: 'bhajans',
      url: 'https://cloud.appwrite.io/v1/storage/buckets/65af6e78a7ee4064c3ef/files/65af93fe7c2f80fd88be/view?project=65aba948a96699b1bdd6&mode=admin',
    },
    {
      title: 'english',
      url: 'https://cloud.appwrite.io/v1/storage/buckets/65af6e78a7ee4064c3ef/files/65af95fb148f9736d779/view?project=65aba948a96699b1bdd6&mode=admin',
    },
    {
      title: 'rap',
      url: 'https://cloud.appwrite.io/v1/storage/buckets/65af6e78a7ee4064c3ef/files/65af965dec35d34b6e54/view?project=65aba948a96699b1bdd6&mode=admin',
    },
  ];
  const [isModalOpen, setModalOpen] = useState(false);
  const [music, setMusic] = useState(null);
  const [play, setPlay] = useState(false);
  const [mainData, setMainData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Extract the pathname from the location object
  const currentDirectory = location.pathname;
  const isRootDirectory = currentDirectory === '/';
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await database.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        );
        setData(response.documents);

        // const genreData = await data.map((item) => item.gener);
        // console.log(genreData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      // Cleanup logic if needed
    };
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  };
  return (
    <div className="w-[100vw] h-full min-h-lvh min relative bg-slate-800">
      <Toaster />
      {/* Add modal overlay with reduced opacity when modal is open */}
      {isModalOpen && (
        <div
          className="modal-overlay fixed top-0 left-0 w-full h-full bg-black opacity-50"
          onClick={handleOverlayClick}
        />
      )}
      {!isModalOpen && isRootDirectory && (
        <button style={{ position: 'sticky', top: 0 }} onClick={openModal}>
          <MdPlaylistAddCircle className="absolute text-6xl ml-3 mt-3 hover:" />
        </button>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal} className="z-10" />

      {/* Hover effect */}
      <div className=" flex justify-center">
        <Routes>
          <Route
            path="/"
            element={
              <Home data={data} loading={loading} generImages={generImages} />
            }
          />
          <Route
            path="/songs/:id"
            element={<SongPage setMusic={setMusic} play={play} music={music} />}
          />
          {generImages.map((item) => (
            <Route
              path={`/${item.title}/songs/:id`}
              element={
                <SongPage setMusic={setMusic} play={play} music={music} />
              }
            />
          ))}
          <Route
            path=":genre"
            element={<GenerPage data={data} generwideImage={generwideImage} />}
          />
        </Routes>
      </div>
      {}
      {music && (
        <MusicPlayerFooter play={play} setPlay={setPlay} music={music} />
      )}
    </div>
  );
}

export default App;
