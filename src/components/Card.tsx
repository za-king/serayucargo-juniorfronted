import React, { useState, useEffect } from "react";
import {
  MdFavorite,
  MdFavoriteBorder,
  MdOutlineTurnedInNot,
  MdOutlineTurnedIn,
} from "react-icons/md";
import { imageUrl } from "../api/service";
import { useNavigate } from "react-router-dom";
import { useMovieHook } from "../hooks/useMovie.hook";
import { apiUrl, accesToken } from "../api/service";
const Card = ({ movieData }: any) => {
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState<boolean | null>(null);
  const [isWatchlist, setIsWatchlist] = useState<boolean | null>(null);

  const handleFavoriteButton = async (movie_id: number) => {
    const url = `${apiUrl}3/account/16668139/favorite?session_id=db89673af2ca315a713b8e775c44a91320137026`;
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

    const response = await fetch(url, option);
    const data = await response.json();
    console.log(data);
  };
  const handleWatchlistButton = async (movie_id: number) => {
    const url = `${apiUrl}3/account/16668139/watchlist?session_id=db89673af2ca315a713b8e775c44a91320137026`;
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

    const response = await fetch(url, option);
    const data = await response.json();
    console.log(data);
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
