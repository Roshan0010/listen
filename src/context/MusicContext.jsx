/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react';
import { Query } from 'appwrite';
import { database } from '../lib/appwrite';

export const MusicContext = createContext({});

export function MusicContextProvider({ children }) {
  const [music, setMusic] = useState('');
  const [prevMusicArr, setPrevMusicArr] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicIdMap, setMusicIdMap] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await database.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_ID,
          [Query.limit(200), Query.offset(0)],
        );
        setData(response.documents);
        const songs = response.documents.map((item) => item.song_id);
        console.log(songs);
        setPlaylist(songs);
        const map = new Map();
        for (let i = 0; i < response.documents.length; i++) {
          map.set(response.documents[i].song_id, response.documents[i].$id);
        }
        setMusicIdMap(map);
        console.log(map);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, []);

  // Pass the values as an object
  const contextValues = {
    music,
    setMusic,
    prevMusicArr,
    setPrevMusicArr,
    playlist,
    setPlaylist,
    loading,
    setLoading,
    data,
    setData,
    isPlaying,
    setIsPlaying,
    musicIdMap,
    setMusicIdMap,
  };

  return (
    <MusicContext.Provider value={contextValues}>
      {children}
    </MusicContext.Provider>
  );
}
