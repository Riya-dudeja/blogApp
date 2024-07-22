import React from 'react';
import { FaRegComment } from 'react-icons/fa';

const Comment = ({post}) => {
  return (
    <button className='flex items-center gap-1 text-sm'>
      <FaRegComment className='text-xl' />
      <span>1</span>
    </button>
  )
}

export default Comment