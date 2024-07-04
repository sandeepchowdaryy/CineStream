import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { netflix_logo } from "../utils/constants";
import { toggleSearchBtnEvent } from "../utils/searchSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const search = useSelector((store) => store.search.showsearch);
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

  const toogleSearchBtn = () => {
    dispatch(toggleSearchBtnEvent());
  };

  return (
    <div className=" -mb-5 absolute z-10 w-screen pr-3  flex justify-between bg-black bg-opacity-70">
      <div className="pl-8 pt-2 z-10 ">
        <img alt="logo" className="w-32" src={netflix_logo} />
      </div>
      {user && (
        <div className=" pt-4  flex gap-2">
          <button
            className="bg-purple-700 text-white px-3 rounded-lg font-bold"
            onClick={toogleSearchBtn}
          >
            {search ? "Home" : "🔍 Search"}
          </button>
          <img className="w-12 h-12 " alt="usericon" src={user?.photoURL} />
          <button
            onClick={handlesignout}
            className="font-bold bg-red-600 px-3 rounded-lg text-white "
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
