import { useCallback, useEffect, useState } from "react";
import { MOVIE_API_OPTIONS } from "../utils/constants";

const useMovieTrailer = (movieId) => {
  const [trailer, setTrailer] = useState(null);

  const getMovieClips = useCallback(async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        MOVIE_API_OPTIONS
      );
      const json = await data.json();
      const dataClips = json.results.filter(
        (video) => video.type === "Trailer"
      );
      const randomIndex = Math.floor(Math.random() * dataClips.length);
      const trailerDetails =
        dataClips.length !== 0 ? dataClips[randomIndex] : json.results[0];
      setTrailer(trailerDetails);
    } catch (error) {
      console.log("Error while fetching the Movie Clips:", error);
    }
  }, [movieId]);

  useEffect(() => {
    if (movieId) {
      getMovieClips();
    }
  }, [getMovieClips, movieId]);

  return trailer;
};

export default useMovieTrailer;
