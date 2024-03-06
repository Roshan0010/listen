/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { database, storage } from '../lib/appwrite';
import { MusicContext } from '../context/MusicContext';
import Spinner from '../components/Spinner';

const SongPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);

  const { setMusic, isPlaying, setIsPlaying } = useContext(MusicContext);

  useEffect(() => {
    console.log('Effect is running');
    console.log(id);
    if (!isPlaying) {
      setIsPlaying(true);
    }
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await database.getDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_ID,
          id,
        );

        const imageResponse = await storage.getFileView(
          import.meta.env.VITE_APPWRITE_BUCKET_ID_PHOTO,
          response.image_id,
        );
        setImage(imageResponse);

        setMusic(response.song_id);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="w-[80%] h-[90%] relative flex flex-col items-center">
      {loading && <Spinner />}
      {!loading && (
        <div className="flex gap-3 relative w-[70%] h-[70vh] justify-center items-center flex-col">
          <img
            src={image}
            className="h-[100%] object-contain  rounded-xl"
            alt="Song Image"
          />
        </div>
      )}
    </div>
  );
};

export default SongPage;
