/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { MdPlaylistAddCircle } from 'react-icons/md';
import { useContext, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Home from './Pages/Home';

import Modal from './components/Modal';
import MusicPlayerFooter from './components/MusicPlayerFooter';
import SongPage from './Pages/SongPage';
import { UserContext, UserContextProvider } from './components/UserContex';


function App() {
  // console.log(account);

  const [isModalOpen, setModalOpen] = useState(false);
  const [music, setMusic] = useState(null);
  const [play, setPlay] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <UserContextProvider>
      <div className="w-[100vw] h-full min-h-lvh min relative bg-slate-800">
        <Toaster />
        {!isModalOpen && (
          <button style={{ position: 'sticky', top: 0 }} onClick={openModal}>
            <MdPlaylistAddCircle className="absolute text-6xl ml-3 mt-3 hover:" />
          </button>
        )}
        <Modal isOpen={isModalOpen} onClose={closeModal} />
        {/* Hover effect */}
        <div className=" flex justify-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/songs/:id"
              element={
                <SongPage setMusic={setMusic} play={play} music={music} />
              }
            />
          </Routes>
        </div>
        {}
        {music && (
          <MusicPlayerFooter play={play} setPlay={setPlay} music={music} />
        )}
      </div>
    </UserContextProvider>
  );
}

export default App;
