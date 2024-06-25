import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { netflix_logo } from "../utils/constants";

function Header() {
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const user = useSelector((store)=> store.user);
  const handlesignout = () => {
    signOut(auth)
      .then(() => { 
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
   const unsubscribe =  onAuthStateChanged(auth, (user) => {
      if (user) {  
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    // it will unsubscribe when the component will unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex justify-between bg-gradient-to-b from-black">
      <div className="relative w-screen  px-20 py-2 z-10 ">
        <img
          alt="logo"
          className="w-40"
          src={netflix_logo}
        />
      </div>
     {user && <div className="p-4 flex">
        <img
          className="w-12 h -12 "
          alt="usericon"
          src={user?.photoURL}
        />
        <button onClick={handlesignout} className="font-bold text-white (condition) {
          
        }  p-1">(Signout)</button>
      </div>}
    </div>
  );
}

export default Header;
