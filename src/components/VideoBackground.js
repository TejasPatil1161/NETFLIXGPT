import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { addHeroMovieTrailerYoutubeKey } from "../store/moviesSlice";

const VideoBackground = () => {
  const dispatch = useDispatch();
  const trailerDetails = useSelector(
    (store) => store.movies?.heroMovieTrailer?.trailerDetails
  );
  const youtubeKeyDetails = useMovieTrailer(trailerDetails?.id);
  dispatch(addHeroMovieTrailerYoutubeKey(youtubeKeyDetails));
  const trailerVideo = useSelector(
    (store) => store.movies?.heroMovieTrailer?.youtubeKeyDetails
  );

  return (
    <div className="max-w-screen">
      <iframe
        className="w-full aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?autoplay=1&mute=1&rel=0"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
      <div className="relative bottom-0 bg-gradient-to-b from-black h-16"></div>
    </div>
  );
};

export default VideoBackground;
