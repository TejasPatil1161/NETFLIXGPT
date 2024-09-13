import React, { useRef, useState } from "react";
import { LOGIN_BG_IMAGE } from "../utils/constants";
import Header from "./Header";
import { checkValidation } from "../utils/validate";

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex flex-col gap-1">
      {message.map((err, i) => {
        return (
          <p
            key={i}
            className="text-xs md:text-sm flex justify-start items-center text-red-500 font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
            <span>{err}</span>
          </p>
        );
      })}
    </div>
  );
};

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);

  const toggleSignin = () => {
    setIsSignIn(!isSignIn);
  };

  const handleSubmit = () => {
    // Check validations
    const error = checkValidation(
      email?.current.value,
      password?.current.value
    );

    let errors = {
      email: error.emailCheck,
      password: error.passwordCheck,
    };

    if (!isSignIn) {
      if (password?.current.value !== confirmPassword?.current.value) {
        errors = {
          ...errors,
          confirmPassword: "Passwords don't match",
        };
      }
    }

    setErrorMessage(errors);
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundImage: `url(${LOGIN_BG_IMAGE})` }}
    >
      <div className="relative flex flex-col min-h-screen w-full z-10 bg-black md:bg-transparent">
        <Header />
        <div className="flex w-full md:h-full justify-start md:justify-center items-start px-7">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="text-white flex flex-col lg:w-1/3 w-full bg-black bg-opacity-75 md:p-14 rounded-md"
          >
            <h1 className="text-4xl font-bold mb-5">
              {isSignIn ? "Sign In" : "Sign Up"}
            </h1>
            {!isSignIn && (
              <input
                type="text"
                placeholder="Name*"
                className="p-4 my-2 bg-transparent outline-none border border-stone-400 rounded-md placeholder:text-stone-400 placeholder:text-lg placeholder:font-medium"
              />
            )}
            <input
              ref={email}
              type="text"
              placeholder="Email*"
              className="p-4 my-2 bg-transparent outline-none border border-stone-400 rounded-md placeholder:text-stone-400 placeholder:text-lg placeholder:font-medium"
            />
            {errorMessage?.email && (
              <ErrorMessage message={[errorMessage?.email]} />
            )}
            <input
              ref={password}
              type="password"
              placeholder="Password*"
              className="p-4 my-2 bg-transparent outline-none border border-stone-400 rounded-md placeholder:text-stone-400 placeholder:text-lg placeholder:font-medium"
            />
            {errorMessage?.password && (
              <ErrorMessage message={errorMessage?.password} />
            )}
            {!isSignIn && (
              <input
                ref={confirmPassword}
                type="password"
                placeholder="Confirm Password*"
                className="p-4 my-2 bg-transparent outline-none border border-stone-400 rounded-md placeholder:text-stone-400 placeholder:text-lg placeholder:font-medium"
              />
            )}
            {errorMessage?.password && errorMessage?.confirmPassword && (
              <ErrorMessage message={[errorMessage?.confirmPassword]} />
            )}
            <button
              onClick={handleSubmit}
              className="p-2 my-2 bg-red-600 font-semibold text-lg rounded-md hover:bg-red-700"
            >
              {isSignIn ? "Sign In" : "Sign Up"}
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
      <div className="absolute inset-0 bg-black opacity-45"></div>
    </div>
  );
};

export default Login;
