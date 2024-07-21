import React, { useEffect, useState } from "react";
import { CiSaveDown2 } from "react-icons/ci";
import useSingleFetch from "../../../hooks/useSingleFetch";

const SavedPost = ({post}) => {
  const [isSaved, setIsSaved] = useState(false);
  const {currentUser} = Blog();
  const {data, loading} = useSingleFetch(
    "users",
    post?.userId,
    "savePost",
  )

  useEffect(() => {
    setIsSaved(data && data.find(
      (item) => item.id === post.id)
    );
  }, [data, post?.id]);

  const handleSave = async () => {
    try {
      if(currentUser){
        const saveRef = doc(
          db,
          "users",
          currentUser?.uid,
          "savePost",
          post?.id
        );

        if(isSaved){
          await deleteDoc(saveRef);
          toast.success("Post has been unsaved");
        } else {
          await setDoc(saveRef, {
            ...post,
          });
          toast.success("Post has been Saved");
        }
      }
    }catch{

    }
  }

  return(
    <div>
      <button onClick={handleSave} className="hover:opacity-60">
        <CiSaveDown2
          className={`text-2xl pointer-event-none
        ${isSaved ? "text-yellow-600" : ""}
        `}
        />
      </button>
    </div>
  );
};

export default SavedPost;