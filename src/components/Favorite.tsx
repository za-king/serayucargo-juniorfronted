import React, { useState, useEffect } from "react";
import { apiUrl, accesToken } from "../api/service";
import { movieProp } from "../types/movie.type";
import Card from "./Card";
import SkeletonLoadingCard from "./SkeletonLoadingCard";

const Favorite = () => {
  const [moviesData, setMoviesData] = useState<movieProp[] | any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState();

  useEffect(() => {
    const getFavoriteMovie = async () => {
      const sesionId = `db89673af2ca315a713b8e775c44a91320137026`;
      const url = `${apiUrl}3/account/16668139/favorite/movies?language=en-US&page=1&session_id=${sesionId}&sort_by=created_at.asc`;
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
        localStorage.setItem("favorite", JSON.stringify(data.results));
        const local = JSON.parse(localStorage.getItem("favorite") || "");
        setMoviesData(local);
      } catch (error: any) {
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getFavoriteMovie();
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

export default Favorite;
