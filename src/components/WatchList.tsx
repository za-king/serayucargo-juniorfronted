import React, { useState, useEffect } from "react";
import { apiUrl, accesToken } from "../api/service";
import { movieProp } from "../types/movie.type";
import Card from "./Card";
import SkeletonLoadingCard from "./SkeletonLoadingCard";

const WatchList = () => {
  const [moviesData, setMoviesData] = useState<movieProp[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState();
  useEffect(() => {
    const getWatchlistMovie = async () => {
      const sesionId = `eb4624d88fb097700860aa70b58b6ede8e0809c4`;
      const url = `${apiUrl}3/account/16668139/watchlist/movies?language=en-US&page=1&session_id=${sesionId}&sort_by=created_at.asc`;
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

    getWatchlistMovie();
  }, []);

  if (isLoading) {
    return (
      <div className="my-12">
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
  console.log(moviesData);
  return (
    <div className="my-12">
      <div>
        <div className="grid grid-cols-6 ">
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

export default WatchList;
