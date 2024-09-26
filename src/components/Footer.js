import React from "react";

const Footer = () => {
  return (
    <div className="flex w-full justify-center items-center bg-black text-white">
      <p className="p-3 flex justify-center items-center text-center">
        anshul.kasana98@gmail.com &copy; {new Date().getFullYear()} All rights
        reserved.
      </p>
    </div>
  );
};

export default Footer;
