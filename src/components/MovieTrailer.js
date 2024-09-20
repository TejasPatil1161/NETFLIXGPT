import React, { useEffect, useState } from "react";
import VideoBackground from "./VideoBackground";
import VideoContent from "./VideoContent";
import { useDispatch, useSelector } from "react-redux";
import { addMovieTrailer } from "../store/moviesSlice";

const MovieTrailer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const [trailerMovie, setTrailerMovie] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (movies && movies.length > 0) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      setTrailerMovie(movies[randomIndex]);
      dispatch(addMovieTrailer(movies[randomIndex]));
    }
  }, [movies, dispatch]);

  if (!trailerMovie) return null;

  return (
    <div className="w-full">
      <VideoContent />
      <VideoBackground />
    </div>
  );
};

export default MovieTrailer;
