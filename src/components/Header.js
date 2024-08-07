import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { IoSearch } from "react-icons/io5";
import { FaPowerOff } from "react-icons/fa";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  const handlesignout = () => {
    signOut(auth)
      .then(() => {})
      .catch(() => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({ uid, email, displayName, photoURL })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible = prevScrollPos > currentScrollPos || currentScrollPos < 10;

      setVisible(visible);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <div
      id="header"
      className={`fixed md:w-[1414px] w-full h-24 z-50 flex flex-col pb-3  md:flex-row md:h-16 items-center justify-between transition-transform duration-1000 ease-in-out ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.25)",
        backdropFilter: "blur(3px)",
        WebkitBackdropFilter: "blur(3.5px)"
      }}
    >
      <div className="flex pl-4 md:pl-24 pt-2 z-10">
        <Link to="/browse">
          <img
            className="h-10 md:h-12"
            src="https://movix-by-tapesh.vercel.app/assets/movix-logo-HTlvmwAF.svg"
            alt="Logo"
          />
        </Link>
      </div>
      {user && (
        <div className="flex items-center justify-center text-[17px] gap-8 md:gap-6 pr-4 md:pr-20">
          <Link to="/browse">
            <button className="text-white  md:text-[16px] font-medium hover:text-pink-600">
              Home
            </button>
          </Link>
          <Link to="/movies">
            <button className="text-white  md:text-[16px] font-medium hover:text-pink-600">
              Movies
            </button>
          </Link>
          <Link to="/tvshows">
            <button className="text-white md:text-[16px] font-medium hover:text-pink-600">
              TV Shows
            </button>
          </Link>
          <Link to="/search">
            <button className="text-white pt-1 text-xl md:text-2xl font-bold hover:text-pink-600">
              <IoSearch />
            </button>
          </Link>
          <button
            onClick={handlesignout}
            className="text-xl md:text-2xl px-2 text-white hover:text-pink-600"
          >
            <FaPowerOff />
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
