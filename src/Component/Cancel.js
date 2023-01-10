import React from 'react'
import { ImSad2 } from "react-icons/im";
import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <div className=' min-h-[300px]  md:min-h-[410px] flex flex-col justify-center align-center'>
      <div className='flex text-gray-600 mx-auto'><ImSad2 className='mr-2 my-auto'/>Payment Failed! </div>
      <Link to="/" className='text-white bg-indigo-400 w-[100px] rounded-2xl mx-auto mt-2'>Go to Home</Link>
    </div>
  )
}

export default Cancel