import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = () => {
  const trailerDetails = useSelector((store) => store.movies?.movieTrailer);
  const { id } = trailerDetails;
  useMovieTrailer(id);
  const trailerVideo = useSelector((store) => store.movies?.playMovieTrailer);

  return (
    <div className="max-w-screen">
      <iframe
        className="w-full aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?autoplay=1&mute=1"
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
