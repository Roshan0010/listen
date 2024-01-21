/* eslint-disable react/prop-types */


const MusicCards = ({item}) => {
    const {name, place,}=item;
    let cntr=Math.floor(Math.random() * 100) + 1;
    return (
        <div className=' w-[19rem] h-[20rem] rounded-xl '>
      <img className='bg-pink-400 w-full h-[80%] rounded-xl' src={`https://source.unsplash.com/random/200x200?sig=${Date.now()}+${cntr++}⁠`}/>

      <div className=''>

      </div>
      <div className='flex flex-col '>

      
       <div className='mt-2'>
      {`${name}`}
      </div>
      <div className='text-slate-500'>
      {`${place}`}
      </div>
      </div>
      </div>)
}

export default MusicCards;