import React from "react";
import { Link } from "react-router-dom";
 import {BsGithub, BsInstagram, BsLinkedin, BsTwitter} from "react-icons/bs"
const Footer = () => {
  return (
    <div className=" min-h-fit bg-black w-screen flex flex-col gap-0 md:gap-4 px-2 md:pl-[30px]">
      <div className="flex md:mx-auto gap-1 md:gap-6 py-2 flex-wrap">
        <div className="flex flex-col w-[40%] md:w-[20%] text-left ">
          <h1 className="text-white font-bold   md:text-xl mb-1">Explore</h1>
          <Link to={"/"}>
            <h3 className="text-gray-200 text-sm  ">Home</h3>
          </Link >
          <Link to="/cart">
            <h3 className="text-gray-200 text-sm ">Cart</h3>
          </Link>
          <Link to="/search">
            <h3 className="text-gray-200 text-sm ">Search</h3>
          </Link>
        </div>
        <div className="flex flex-col w-[40%] md:w-[20%] text-left  ">
          <h1 className="text-white font-bold text-xl mb-1">Visit</h1>
          <h3 className="text-gray-200 text-sm ">
            (352) 398-1774 494 Kings Cross Rd Spring Hill, Florida(FL), 34609
          </h3>
        </div>
        <div className="flex flex-col w-[40%] md:w-[20%] text-left  ">
          <h1 className="text-white font-bold text-xl mb-1">Legal</h1>
          <h3 className="text-gray-200 text-sm ">
            Terms
          </h3>
          <h3 className="text-gray-200 text-sm ">
            Privacy
          </h3>
        </div>
        <div className="flex flex-col w-[40%] md:w-[20%] text-left  ">
          <h1 className="text-white font-bold text-xl mb-1">Follow Us</h1>
          <h3 className="text-gray-200 flex text-blue-400 text-sm ">
            LinkedIn
            <div className="ml-2 my-auto"><BsLinkedin/></div>
          </h3>
          <h3 className="text-gray-200 flex text-pink-400 text-sm ">
            Instagram
            <div className="ml-2 my-auto"><BsInstagram/></div>
            
          </h3>
          <h3 className="text-gray-200 flex text-blue-300 text-sm ">
            Twitter
            <div className="ml-2 my-auto"><BsTwitter/></div>
          </h3>
          <h3 className="text-gray-200 flex text-sm ">
            GitHub
            <div className="ml-2 my-auto"><BsGithub/></div>
          </h3>
        </div>
      </div>
      <div className="text-white font-bold mb-4">
        Copyright @.All Rights Reserved{" "}
      </div>
    </div>
  );
};

export default Footer;
