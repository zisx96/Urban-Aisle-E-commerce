import React from 'react'
import heroImg2 from '../../assets/img/heroImg2.jpg'

function HeroSection() {
  return (
    <div className='relative mb-10 flex px-36 py-32 bg-cover flext-start bg-center text-left h-screen w-full' style={{backgroundImage
        : `url(${heroImg2})`}
    }>
      <div className='absolute top-0 right-0 left-0 bottom-0'></div>
        <main className='px-4 lg:px-20 z-10'>
          <div className='text-left'>
            <h2 className='text-3xl text-white font-serif'>T-shit / Tops</h2>
            <p className='mt-4 font-serif text-black sm:mt-5: sm:max-w-xl text-5xl'>
              Winter
              Value Pack
            </p>
            <p className='mt-4 font-serif text-white sm:mt-5: sm:max-w-xl text-3xl'>
              Warm / Colorful / Comfy
            </p>
            <button className='border rounded mt-5 border-black hover:bg-white hover:text-black hover:border-black font-serif text-xl border-1 text-white bg-black w-36 h-12'>
                Shop Now
            </button>
          </div>
        </main>
    
    </div>
  )
}

export default HeroSection