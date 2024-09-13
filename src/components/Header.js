import React from "react";
import { NETFLIX_LOGO } from "../utils/constants";

const Header = () => {
  return (
    <div className="w-full lg:px-12 md:px-8 px-4 py-6 m-auto">
      <img src={NETFLIX_LOGO} alt="logo" className="md:w-44 w-36" />
    </div>
  );
};

export default Header;
