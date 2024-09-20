import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MovieTrailer from "./MovieTrailer";
import MovieList from "./MovieList";

const Browse = () => {
  useNowPlayingMovies();
  return (
    <div>
      <Header />
      {/*
         MainContainer
          - VideoBackground
          - VideoTitle
        
        SecondaryContainer
          -MovieList * n 
          -Card * n
       */}
      <MovieTrailer />
      <MovieList />
    </div>
  );
};

export default Browse;
