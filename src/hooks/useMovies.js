import { useEffect } from "react";
import { MOVIE_API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addMovies, changeErrorState } from "../store/moviesSlice";

const useMovies = (API, category) => {
  const dispatch = useDispatch();
  const moviesCategory = useSelector((store) => store?.movies?.[category]);

  const getMovies = async () => {
    try {
      const response = await fetch(API, MOVIE_API_OPTIONS);
      const json = await response.json();
      dispatch(
        addMovies({
          category: category,
          movies: json.results,
        })
      );
      dispatch(changeErrorState(false));
    } catch (error) {
      console.log("Error Fetching movies:", error);
      dispatch(changeErrorState(true));
    }
  };

  useEffect(() => {
    !moviesCategory && getMovies();
  }, []);
};

export default useMovies;
