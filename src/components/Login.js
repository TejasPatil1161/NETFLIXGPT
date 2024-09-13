import React, { useState } from "react";
import { LOGIN_BG_IMAGE } from "../utils/constants";
import Header from "./Header";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleSignin = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div
      className="h-screen flex flex-col"
      style={{ backgroundImage: `url(${LOGIN_BG_IMAGE})` }}
    >
      <div className="absolute inset-0 bg-black h-screen opacity-45 z-10"></div>
      <div className="flex flex-col w-full relative z-20 flex-grow">
        <Header />
        <div className="flex w-full h-full justify-center items-start">
          <form className="text-white flex flex-col md:w-3/12 bg-black bg-opacity-75 p-14 rounded-md">
            <h1 className="text-4xl font-bold mb-5">
              {isSignIn ? "Sign In" : "Sign Up"}
            </h1>
            {!isSignIn && (
              <input
                type="text"
                placeholder="Name"
                className="p-4 my-2 bg-transparent outline-none border border-stone-400 rounded-md placeholder:text-stone-400 placeholder:text-lg placeholder:font-medium"
              />
            )}
            <input
              type="text"
              placeholder="Email"
              className="p-4 my-2 bg-transparent outline-none border border-stone-400 rounded-md placeholder:text-stone-400 placeholder:text-lg placeholder:font-medium"
            />
            <input
              type="password"
              placeholder="Password"
              className="p-4 my-2 bg-transparent outline-none border border-stone-400 rounded-md placeholder:text-stone-400 placeholder:text-lg placeholder:font-medium"
            />
            <button className="p-2 my-2 bg-red-600 font-semibold text-lg rounded-md hover:bg-red-700">
              Sign In
            </button>
            <p className="my-2 text-gray-300 font-medium text-lg">
              {isSignIn ? "New to Netflix? " : "Already a user? "}
              <span
                className="font-bold text-white hover:underline cursor-pointer"
                onClick={toggleSignin}
              >
                {isSignIn ? "Sign up now" : "Sign in"}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
