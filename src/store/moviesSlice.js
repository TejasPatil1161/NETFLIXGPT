import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null, // Contains the NowPlaying movie list
    movieTrailer: null, // Containes the Movie details of the trailer to be shown
    playMovieTrailer: null, // Contains the Youtube Video key for Trailer
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addMovieTrailer: (state, action) => {
      state.movieTrailer = action.payload;
    },
    addPlayMovieTrailer: (state, action) => {
      state.playMovieTrailer = action.payload;
    },
  },
});

export const { addNowPlayingMovies, addMovieTrailer, addPlayMovieTrailer } =
  moviesSlice.actions;
export default moviesSlice.reducer;
