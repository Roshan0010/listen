/* eslint-disable react/jsx-key */

import { useEffect, useState } from "react";
import MusicCards from "../components/MusicCards";
import { database } from "../lib/appwrite";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await database.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_ID
        );
        // console.log(response); // Success
        setData(response.documents);
      } catch (error) {
        console.log(error); // Failure
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  
    return () => {
      // Cleanup logic if needed
    };
  }, []);
  

  return (
    <div className='h-[100%] w-[90%] flex flex-wrap justify-evenly mt-10 gap-y-5 '>
      {loading ? (
        <p>Loading...</p>
      ) : (
        data &&
        data.map((item) => {
          return <MusicCards key={item.id} item={item} />;
        })
      )}
    </div>
  );
}

export default Home;
