import React from "react";
import { MOVIE_IMAGE_PATH } from "../utils/constants";

const MovieCard = ({ movie }) => {
  return (
    <div className="relative mx-1 group/MovieCard w-60">
      {/* Movie Image */}
      <img
        className="rounded w-full object-cover"
        src={MOVIE_IMAGE_PATH + movie.backdrop_path}
        alt={movie.title}
      />

      {/* Hover Content */}
      <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover/MovieCard:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 rounded">
        <div className="text-center text-white">
          <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
          <p className="text-sm">
            {movie.overview
              ? movie.overview.substring(0, 100) + "..."
              : "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
