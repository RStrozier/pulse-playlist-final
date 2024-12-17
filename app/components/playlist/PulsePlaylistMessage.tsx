"use client";

import { FaHeartPulse } from 'react-icons/fa6';

const PulsePlaylistMessage = () => {
  return (
    <div className="p-5 bg-gradient-to-br from-blue-100 to-purple-200 rounded-lg relative h-full"> 
      <div className="text-3xl font-bold text-center text-gray-800">
        <span className='text-red-600'>Pulse </span> Playlist
      </div>
      <br />
      <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center text-center text-sm text-gray-600 mb-4">
        <span>Select a mood. Get your pulse recommendation!</span>
        <FaHeartPulse
          className='mx-1'
          style={{ color: '#CC0000', fontSize: '21px' }} />
      </div>
    </div>
  );
}

export default PulsePlaylistMessage;