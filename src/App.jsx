/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import { Routes, Route, useLocation } from 'react-router-dom';
import { Query } from 'appwrite';
import './App.css';
import { MdPlaylistAddCircle } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Home from './Pages/Home';
import { generImages, generwideImage, todaysImage } from './config/Data';
import Modal from './components/Modal';
import MusicPlayerFooter from './components/MusicPlayerFooter';
import SongPage from './Pages/SongPage';
import GenerPage from './Pages/GenerPage';
import { database } from './lib/appwrite';
import PlaylistPage from './Pages/PlaylistPage';
import LoginModal from './components/LoginModal';

function App() {
  // console.log(account);
  const [currentLocation, setCurrentLoction] = useState('');
  const [todayData, setTodayData] = useState(null);

  const [isModalOpen, setModalOpen] = useState(false);
  const [music, setMusic] = useState(null);
  const [play, setPlay] = useState(false);
  const [mainData, setMainData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [todayWideImage, setTodayWideImage] = useState(null);
  const [loginModal, setLoginModal] = useState(false);

 

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
          [Query.limit(50), Query.offset(0)],
        );
        setData(response.documents);
        console.log(response.documents);

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
    <div className="w-[100vw] h-full min-h-lvh min relative bg-slate-800">
      <Toaster />
      {loginModal && <LoginModal setLoginModal={setLoginModal} />}

      {/* Add modal overlay with reduced opacity when modal is open */}
      <div
        className=" flex justify-between  h-16 items-center "
        style={{ position: 'sticky', top: 0 }}
      >
        {!isModalOpen && (
          <button onClick={openModal} className="">
            <MdPlaylistAddCircle className="  text-6xl ml-2 " />
          </button>
        )}

        <button
          className=" bg-green-600 mr-6 h-12 text-xl px-5 rounded-xl "
          onClick={() => setLoginModal(true)}
        >
          Login
        </button>
      </div>

      {isModalOpen && (
        <div
          className="modal-overlay fixed top-0 left-0 w-full h-full bg-black opacity-50"
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
          <Route
            path="/songs/:id"
            element={<SongPage setMusic={setMusic} play={play} music={music} />}
          />
          <Route
            path="/genre/:genre"
            element={<GenerPage data={data} generwideImage={generwideImage} />}
          />
          <Route
            path="/playlist/:day"
            element={
              <PlaylistPage data={todayData} wideImage={todayWideImage} />
            }
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
// redeploy
