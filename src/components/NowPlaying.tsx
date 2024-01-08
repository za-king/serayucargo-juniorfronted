import React, { useState, useEffect } from "react";
import { apiUrl, accesToken } from "../api/service";
import { movieProp } from "../types/movie.type";
import Card from "./Card";
import SkeletonLoadingCard from "./SkeletonLoadingCard";
const NowPlaying = () => {
  const [moviesData, setMoviesData] = useState<movieProp[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState();
  useEffect(() => {
    const getNowPlayingMovie = async () => {
      const url = `${apiUrl}3/movie/now_playing?language=en-US&page=1`;
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

export default NowPlaying;
