import React, { useEffect, useRef, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox';
import "yet-another-react-lightbox/styles.css"
import { slides } from '../assets/data';

const Events = () => {
  const [open, setOpen] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const touchStartX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };


  const handleTouchMove = (e) => {
    if (touchStartX.current === null) {
      return;
    }

    const touchEndX = e.touches[0].clientX;
    const x = touchStartX.current - touchEndX;
    
    x>50? showNextImage():showPrevImage()
  
    touchStartX.current = null;
  };

  const showPrevImage = () => {
    setImgIndex(imageindex => {
      if (imageindex == 0) return slides.length - 1;
      return imgIndex - 1;
    })
  }

  const showNextImage = () => {
    setImgIndex(imageindex => {
      if (imageindex == slides.length - 1) return 0;
      return imgIndex + 1;
    })
  }


  return (
    <div className="Events flex mob:flex-col-reverse">
      <div className="showEvents relative tab:w-1/2 pc:w-1/2 min-h-full">
        <div className="imageSlider w-full h-full overflow-hidden flex touch-auto" 
           onTouchStart={handleTouchStart}
           onTouchMove={handleTouchMove}
        >
          {slides.map((slide, index) => (
            <img
              key={index} // Add key prop here
              src={slide.src}
              className='object-cover w-full h-full block flex-shrink-0 flex-grow-0  transition-all duration-300 ease-in-out'
              style={{ translate: `${-100 * imgIndex}%` }}
              alt={slide.title}
              onDragStart={(e)=>e.preventDefault()}
            />
          ))}
        </div>

        <button onClick={showPrevImage} className='block absolute top-0 bottom-0 p-1 opacity-70 hover:bg-black hover:opacity-20 transition-all duration-200 hover:animate-khuchalna'>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" class="bi bi-arrow-left-circle-fill pc:w-10 pc:h-10" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
          </svg>
        </button>
        <button onClick={showNextImage} className='block absolute top-0 right-0 bottom-0 p-1 opacity-70 hover:bg-black hover:opacity-20 transition-all duration-200 hover:animate-khuchalna'>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" class="bi bi-arrow-right-circle-fill pc:w-10 pc:h-10" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
          </svg>
        </button>
        <div className="imagePosition absolute bottom-5 flex gap-1 mob:translate-x-40 pc:translate-x-96 tab:translate-x-52"
         
        >

          {slides.map((_, index) => (
            <button className='opacity-70' onClick={() => setImgIndex(index)}>{index === imgIndex ?
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-circle-fill pc:w-8 pc:h-8" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="8" />
              </svg>
              :
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-circle pc:w-8 pc:h-8" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              </svg>}</button>
          ))}
        </div>

        <div className="slideOpener absolute top-0 right-0 p-2">
          <button onClick={()=> setOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" class="bi bi-square-half" viewBox="0 0 16 16">
  <path d="M8 15V1h6a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1zm6 1a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"/>
</svg>
          </button>
        </div>
        <Lightbox
      className='w-full'
      open={open}
      slides={slides}
      close={() => setOpen(false)}
      />
      </div>
      <div className="eventData tab:w-1/2 pc:w-1/2">

        <div class=" min-h-full bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">

          <div class="flex flex-col items-center pb-2">
            <h3 className='text-white font-bold text-2xl p-2 pc:text-5xl pb-4'>Most Expensive Player</h3>
            <img class="w-24 h-24 mb-3 rounded-full shadow-lg pc:w-64 pc:h-64" src="https://imgs.search.brave.com/X4n-ALSpzCORnem48tSjeTTIOjzMdn1qSZdTXsLZCjI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvaW5kaWFuLWNy/aWNrZXQtdGVhbS1s/b2dvLWM0Z3Uxdnlp/bGV4YTEwMDAuanBn" alt="Bonnie image" />
            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white pc:text-3xl">Ritik Cahuhan</h5>
            <span class="text-sm text-gray-500 dark:text-gray-400 pc:text-2xl">batman</span>
            <div className="data mt-3 flex justify-around pc:mt-12">
              <div className="sold flex flex-col pc:text-2xl">
                <span className='text-gray-500 '>78</span>
                <h5 className='text-md text-white font-semibold '>Player Sold</h5>
              </div>
              <div className="sold flex flex-col ml-5 pc:ml-24 pc:text-2xl">
                <span className='text-gray-500'>109</span>
                <h5 className='text-md text-white font-semibold'>Registration</h5>
              </div>
              <div className="sold flex flex-col ml-5 pc:ml-24 pc:text-2xl">
                <span className='text-gray-500'>₹345551613</span>
                <h5 className='text-md text-white font-semibold'>Total Spend</h5>
              </div>
            </div>
            <div className="league mt-3 pc:mt-16">
              <h4 className='text-white text-xl font-bold pc:text-5xl'>Inter Cricket League</h4>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Events