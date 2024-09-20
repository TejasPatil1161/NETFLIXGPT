import { useDispatch } from "react-redux";
import { MOVIE_API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../store/moviesSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const getNowPlayingMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?page=1",
        MOVIE_API_OPTIONS
      );
      const json = await response.json();
      dispatch(addNowPlayingMovies(json.results));
    } catch (error) {
      console.log("Error fecthing the Now Playing movies:", error);
    }
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
