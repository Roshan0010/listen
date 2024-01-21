
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'

import { MdPlaylistAddCircle } from "react-icons/md";
import { useState,  } from 'react';
import Modal from './components/Modal';
import MusicPlayerFooter from './components/MusicPlayerFooter';

function App() {
// console.log(account);

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };


  return (
    <div className='w-[100vw] h-full min-h-lvh min relative bg-slate-800'>
       
  
      {!isModalOpen && ( <button style={{ position: 'sticky', top: 0 }} onClick={openModal}>
  <MdPlaylistAddCircle className='absolute text-6xl ml-3 mt-3 hover:' />
</button>)}
      <Modal isOpen={isModalOpen} onClose={closeModal} />
       {/* Hover effect */}
       <div className=' flex justify-center'>
       <Routes>
        <Route path="/" element={<Home/>}/>
        
      </Routes>
       </div>
      
      <MusicPlayerFooter/>
      
     
    </div>
  )
}

export default App
