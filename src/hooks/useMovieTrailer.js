import { useCallback, useEffect } from "react";
import { MOVIE_API_OPTIONS } from "../utils/constants";
import { addPlayMovieTrailer } from "../store/moviesSlice";
import { useDispatch } from "react-redux";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
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
      const trailer =
        dataClips.length !== 0 ? dataClips[randomIndex] : json.results[0];
      dispatch(addPlayMovieTrailer(trailer));
      console.log(trailer);
    } catch (error) {
      console.log("Error while fetching the Movie Clips:", error);
    }
  }, [dispatch, movieId]);

  useEffect(() => {
    if (movieId) {
      getMovieClips();
    }
  }, [getMovieClips, movieId]);
};

export default useMovieTrailer;
