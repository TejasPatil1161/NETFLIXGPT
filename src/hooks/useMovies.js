import { useEffect, useState } from "react";
import { MOVIE_API_OPTIONS } from "../utils/constants";

const useMovies = (API) => {
  const [movies, setMovies] = useState(null);

  const getMovies = async () => {
    try {
      const response = await fetch(API, MOVIE_API_OPTIONS);
      const json = await response.json();
      setMovies(json.results);
    } catch (error) {
      console.log("Error fecthing the Now Playing movies:", error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return movies;
};

export default useMovies;
