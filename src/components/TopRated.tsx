import React, { useState, useEffect, useContext } from "react";
import Contextpage from "../context/Contextpage";
import { movieProp } from "../types/movie.type";
import Card from "./Card";
import SkeletonLoadingCard from "./SkeletonLoadingCard";
const TopRated = () => {
  const { getTopRatedMovie, isLoading, topMoviesData }: any =
    useContext(Contextpage);

  useEffect(() => {
    getTopRatedMovie();
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
      <h1 className="text-4xl font-semibold mb-12">Top Rated</h1>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6  justify-center items-center justify-items-center">
          {topMoviesData.map((movie: movieProp, index: number) => {
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

export default TopRated;
