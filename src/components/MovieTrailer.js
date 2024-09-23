import React, { useEffect, useState } from "react";
import VideoBackground from "./VideoBackground";
import VideoContent from "./VideoContent";
import { useDispatch, useSelector } from "react-redux";
import { addHeroMovieTrailerDetails } from "../store/moviesSlice";

const MovieTrailer = () => {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies?.["Now Playing"]);
  const [trailerDetails, setTrailerDetails] = useState(null);

  useEffect(() => {
    if (movies && movies.length > 0) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      setTrailerDetails(movies[randomIndex]);
    }
  }, [movies]);

  if (!trailerDetails) return null;

  dispatch(addHeroMovieTrailerDetails(trailerDetails));

  return (
    <div className="w-full bg-black">
      <VideoContent />
      <VideoBackground />
    </div>
  );
};

export default MovieTrailer;
