import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  GEMINI_KEY,
  MOVIE_API_OPTIONS,
  SEARCH_BY_MOVIE_NAME_FIRST_PART,
  SEARCH_BY_MOVIE_NAME_LAST_PART,
} from "../utils/constants";
import {
  addGPTMovieResult,
  addUserSearching,
  toggleIsLoading,
} from "../store/GPTSlice";

const genAI = new GoogleGenerativeAI(GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const searchMovieTMDB = async (movie) => {
  const data = await fetch(
    SEARCH_BY_MOVIE_NAME_FIRST_PART + movie + SEARCH_BY_MOVIE_NAME_LAST_PART,
    MOVIE_API_OPTIONS
  );
  const json = await data.json();

  return json.results;
};

const GPTSearchBar = () => {
  const dispatch = useDispatch();
  const language = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const handleGPTSearch = async () => {
    try {
      if (!searchText.current.value) return;
      dispatch(addUserSearching());
      dispatch(toggleIsLoading());

      const gptQuery =
        "Act as a Movie Recommendation system and suggest some movies for the query : " +
        searchText.current.value +
        ". only give me names of 10 movies along with the original language in two characters, comma seperated without numbering just like the example result given ahead. Example Result: Gadar,hi; The Proposal,en; The Intern,en; Don,hi; X-men,en; Golmaal,hi";

      const data = await model.generateContent(gptQuery);
      const gptResults = data?.response?.text();

      const gptMovies = gptResults.split(";").map((item) => {
        const [movie, lang] = item.split(",").map((str) => str.trim()); // Splitting and trimming
        return { movie, lang }; // Returning the object
      });

      const promiseArray = gptMovies.map((movieItem) =>
        searchMovieTMDB(movieItem.movie)
      );
      const tmdbResults = await Promise.all(promiseArray);

      const filteredResults = tmdbResults
        .map((resultsArray, index) => {
          const originalMovieTitle = gptMovies[index]?.movie?.toLowerCase();
          const originalLanguage = gptMovies[index]?.lang?.toLowerCase();

          return resultsArray.filter((result) => {
            // Check if the title matches and either backdrop_path or poster_path is present
            const titleMatches =
              result?.title?.toLowerCase() === originalMovieTitle;
            const langMatches =
              result?.original_language?.toLowerCase() === originalLanguage;
            const hasImage = result.poster_path;

            return titleMatches && hasImage && langMatches;
          });
        })
        .flat()
        .reduce((acc, movie) => {
          acc[movie.title] = acc[movie.title] || [];
          acc[movie.title].push(movie);
          return acc;
        }, {});

      const limitedResults = Object.values(filteredResults).flatMap(
        (movies) => {
          return movies.slice(0, 2);
        }
      );

      dispatch(
        addGPTMovieResult({
          movieNames: gptMovies,
          movieResults: limitedResults,
        })
      );
      dispatch(toggleIsLoading());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="z-10 pt-[45%] md:pt-[15%] w-full flex justify-center p-2 md:p-0">
      <div className="grid grid-cols-12 w-full md:w-1/2 bg-black p-4 rounded">
        <input
          ref={searchText}
          className="col-span-9 bg-gray-500 text-white placeholder:text-gray-300 p-2 rounded bg-opacity-45 placeholder:text-sm md:placeholder:text-base"
          type="text"
          placeholder={lang[language].GPTSearchPlaceholder}
        />
        <button
          onClick={handleGPTSearch}
          className="col-span-3 bg-red-600 ml-2 rounded text-white text-sm md:text-base"
        >
          {lang[language].search}
        </button>
      </div>
    </div>
  );
};

export default GPTSearchBar;
