import React from 'react'

function Container({children}: {children: React.ReactNode}) {
  return (
    <div className='max-w-[1300px] mx-auto px-10 bg-white '>
        {children}
    </div>
  )
}

export default Container