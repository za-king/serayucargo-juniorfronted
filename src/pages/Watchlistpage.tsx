import React, { useState, useEffect, useContext } from "react";
import { apiUrl, accesToken } from "../api/service";
import { movieProp } from "../types/movie.type";
import Card from "../components/Card";
import SkeletonLoadingCard from "../components/SkeletonLoadingCard";
import Layout from "../components/Layout";
import Contextpage from "../context/Contextpage";
function Watchlistpage() {
  const { getWatchlistMovie, isLoading, watchlistMoviesData }: any =
    useContext(Contextpage);
  useEffect(() => {
    getWatchlistMovie();
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen my-12 container">
          <h1 className="text-4xl font-semibold mb-12 ">Your Watchlist</h1>
          <div className=" flex gap-4">
            <SkeletonLoadingCard />
            <SkeletonLoadingCard />
            <SkeletonLoadingCard />
            <SkeletonLoadingCard />
            <SkeletonLoadingCard />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen xl:container px-4  py-12">
        <h1 className="text-4xl font-semibold">Your Watchlist</h1>
        <div className="my-12">
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6  justify-center items-center justify-items-center">
              {watchlistMoviesData.map((movie: movieProp, index: number) => {
                return (
                  <div key={index}>
                    <Card movieData={movie} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Watchlistpage;
