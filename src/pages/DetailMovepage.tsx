import React, { useState, useEffect, useContext } from "react";
import Layout from "../components/Layout";
import { apiKey, accesToken, apiUrl, imageUrl } from "../api/service";
import { useParams } from "react-router-dom";
import Reccomendation from "../components/Reccomendation";
import { genreProp } from "../types/movie.type";
import { BsDot } from "react-icons/bs";
import {
  MdFavorite,
  MdFavoriteBorder,
  MdOutlineTurnedInNot,
  MdOutlineTurnedIn,
} from "react-icons/md";
import Contextpage from "../context/Contextpage";
import { toast } from "react-toastify";

function DetailMovepage() {
  const [moviesData, setMoviesData] = useState<any>({});
  const [isFavorite, setIsFavorite] = useState<boolean | null>(null);
  const [isWatchlist, setIsWatchlist] = useState<boolean | null>(null);
  const [isRating, setIsRating] = useState<string | null>(null);
  let { id } = useParams();

  const { isAuth, getUser, setIsLoading }: any = useContext(Contextpage);
  useEffect(() => {
    getUser();
  }, [isAuth]);

  const handleFavoriteButton = async (movie_id: number) => {
    const url = `${apiUrl}3/account/16668139/favorite?session_id=${isAuth}`;
    const option = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${accesToken}`,
      },
      body: JSON.stringify({
        media_type: "movie",
        media_id: movie_id,
        favorite: true,
      }),
    };

    if (isAuth != null) {
      const response = await fetch(url, option);
      const data = await response.json();
      console.log(data);
      toast.success("Succes Add to Favorite !", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      toast.error("Your not login", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };
  const handleWatchlistButton = async (movie_id: number) => {
    const url = `${apiUrl}3/account/16668139/watchlist?session_id=${isAuth}`;
    const option = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${accesToken}`,
      },
      body: JSON.stringify({
        media_type: "movie",
        media_id: movie_id,
        watchlist: true,
      }),
    };

    if (isAuth != null) {
      const response = await fetch(url, option);
      const data = await response.json();
      console.log(data);
      toast.success("Succes Add to Watchlist !", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      toast.error("Your Not login", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  useEffect(() => {
    const getMovieByIdMovie = async () => {
      const url = `${apiUrl}3/movie/${id}?language=en-US`;
      const option = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accesToken}`,
        },
      };
      const response = await fetch(url, option);
      const data = await response.json();
      setMoviesData(data);
    };

    getMovieByIdMovie();
  }, [id]);

  const handleRatingMovie = async () => {
    const url = `${apiUrl}3/movie/${id}/rating`;
    const option = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${accesToken}`,
      },
    };
  };

  const handleTime = (time: number) => {
    var Hours = Math.floor(time / 60);
    var minutes = time % 60;

    var format = `${Hours}h ${minutes}m`;

    return format;
  };

  console.log(moviesData);
  return (
    <Layout>
      <div className="min-h-screen  ">
        <div
          className="bg-cover bg-no-repeat  "
          style={{
            backgroundImage: `url('${imageUrl}original${moviesData?.backdrop_path}')`,
          }}
        >
          <div className="min-h-96 px:4   xl:container ">
            <div className="px-2  py-14 flex flex-col md:flex-row gap-6   justify-items-start ">
              <figure className="w-48 ">
                <img
                  src={`${imageUrl}w500${moviesData?.poster_path}`}
                  alt={`${moviesData?.title}`}
                  className="rounded-lg"
                />
              </figure>

              <div className="text-white ">
                <h1 className="text-3xl">
                  <b>{moviesData.title}</b>
                  {` (${moviesData.release_date?.substring(0, 4)})`}
                </h1>

                <div className="flex">
                  {moviesData?.release_date}
                  <BsDot size={20} />
                  {moviesData.genres?.map((genre: genreProp) => {
                    return (
                      <div className="flex flex-row">
                        <p>{genre.name}</p>
                      </div>
                    );
                  })}
                  <BsDot size={20} />
                  {handleTime(moviesData?.runtime)}
                </div>
                <div>
                  {" "}
                  <div className="flex b">
                    <button
                      onClick={() => {
                        handleWatchlistButton(moviesData.id);
                      }}
                    >
                      {isWatchlist ? (
                        <MdOutlineTurnedIn size={30} />
                      ) : (
                        <MdOutlineTurnedInNot size={30} />
                      )}
                    </button>
                    <button
                      onClick={() => {
                        handleFavoriteButton(moviesData.id);
                      }}
                    >
                      {isFavorite ? (
                        <MdFavorite size={30} />
                      ) : (
                        <MdFavoriteBorder size={30} />
                      )}
                    </button>
                  </div>
                </div>
                <div className="opacity-75 italic">{moviesData.tagline}</div>
                <div className="font-bold">Overview</div>
                <div>{` ${moviesData.overview?.substring(0, 80)}...`}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-12  px-4 lg:container-xl xl:container">
          <Reccomendation id={id} />
        </div>
      </div>
    </Layout>
  );
}

export default DetailMovepage;
