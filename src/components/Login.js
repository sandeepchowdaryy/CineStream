import React, { useRef, useState } from "react";
import Footer from "./Footer";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { checkvalidation } from "../utils/validate";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { user_logo } from "../utils/constants";

function Login() {
  const [issignup, setissignup] = useState(true);
  const [validmessage, setvalidmessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const dispatch = useDispatch();

  const checkvalid = () => {
    const message = checkvalidation(
      email.current.value,
      password.current.value
    );
    setvalidmessage(message);

    if (message) return;

    if (!issignup) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: user_logo,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              validmessage(error.message);
            });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setvalidmessage(errorCode + " " + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setvalidmessage(errorCode + " " + errorMessage);
        });
    }
  };

  const toggleEvent = () => {
    setissignup(!issignup);
  };

  return (
    <div>
      <div className="bg-black h-full md:p-24 pt-24">
        <form
          onSubmit={(e) => e.preventDefault()}
          className=" flex flex-col gap-4 md:w-[37%] w-[80%]  bg-gray-800 text-white p-10  mx-auto right-0 left-0 rounded-xl"
        >
           <div className="flex flex-col justify-center items-center gap-2">
           <h1 className="font-semibold ">Sample Credentials :</h1>
           <h1 className="text-sm text-gray-400"> User@gmail.com</h1>
           <h2 className="text-sm text-gray-400"> User@1111</h2>

           </div>
           
          <h1 className="font-bold mb-4 text-3xl">
            {issignup ? "Sign In " : "Sign Up"}
          </h1>
          {!issignup && (
            <input
              ref={name}
              type="text"
              className="p-3 bg-gray-900 border border-solid  rounded-lg text-sm"
              placeholder="Full name"
            />
          )}
          <input
            ref={email}
            type="text"
            className="p-3 bg-gray-900 border border-solid  rounded-lg text-sm"
            placeholder="Email or mobile number"
          />
          <input
            ref={password}
            type="password"
            className="p-3   bg-gray-900 border border-solid  rounded-lg text-sm font-medium"
            placeholder="Password"
          />
          <p className="text-red-500 font-bold text-sm ">{validmessage}</p>
          <button
            onClick={checkvalid}
            className="bg-red-800 rounded-lg p-3 font-semibold"
          >
            {issignup ? "Sign In " : "Register"}
          </button>
          {issignup && (
            <div className="flex justify-between">
              <div className="flex justify-start font-medium gap-1">
                <input type="checkbox" className="bg-white w-4 h-5" />
                <span>Remember me</span>
              </div>
              <a href="/" className="hover:underline">
                Forgot Password?
              </a>
            </div>
          )}

          <div className="flex gap-1">
            <span className="text-gray-400 ">
              {issignup ? "Don't have an account?" : "Already user?"}
            </span>
            <span
              onClick={toggleEvent}
              className="text-white hover:underline cursor-pointer"
            >
              {issignup ? "Sign up now." : "Log in now."}
            </span>
          </div>
          
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
