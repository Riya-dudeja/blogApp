import React from 'react';
import { FaRegComment } from 'react-icons/fa';

const Comment = ({post}) => {
  const {setShowComment, commentLength} = Blog();
  return (
    <button
      onClick={() => setShowComment(true)}
      className='flex items-center gap-1 text-sm'
    >
      <FaRegComment className='text-xl' />
      <span>{formatNum(commentLength)}</span>
    </button>
  )
}

export default Comment