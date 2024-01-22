/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Wave from 'react-wavify';
import randomColor from 'randomcolor';
import { database, storage } from '../lib/appwrite';
import { UserContext } from '../components/UserContex';

const SongPage = ({ setMusic, music, play }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);

  const [waveColor, setWaveColor] = useState('#f79902'); // Initial color
  const [animationStyle, setAnimationStyle] = useState({
    display: 'flex',
    animation: 'fadeInOut 7s ease infinite', // Total duration is 7s (5s ease-in + 2s ease-out)
  });

  useEffect(() => {
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

        const musicResponse = storage.getFileView(
          import.meta.env.VITE_APPWRITE_BUCKET_ID_MUSIC,
          response.song_id,
        );
        console.log(musicResponse);
        setMusic(musicResponse);
        console.log(music);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const setRandomColorWithAnimation = () => {
    if (play) {
      const randomVibrantColor = randomColor({
        luminosity: 'dark',
        format: 'hex',
      });
      setWaveColor(randomVibrantColor);
      setAnimationStyle({
        ...animationStyle,
        animation: 'fadeInOut 8s ease infinite',
      });
    }
  };

  useEffect(() => {
    const colorInterval = setInterval(() => {
      setRandomColorWithAnimation();
    }, 7000);

    return () => clearInterval(colorInterval);
  }, [play]); // Depend on the 'play' state to trigger the effect when it changes

  return (
    <div className="w-[80%] h-[90%] relative flex flex-col items-center">
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          <div className="flex gap-3 relative w-[70%] h-[70vh] justify-center items-center flex-col">
            <img
              src={image}
              className="h-[100%] object-contain  rounded-xl"
              alt="Song Image"
            />
          </div>

          <Wave
            fill={waveColor}
            paused={!play}
            style={play ? animationStyle : {}}
            options={{
              height: 50,
              amplitude: 50,
              speed: 0.3,
              points: 15,
            }}
          />
        </>
      )}
    </div>
  );
};

export default SongPage;
