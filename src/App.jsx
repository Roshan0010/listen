/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { MdPlaylistAddCircle, MdPlaylistAdd } from 'react-icons/md';
import { useContext, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Home from './Pages/Home';
import { generImages, generwideImage, todaysImage } from './config/Data';
import Modal from './components/Modal';
import MusicPlayerFooter from './components/MusicPlayerFooter';
import SongPage from './Pages/SongPage';
import GenerPage from './Pages/GenerPage';
import AddPlaylist from './Pages/AddPlaylist';

import PlaylistPage from './Pages/PlaylistPage';
import { MusicContext } from './context/MusicContext';

function App() {
  // console.log(account);
  const [currentLocation, setCurrentLoction] = useState('');
  const [todayData, setTodayData] = useState(null);

  const [isModalOpen, setModalOpen] = useState(false);
  const [play, setPlay] = useState(false);
  const [mainData, setMainData] = useState([]);
  const location = useLocation();
  const [todayWideImage, setTodayWideImage] = useState(null);
  const [createPlaylist, setCreatePlaylist] = useState(false);
  const [addPlaylist, setAddPlaylist] = useState(false);
  const navigate = useNavigate();
  const { music, data, loading, setLoading, isPlaying, setIsPlaying } =
    useContext(MusicContext);

  // Extract the pathname from the location object
  const currentDirectory = location.pathname;
  const isRootDirectory = currentDirectory === '/';

  useEffect(() => {
    const today = new Date();

    const dayOfWeek = today.getDay();
    const dayOfWeekMap = new Map();

    // Set values for each day
    dayOfWeekMap.set(0, 'Sun');
    dayOfWeekMap.set(1, 'Mon');
    dayOfWeekMap.set(2, 'Tue');
    dayOfWeekMap.set(3, 'Wed');
    dayOfWeekMap.set(4, 'Thu');
    dayOfWeekMap.set(5, 'Fri');
    dayOfWeekMap.set(6, 'Sat');

    // Use get method to retrieve the day
    const currentDay = dayOfWeekMap.get(dayOfWeek);

    const tempdata = data.filter((item) => item.day === currentDay);
    setTodayData(tempdata);
    setTodayWideImage(todaysImage[dayOfWeek]);

    return () => {};
  }, [data]);

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
    <div
      className={`w-[100vw] h-full min-h-lvh min relative bg-slate-800 ${isPlaying ? 'mb-20' : ''} `}
    >
      <Toaster />
      {/* {createPlaylist && <AddPlaylist setCreatePlaylist={setCreatePlaylist} />} */}

      {/* Add modal overlay with reduced opacity when modal is open */}
      <div
        className=" flex justify-between  h-16 items-center  "
        style={{ position: 'sticky', top: 0 }}
      >
        {!isModalOpen && (
          <button onClick={openModal} className="">
            <MdPlaylistAddCircle className="  text-6xl ml-2 " />
          </button>
        )}

        <button
          className=" bg-green-600 text-3xl mr-6 h-12 px-5 rounded-xl flex gap-3
          justify-center items-center "
          onClick={() => navigate('/addPlaylist')}
        >
          <MdPlaylistAdd />
        </button>
      </div>

      {isModalOpen && (
        <div
          className="modal-overlay fixed top-0 left-0 w-full h-full bg-black opacity-50 "
          onClick={handleOverlayClick}
        />
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
          <Route path="/songs/:id" element={<SongPage />} />
          <Route
            path="/genre/:genre"
            element={<GenerPage data={data} generwideImage={generwideImage} />}
          />
          <Route path="/addPlaylist" element={<AddPlaylist data={data} />} />
          <Route
            path="/todays-music/:day"
            element={
              <PlaylistPage
                data={todayData}
                wideImage={todayWideImage}
                isDataPresent
              />
            }
          />
        </Routes>
      </div>
      {}
      <div>
        {isPlaying && <MusicPlayerFooter music={music} playlist={data} />}
      </div>
    </div>
  );
}

export default App;
// redeploy
