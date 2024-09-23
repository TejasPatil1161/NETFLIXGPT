import React from "react";
import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";

const GPTSearchBar = () => {
  const language = useSelector((store) => store.config.lang);

  return (
    <div className="z-10 pt-[10%] w-full flex justify-center">
      <div className="grid grid-cols-12 w-1/2 bg-black p-4 rounded">
        <input
          className="col-span-9 bg-gray-500 text-white placeholder:text-gray-300 p-2 rounded bg-opacity-45"
          type="text"
          placeholder={lang[language].GPTSearchPlaceholder}
        />
        <button className="col-span-3 bg-red-600 ml-2 rounded text-white">
          {lang[language].search}
        </button>
      </div>
    </div>
  );
};

export default GPTSearchBar;
