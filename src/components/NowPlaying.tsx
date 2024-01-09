import React, { useState, useEffect, useContext } from "react";

import { movieProp } from "../types/movie.type";
import Card from "./Card";
import SkeletonLoadingCard from "./SkeletonLoadingCard";
import Contextpage from "../context/Contextpage";
const NowPlaying = () => {
  const { getNowPlayingMovie, isLoading, nowMoviesData }: any =
    useContext(Contextpage);
  useEffect(() => {
    getNowPlayingMovie();
  }, []);

  if (isLoading) {
    return (
      <div className="my-12">
        <h1 className="text-4xl font-semibold mb-12 ">Now Playing</h1>
        <div className=" flex gap-4">
          <SkeletonLoadingCard />
          <SkeletonLoadingCard />
          <SkeletonLoadingCard />
          <SkeletonLoadingCard />
          <SkeletonLoadingCard />
        </div>
      </div>
    );
  }
  return (
    <div className="my-12">
      <h1 className="text-4xl font-semibold mb-12 ">Now Playing</h1>
      <div className="">
        <div className="flex  gap-4 overflow-x-auto  mt-5 h-full  justify-center items-center justify-items-center">
          {nowMoviesData.map((movie: movieProp, index: number) => {
            return (
              <div key={index}>
                <Card movieData={movie} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;
