import React, { useState, useEffect } from "react";
import { apiUrl, apiKey, accesToken } from "../api/service";
import { movieProp } from "../types/movie.type";
import Card from "./Card";
import SkeletonLoadingCard from "./SkeletonLoadingCard";
const TopRated = () => {
  const [moviesData, setMoviesData] = useState<movieProp[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState();

  useEffect(() => {
    const getTopRatedMovie = async () => {
      const url = `${apiUrl}3/movie/top_rated?language=en-US&page=1`;
      const option = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accesToken}`,
        },
      };
      setIsLoading(true);
      try {
        const response = await fetch(url, option);
        const data = await response.json();
        setMoviesData(data.results);
      } catch (error: any) {
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    };

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
          {moviesData.map((movie: movieProp, index: number) => {
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
