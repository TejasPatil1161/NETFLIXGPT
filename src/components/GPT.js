import React from "react";
import GPTSearchBar from "./GPTSearchBar";
import GPTMovieSuggestions from "./GPTMovieSuggestions";
import { BG_IMAGE } from "../utils/constants";

const GPT = () => {
  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 -z-20">
        <img className="bg-cover" src={BG_IMAGE} alt="banner" />
        <div className="absolute inset-0 bg-black opacity-45 min-h-screen h-full z-0"></div>
      </div>
      <GPTSearchBar />
      <GPTMovieSuggestions />
    </div>
  );
};

export default GPT;
