'use client';

import { useSelector } from "react-redux";

const HomePage = () => {
  const info = useSelector(state => state)
  console.log(info)
  return (
    <div className='h-10 leading-10 bg-slate-800 text-white font-bold text-center text-md'>HomePage</div>
  )
}

export default HomePage