import React from "react";
import { Focus, GetTimeAndDate, Quotes, Weather } from "../components";

export const Home = () => {
  return (
    <div className="text-center text-white font-semibold  sm:h-screen flex py-40 sm:justify-center	sm:items-center flex-col	z-10">
      <span>
        <Weather />
      </span>

      <span className="text-3xl">
        <GetTimeAndDate />
      </span>

      <span>
        <Focus />
      </span>

      <span className="m-4 absolute bottom-14">
        <Quotes />
      </span>
    </div>
  );
};
