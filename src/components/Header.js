import React from "react";
import { NETFLIX_LOGO } from "../utils/constants";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doSignout } from "../utils/authenticate";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = async () => {
    try {
      await doSignout();
      navigate("/");
    } catch (error) {
      console.log("An error occured while Signing out:", error);
    }
  };

  return (
    <div className="w-full lg:px-12 md:px-8 px-4 py-6 bg-black md:bg-transparent flex justify-between">
      <img src={NETFLIX_LOGO} alt="logo" className="md:w-44 w-36" />
      {user && (
        <div className="flex justify-center items-center">
          <img
            src={user?.photoURL}
            alt="avatar"
            className="w-12 h-12 rounded-md"
          />
          <button className="ml-2" onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
