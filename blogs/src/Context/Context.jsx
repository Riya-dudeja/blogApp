import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import Loading from "../components/Loading/Loading";

const BlogContext = createContext();

const Context = ({children}) => {
  const [currentUser, setCurrentUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);

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
         userLoading}
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