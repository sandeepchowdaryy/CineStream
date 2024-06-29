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
  const user = useSelector((store) => store.user);
  const handlesignout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
    <div className=" -mb-5 absolute z-10 w-screen px-8  flex justify-between bg-gradient-to-b from-black">
      <div className=" py-2 z-10 ">
        <img alt="logo" className="w-40" src={netflix_logo} />
      </div>
      {user && (
        <div className=" p-5 flex gap-2">
          <img className="w-12 h -12 " alt="usericon" src={user?.photoURL} />
          <button
            
            onClick={handlesignout}
            className="font-bold bg-red-600 px-4 rounded-lg text-white "
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
