import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer  text-white flex flex-col gap-6 py-10 justify-center items-center bg-black">
      <ul className="menuItems flex gap-7">
        <li className="menuItem hover:text-pink-800 cursor-pointer">
          Terms Of Use
        </li>
        <li className="menuItem hover:text-pink-800 cursor-pointer">
          Privacy-Policy
        </li>
        <li className="menuItem hover:text-pink-800 cursor-pointer">About</li>
        <li className="menuItem hover:text-pink-800 cursor-pointer">Blog</li>
        <li className="menuItem hover:text-pink-800 cursor-pointer">FAQ</li>
      </ul>
      <div className="infoText max-w-[900px] text-gray-500 text-sm text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </div>
      <div className="socialIcons flex gap-5  text-xl">
        <span className="icon hover:bg-gray-600 p-2 rounded-2xl cursor-pointer">
          <FaFacebookF />
        </span>
        <span className="icon hover:bg-gray-600 p-2 rounded-2xl cursor-pointer">
          <FaInstagram />
        </span>
        <span className="icon hover:bg-gray-600 p-2 rounded-2xl cursor-pointer">
          <FaTwitter />
        </span>
        <span className="icon hover:bg-gray-600 p-2 rounded-2xl cursor-pointer">
          <FaLinkedin />
        </span>
      </div>
    </footer>
  );
};

export default Footer;
