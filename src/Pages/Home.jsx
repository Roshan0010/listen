/* eslint-disable react/jsx-key */

import MusicCards from "../components/MusicCards";

function Home() {
  
  const data = [
    {
      "name": "Luxury Palace Hotel",
      "price": 300,
      "place": "City Center",
      "distance_km": 2.5,
      "availability": true,
      "stars_rating": 5
    },
    {
      "name": "Cozy Retreat Inn",
      "price": 120,
      "place": "Suburbia",
      "distance_km": 10,
      "availability": true,
      "stars_rating": 3
    },
    {
      "name": "Harbor View Suites",
      "price": 250,
      "place": "Waterfront",
      "distance_km": 1,
      "availability": false,
      "stars_rating": 4
    },
    {
      "name": "Mountain Lodge Resort",
      "price": 180,
      "place": "Mountain Range",
      "distance_km": 15,
      "availability": true,
      "stars_rating": 4
    },
    {
      "name": "Budget Inn Express",
      "price": 80,
      "place": "Outskirts",
      "distance_km": 20,
      "availability": true,
      "stars_rating": 2
    },
    {
      "name": "Seaside Hotel & Spa",
      "price": 320,
      "place": "Beachfront",
      "distance_km": 0.5,
      "availability": true,
      "stars_rating": 5
    },
    {
      "name": "Countryside Retreat",
      "price": 150,
      "place": "Rural Area",
      "distance_km": 12,
      "availability": true,
      "stars_rating": 3
    },
    {
      "name": "Skyline Tower Suites",
      "price": 280,
      "place": "Downtown",
      "distance_km": 3,
      "availability": false,
      "stars_rating": 4
    },
    {
      "name": "Charming Plaza Hotel",
      "price": 200,
      "place": "City Center",
      "distance_km": 1.8,
      "availability": true,
      "stars_rating": 4
    },
    {
      "name": "Riverside Lodge",
      "price": 130,
      "place": "Riverbank",
      "distance_km": 5,
      "availability": true,
      "stars_rating": 3
    },
    {
      "name": "Urban Oasis Hotel",
      "price": 300,
      "place": "Downtown",
      "distance_km": 2,
      "availability": true,
      "stars_rating": 5
    },
    {
      "name": "Tranquil Haven Inn",
      "price": 180,
      "place": "Suburbia",
      "distance_km": 8,
      "availability": false,
      "stars_rating": 4
    },
    {
      "name": "Forest Retreat Lodge",
      "price": 160,
      "place": "Forest Area",
      "distance_km": 10,
      "availability": true,
      "stars_rating": 3
    },
    {
      "name": "Sunset View Hotel",
      "price": 220,
      "place": "Hilltop",
      "distance_km": 7,
      "availability": true,
      "stars_rating": 4
    },
    {
      "name": "Economy Inn",
      "price": 90,
      "place": "Outskirts",
      "distance_km": 15,
      "availability": true,
      "stars_rating": 2
    },
    {
      "name": "Historic Mansion Hotel",
      "price": 350,
      "place": "City Center",
      "distance_km": 1.2,
      "availability": true,
      "stars_rating": 5
    },
    {
      "name": "Serenity Suites",
      "price": 200,
      "place": "Lakefront",
      "distance_km": 3.5,
      "availability": true,
      "stars_rating": 4
    },
    {
      "name": "Quaint Cottage Inn",
      "price": 120,
      "place": "Village",
      "distance_km": 6,
      "availability": true,
      "stars_rating": 3
    },
    {
      "name": "Metro View Hotel",
      "price": 280,
      "place": "City Center",
      "distance_km": 0.8,
      "availability": false,
      "stars_rating": 4
    },
    {
      "name": "Wilderness Lodge",
      "price": 160,
      "place": "Nature Reserve",
      "distance_km": 12,
      "availability": true,
      "stars_rating": 3
    },
    {
      "name": "Grand Plaza Resort",
      "price": 300,
      "place": "Downtown",
      "distance_km": 1.5,
      "availability": true,
      "stars_rating": 5
    }
  ]
  // "name": "Luxury Palace Hotel",
  // "price": 300,
  // "place": "City Center",
  // "distance_km": 2.5,
  // "availability": true,
  // "stars_rating": 5
  return (
   
    <div className=' h-[100%] w-[90%]  flex flex-wrap justify-evenly  mt-10 gap-y-5 '>
      {data.map((item)=>{
       return (<MusicCards item={item}/>)
      
      })}
    </div>
  )
}

export default Home;
