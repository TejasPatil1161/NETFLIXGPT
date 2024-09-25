import { useCallback, useEffect } from "react";
import { MOVIE_API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addHeroMovieTrailerYoutubeKey } from "../store/moviesSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const youtubeKeyDetails = useSelector(
    (store) => store?.movies?.heroMovieTrailer?.youtubeKeyDetails
  );
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
      dispatch(addHeroMovieTrailerYoutubeKey(trailerDetails));
    } catch (error) {
      console.log("Error while fetching the Movie Clips:", error);
    }
  }, [movieId, dispatch]);

  useEffect(() => {
    if (movieId) {
      !youtubeKeyDetails && getMovieClips();
    }
  }, [getMovieClips, movieId, youtubeKeyDetails]);
};

export default useMovieTrailer;
