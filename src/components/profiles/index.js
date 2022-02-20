import React from 'react'

export default ({ title = '' }) => {
  return (
    <div className='w-full px-4 mx-auto sm:px-6 lg:px-8'>
      <h1
        className={`text-3xl font-bold leading-tight text-gray-900 text-center`}
      >
        {/* {title || 'All Models'} */}
        {title}`s Collection
      </h1>
    </div>
  )
}
