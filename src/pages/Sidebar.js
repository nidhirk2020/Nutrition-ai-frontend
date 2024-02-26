import React from 'react'

const Sidebar = () => {
  return (
    <div className='min-w-[10rem] flex flex-col gap-1 pt-4 border-r border-base-300'>
        <div className='p-[0.5rem]'>
            <div className='rounded-md text-center text-lg hover:bg-base-200 transition-all duration-100 cursor-pointer'>Sidebar Item 1</div>
        </div>
        <div className='p-[0.5rem]'>
            <div className='rounded-md text-center text-lg hover:bg-base-200 transition-all duration-100 cursor-pointer'>Sidebar Item 2</div>
        </div>
        <div className='p-[0.5rem]'>
            <div className='rounded-md text-center text-lg hover:bg-base-200 transition-all duration-100 cursor-pointer'>Sidebar Item 3</div>
        </div>
        <div className='p-[0.5rem]'>
            <div className='rounded-md text-center text-lg hover:bg-base-200 transition-all duration-100 cursor-pointer'>Sidebar Item 4</div>
        </div>
    </div>
  )
}

export default Sidebar
