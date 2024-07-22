import { deleteDoc, setDoc, doc } from 'firebase/firestore';
import { PiHandsClappingDuotone } from 'react-icons/pi';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import useSingleFetch from '../../../hooks/useSingleFetch';
import { formatNum } from '../../../../utils/helper';
import { Blog } from '../../../../Context/Context';
import { db } from '../../../../firebase/firebase';

const Like = ({post, postId}) => {
  const [isLiked, setIsLiked] = useState(false);
  const {currentUser, setAuthModel} = Blog();
  const {data} = useSingleFetch("posts", postId, "likes");

  useEffect(() => {
    setIsLiked(
      data && data.findIndex(
        (item) => item.id === currentUser?.uid ) !== -1
    );
  }, [data])

  const handleLike = async () => {
    try {
      if(currentUser){
        const likeRef = doc(
          db,
          "posts",
          postId,
          "likes",
          currentUser?.uid
        );
        if(isLiked){
          await deleteDoc(likeRef);
        } else {
          await setDoc(likeRef, {
            userId: currentUser?.uid,
          });
        }
      } else {
        setAuthModel(true);
      }
    } catch(error){
      toast.error(error.message);
    }
  }

  return (
    <button
      onClick = {handleLike}
      className='flex items-center gap-1 text-sm'
    >
      <PiHandsClappingDuotone
        className={`text-xl ${isLiked ? "text-black" : "text-gray-500"}`} />
      <span>
        {formatNum(data?.length)}
      </span>
    </button>
  )
}

export default Like;