import React, { useState, useEffect, useContext } from "react";
import {
  MdFavorite,
  MdFavoriteBorder,
  MdOutlineTurnedInNot,
  MdOutlineTurnedIn,
} from "react-icons/md";
import { imageUrl } from "../api/service";
import { useNavigate } from "react-router-dom";
import Contextpage from "../context/Contextpage";
import { apiUrl, accesToken } from "../api/service";
import { movieProp } from "../types/movie.type";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Card = ({ movieData }: any) => {
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState<boolean | null>(null);
  const [isWatchlist, setIsWatchlist] = useState<boolean | null>(null);

  const {
    isAuth,
    getUser,
    setIsLoading,
    getFavoriteMovie,
    getWatchlistMovie,
    watchlistMoviesData,
    favoriteMoviesData,
  }: any = useContext(Contextpage);

  useEffect(() => {
    getUser();
    handleWatchlistLogic(movieData.id);
    handleFavoriteLogic(movieData.id);
  }, [isAuth, isWatchlist, isFavorite]);

  const handleWatchlistLogic = async (movie_id: number) => {
    (await watchlistMoviesData?.filter(
      (movie: movieProp) => movie?.id === movie_id
    ).length) > 0
      ? setIsWatchlist(true)
      : setIsWatchlist(false);
  };
  const handleFavoriteLogic = async (movie_id: number) => {
    (await favoriteMoviesData?.filter(
      (movie: movieProp) => movie?.id === movie_id
    ).length) > 0
      ? setIsFavorite(true)
      : setIsFavorite(false);
  };

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

  const handleNavigate = (id: number) => {
    navigate(`/movie/${id}`);
  };
  return (
    <div className="relative group card  card-compact w-48 h-96  m-2 bg-base-100 shadow-xl rounded-lg cursor-pointer">
      <figure>
        <img
          src={`${imageUrl}w500${movieData.poster_path}`}
          alt="Shoes"
          onClick={() => {
            handleNavigate(movieData.id);
          }}
        />
      </figure>
      <div className="  absolute opacity-0 fd-sh group-hover:opacity-100  bottom-28 right-4 ">
        <div className="flex b">
          <button
            onClick={() => {
              handleWatchlistButton(movieData.id);
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
              handleFavoriteButton(movieData.id);
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
      <div className="card-body bg-[#050E12] rounded-b-lg">
        <p className="text-2xl font-bold truncate">{movieData.title}</p>
        <p>{movieData.release_date.substring(0, 4)}</p>
      </div>
    </div>
  );
};

export default Card;
