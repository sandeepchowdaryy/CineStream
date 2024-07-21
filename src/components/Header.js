import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleSearchBtnEvent } from "../utils/searchSlice";
import { IoSearch } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa";

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

  // const toogleSearchBtn = () => {
  //   dispatch(toggleSearchBtnEvent());
  // };

  return (
    <div className=" -mb-5  fixed z-50 w-screen pr-3  flex justify-between bg-black bg-opacity-30">
      <div className=" flex pl-24 pt-2 z-10 ">
        <Link to={"/"}>
          <img
            className="w-44 "
            src="https://movix-by-tapesh.vercel.app/assets/movix-logo-HTlvmwAF.svg"
          />
        </Link>
      </div>
      {user && (
        <div className="flex justify-center  gap-6 pr-20">
          <button className="text-white text-[16px] font-medium hover:text-pink-600 ">
            Movies
          </button>
          <button className="text-white  text-[16px] font-medium  hover:text-pink-600">
            TV Shows
          </button>

          <button
            className=" text-white text-2xl  font-bold hover:text-pink-600"
           
          >
            <Link to={"search"}>
            <IoSearch />
            </Link>
             
          </button>

          <button
            onClick={handlesignout}
            className="text-2xl px-2 text-white  hover:text-pink-600"
          >
            <FaPowerOff />
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
