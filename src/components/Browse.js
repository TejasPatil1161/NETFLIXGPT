import React from "react";
import Header from "./Header";
import MovieTrailer from "./MovieTrailer";
import MovieList from "./MovieList";
import useMovies from "../hooks/useMovies";
import {
  MOVIE_API_GENRE,
  MOVIE_API_NOW_PLAYING_MOVIES,
  MOVIE_API_POPULAR_MOVIES,
  MOVIE_API_TOP_RATED_MOVIES,
  MOVIE_API_UPCOMING_MOVIES,
} from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addMovies } from "../store/moviesSlice";
import GPT from "./GPT";

const Browse = () => {
  const dispatch = useDispatch();
  const showGPTSearch = useSelector((store) => store.GPT.showGPTSearch);

  const nowPlayingMovies = useMovies(MOVIE_API_NOW_PLAYING_MOVIES);
  const popularMovies = useMovies(MOVIE_API_POPULAR_MOVIES);
  const topRatedMovies = useMovies(MOVIE_API_TOP_RATED_MOVIES);
  const upcomingMovies = useMovies(MOVIE_API_UPCOMING_MOVIES);
  const Action = useMovies(`${MOVIE_API_GENRE}+&with_genres=${28}`);
  const Adventure = useMovies(`${MOVIE_API_GENRE}+&with_genres=${12}`);
  const Animation = useMovies(`${MOVIE_API_GENRE}+&with_genres=${16}`);
  const Crime = useMovies(`${MOVIE_API_GENRE}+&with_genres=${80}`);
  const Comedy = useMovies(`${MOVIE_API_GENRE}+&with_genres=${35}`);
  const Documentary = useMovies(`${MOVIE_API_GENRE}+&with_genres=${99}`);
  const Drama = useMovies(`${MOVIE_API_GENRE}+&with_genres=${18}`);
  const Family = useMovies(`${MOVIE_API_GENRE}+&with_genres=${10751}`);
  const Fantasy = useMovies(`${MOVIE_API_GENRE}+&with_genres=${14}`);
  const History = useMovies(`${MOVIE_API_GENRE}+&with_genres=${36}`);
  const Horror = useMovies(`${MOVIE_API_GENRE}+&with_genres=${27}`);
  const Music = useMovies(`${MOVIE_API_GENRE}+&with_genres=${10402}`);
  const Mystery = useMovies(`${MOVIE_API_GENRE}+&with_genres=${9648}`);
  const Romance = useMovies(`${MOVIE_API_GENRE}+&with_genres=${10749}`);
  const Science_Fiction = useMovies(`${MOVIE_API_GENRE}+&with_genres=${878}`);
  const TV_Movie = useMovies(`${MOVIE_API_GENRE}+&with_genres=${10770}`);
  const Thriller = useMovies(`${MOVIE_API_GENRE}+&with_genres=${53}`);
  const War = useMovies(`${MOVIE_API_GENRE}+&with_genres=${10752}`);
  const Western = useMovies(`${MOVIE_API_GENRE}+&with_genres=${37}`);

  const moviesList = [
    { category: "Now Playing", movie: nowPlayingMovies },
    { category: "Popular", movie: popularMovies },
    { category: "Top Rated", movie: topRatedMovies },
    { category: "Upcoming", movie: upcomingMovies },
    { category: "Action", movie: Action },
    { category: "Adventure", movie: Adventure },
    { category: "Animation", movie: Animation },
    { category: "Crime", movie: Crime },
    { category: "Comedy", movie: Comedy },
    { category: "Documentary", movie: Documentary },
    { category: "Drama", movie: Drama },
    { category: "Family", movie: Family },
    { category: "Fantasy", movie: Fantasy },
    { category: "History", movie: History },
    { category: "Horror", movie: Horror },
    { category: "Music", movie: Music },
    { category: "Mystery", movie: Mystery },
    { category: "Romance", movie: Romance },
    { category: "Science Fiction", movie: Science_Fiction },
    { category: "TV Movies", movie: TV_Movie },
    { category: "Thriller", movie: Thriller },
    { category: "War", movie: War },
    { category: "Western", movie: Western },
  ];

  moviesList.forEach((movie) => {
    dispatch(
      addMovies({
        category: movie.category,
        movies: movie.movie,
      })
    );
  });

  return (
    <div>
      <Header />
      {showGPTSearch ? (
        <GPT />
      ) : (
        <>
          <MovieTrailer />
          <MovieList />
        </>
      )}
    </div>
  );
};

export default Browse;
