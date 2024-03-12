import React from 'react'

const BodyComponent = () => {
  return (
    <div className='grid grid-cols-5 mt-5'>
      <div className='lg:col-span-2 col-span-5'>
        <div className='md:ms-20 lg:me-0 md:me-20 ms-5 me-5 bg-white/90 rounded-lg drop-shadow-xl'>
            <div className='grid grid-cols-2 px-10 items-center pt-3'>
                <div className='col-span-1 flex justify-start'>
                    <h1 className='font-kodchasan-semi text-4xl xl:text-6xl'>Pokémon</h1>
                </div>
                <div className='col-span-1 flex justify-end'>
                    <svg className='xl:w-12 w-8 cursor-pointer'
                    xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 -960 960 960">
                            <path
                                d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
                    </svg>
                </div>
            </div>
            <div>
                <p className='inline-block bg-blue-200 px-8 mx-5 mt-5 font-kodchasan-medium text-lg xl:text-xl rounded-2xl'>Default</p>
            </div>
            <div className='flex justify-center'>
                <img src="" alt="" className='xl:h-96 cursor-pointer' />
            </div>
            <div className='flex lg:justify-start justify-center'>
                <p className='inline-block bg-pink-200 px-8 mx-5 mt-2 mb-5 font-kodchasan-medium text-lg xl:text-xl rounded-2xl'></p>
            </div>
        </div>
      </div>
      <div className='lg:col-span-3 col-span-5 lg:me-20 lg:ms-10 md:ms-10 md:me-10 ms-5 me-5 mt-5 lg:mt-0'>
        <div className='bg-pink-200/95 rounded-lg drop-shadow-xl'>
            {/* Accordion Part */}
        </div>
      </div>
    </div>
  )
}

export default BodyComponent
