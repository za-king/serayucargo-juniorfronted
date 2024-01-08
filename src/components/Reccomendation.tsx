import React, { useState, useEffect } from "react";
import { apiUrl, accesToken } from "../api/service";
import { movieProp } from "../types/movie.type";
import Card from "./Card";
import SkeletonLoadingCard from "./SkeletonLoadingCard";
const Reccomendation = ({ id }: any) => {
  const [moviesData, setMoviesData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState();
  useEffect(() => {
    const getRecommendataionMovie = async (id: number) => {
      const url = `${apiUrl}3/movie/${id}/recommendations?language=en-US&page=1`;
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

    getRecommendataionMovie(id);
  }, [id]);

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
          <SkeletonLoadingCard />
        </div>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-2xl font-semibold">Recommendations</h1>
      <div className="">
        <div className="flex  overflow-x-auto  mt-5 h-full ">
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

export default Reccomendation;
