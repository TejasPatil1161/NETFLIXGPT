import React from "react";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";

const playIconSvg = () => {
  return (
    <span>
      <svg
        width="11px"
        height="14px"
        viewBox="0 0 11 14"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          id="Icons"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="Rounded" transform="translate(-753.000000, -955.000000)">
            <g id="AV" transform="translate(100.000000, 852.000000)">
              <g
                id="-Round-/-AV-/-play_arrow"
                transform="translate(646.000000, 98.000000)"
              >
                <g>
                  <rect
                    id="Rectangle-Copy-50"
                    x="0"
                    y="0"
                    width="24"
                    height="24"
                  ></rect>
                  <path
                    d="M7,6.82 L7,17.18 C7,17.97 7.87,18.45 8.54,18.02 L16.68,12.84 C17.3,12.45 17.3,11.55 16.68,11.15 L8.54,5.98 C7.87,5.55 7,6.03 7,6.82 Z"
                    id="🔹Icon-Color"
                    fill="#1D1D1D"
                  ></path>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </span>
  );
};

const VideoContent = () => {
  const movieTrailerDetails = useSelector(
    (store) => store.movies?.movieTrailer
  );
  const { original_title, title, overview } = movieTrailerDetails;

  return (
    <div className="flex flex-col gap-1 p-16 pt-[23%] absolute text-white bg-gradient-to-r from-black aspect-video w-full">
      <div className="text-5xl font-bold">
        {original_title === title ? original_title : title}
      </div>
      <p className="w-2/5 py-3 font-semibold">{overview}</p>
      <div className="flex gap-3">
        <button className="bg-white p-3 px-8 rounded-md font-bold text-black text-lg flex items-center gap-3 hover:opacity-80">
          {playIconSvg()}
          Play
        </button>
        <button className="bg-gray-500 p-3 px-8 rounded-md font-bold text-lg hover:opacity-80">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoContent;
