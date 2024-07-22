import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import Loading from "../components/Loading/Loading";
import { auth, db } from "../firebase/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

const BlogContext = createContext();

const Context = ({children}) => {
  const [currentUser, setCurrentUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [publish, setPublish] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [commentLength, setCommentLength] = useState(0);

  const [updateData, setUpdateData] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user){
        setCurrentUser(user);
      }
      else{
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [currentUser]);

  useEffect(() => {
    const getUsers = () => {
      const postRef = query(collection(db, "users"));
      onSnapshot(postRef, (snapshot) => {
        setAllUsers(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
        setUserLoading(false);
      });
    };
    getUsers();
  }, []);


  return (
    <div>
      <BlogContext.Provider value={
        {currentUser,
         setCurrentUser,
         allUsers,
         userLoading,
         publish,
         setPublish,
         showComment,
         setShowComment,
         commentLength,
         setCommentLength,
         updateData,
         setUpdateData,
         title,
         setTitle,
         description,
         setDescription
        }
      }>
        {loading? <Loading /> : children}
      </BlogContext.Provider>
    </div>
  )
}
export default Context;

export const Blog = () => {
  useContext(BlogContext);
}