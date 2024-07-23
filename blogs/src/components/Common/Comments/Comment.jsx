import React, {useState} from 'react'
import { Blog } from '../../../Context/Context';
import moment from 'moment';
import { BiDotsHorizontalRounded } from "react-icons/bi";
import DropDown from "../../../utils/DropDown";
import {doc, deleteDoc, updateDoc} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../../../firebase/firebase';

const Comment = ({ item: comment, postId }) => {
  const {allUsers, currentUser} = Blog();
  const [drop, setDrop] = useState(false);
  const [more, setMore] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const [loading, setLoading] = useState(false);
  const getUserData = allUsers.find(
    (user) => user.id === comment?.userId
  );
  const {userId, commentText, created} = comment;
  const removeComment = async() => {
    try {
      const ref = doc(db, "posts", postId, "comments", comment?.id);
        await deleteDoc(ref);
        setDrop(false);
        toast.success("Comment has been removed");
    } catch(error){
      toast.error(error.message);
    }
  }
  const editCommentText = () => {
    setIsEdit(true);
    setDrop(false);
    setEditComment(commentText);
  };
  const handleEdit = async() => {
    setLoading(true);
    try {
      const ref = doc(db, "posts", postId, "comments", comment?.id);
        await updateDoc(ref, {
          commentText: editComment,
          create: Date.now(),
          userId: currentUser?.uid,
        });
        setEditComment("");
        setIsEdit(false);
        setDrop(false);
        toast.success("Comment Updated")
    } catch(error) {
        toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className='border-b'>
      {!isEdit ? (
        <>
          <div className="flex items-center gap-5 pt-[1rem]">
            <img
              className="w-[2rem] h-[2rem] object-cover rounded-full"
              src={getUserData?.userImg || "/profile.jpg"}
              alt="user-img"
            />
            <div className="flex flex-1 justify-between">
              <div>
                <h2 className="text-sm capitalize">
                  {getUserData?.username}
                </h2>
                <p className="text-sm text-gray-400">
                  {moment(created).fromNow()}
                </p>
              </div>
              <div className="relative">
              {currentUser &&
                currentUser?.uid === userId && (
                  <>
                    <button
                      onClick={() => setDrop(!drop)}
                      className="text-2xl hover:opacity-70"
                    >
                      <BiDotsHorizontalRounded />
                    </button>
                    <DropDown
                      showDrop={drop}
                      setShowDrop={setDrop}
                      size="w-[10rem]"
                    >
                      <Button
                        click={editCommentText}
                        title="Edit your comment"
                      />
                      <Button click={removeComment} title="Delete" />
                    </DropDown>
                  </>
              )}
              </div>
            </div>
          </div>
          <p className='py-4 text-sm'>
            {more ? commentText : commentText.substring(0,80)}
            {commentText.length > 100 && (
              <button onClick={() => setMore(!more)}>
                {more ? '...less' : '...more'}
              </button>
            )}
          </p>
        </>
        ) : (
            <div className="bg-white shadows p-4">
              <textarea
                className='w-full resize-none outline-none text-sm'
                placeholder='Write your updated comment'
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
              >
              </textarea>
              <div className="flex items-center justify-end gap-2">
                <button
                  className='w-fit text-sm'
                  onClick={() => setIsEdit(false)}
                >
                  Cancel
                </button>
                <button
                  className='btn !text-white !bg-green-700 !rounded-full !text-xs'
                  onClick={handleEdit}
                >
                  {loading ? "Updating" : "Update"}
                </button>
              </div>
            </div>
          )}
    </section>
  );
};

export default Comment;

const Button = ({ click, title }) => {
  return (
    <button
      onClick={click}
      className="p-2 hover:bg-gray-200 text-black/80 w-full text-sm text-left"
    >
      {title}
    </button>
  );
};