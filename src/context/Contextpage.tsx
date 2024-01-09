import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { movieProp } from "../types/movie.type";
import {
  apiKey,
  apiUrl,
  accesToken,
  accountId,
  accountUserName,
  accountPassword,
} from "../api/service";
import { toast } from "react-toastify";

interface CurrentUserContextType {
  getFavoriteMovie: () => Promise<void>;
  favoriteMoviesData: any;
  setFavoriteMoviesData: React.Dispatch<any>;
  isLoading: boolean;
  isError: undefined;
}

const initialState = {};

const Contextpage = createContext(initialState);

export function MovieProvider({ children }: any) {
  const [favoriteMoviesData, setFavoriteMoviesData] = useState<
    movieProp[] | any
  >([]);
  const [watchlistMoviesData, setWatchlistMoviesData] = useState<
    movieProp[] | any
  >([]);
  const [nowMoviesData, setNowMoviesData] = useState<movieProp[] | any>([]);
  const [topMoviesData, setTopMoviesData] = useState<movieProp[] | any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<string | any>("");
  const [isError, setIsError] = useState();

  const navigate = useNavigate();

  const getFavoriteMovie = async () => {
    const sesionId = `f13aff57dd2e15ba3b722b05d675a35edc1a67d4`;
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
      setFavoriteMoviesData(local);
    } catch (error: any) {
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getWatchlistMovie = async () => {
    const sesionId = `f13aff57dd2e15ba3b722b05d675a35edc1a67d4`;
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
      setWatchlistMoviesData(data.results);
    } catch (error: any) {
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

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
      setNowMoviesData(data.results);
    } catch (error: any) {
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

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
      setTopMoviesData(data.results);
    } catch (error: any) {
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const Login = async (accountUserName: string, accountPassword: string) => {
    sessionStorage.setItem(
      "session_id",
      "f13aff57dd2e15ba3b722b05d675a35edc1a67d4"
    );
    toast.success("Login Succes !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    getUser();
  };

  const getRequestToken = async () => {
    const url = `${apiUrl}3/authentication/token/new`;
    const option = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accesToken}`,
      },
    };

    const response = await fetch(url, option);
    const data = await response.json();
    return data.request_token;
  };

  const AuthorizeToken = async () => {
    const token = getRequestToken();
    console.log(token);
    const url = `${apiUrl}authenticate/${token}`;
    const option = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accesToken}`,
      },
    };
    const response = await fetch(url, option);
    const data = await response.json();
    console.log(data);
  };

  const Logout = async () => {
    // const url = `${apiUrl}3/authentication/session`;
    // const option = {
    //   method: "DELETE",
    //   headers: {
    //     accept: "application/json",
    //     Authorization: `Bearer ${accesToken}`,
    //   },
    // };

    // const response = await fetch(url, option);
    // const data = await response.json();
    sessionStorage.removeItem("session_id");
    toast.success("Logout Succes !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    getUser();
    navigate("/");
  };

  const getUser = () => {
    const session = sessionStorage.getItem("session_id");
    setIsAuth(session);
  };

  useEffect(() => {
    getFavoriteMovie();
    getWatchlistMovie();
  }, []);

  return (
    <Contextpage.Provider
      value={{
        getFavoriteMovie,
        favoriteMoviesData,
        setFavoriteMoviesData,
        getWatchlistMovie,
        watchlistMoviesData,
        setWatchlistMoviesData,
        getNowPlayingMovie,
        nowMoviesData,
        setNowMoviesData,
        getTopRatedMovie,
        topMoviesData,
        setTopMoviesData,
        Login,
        Logout,
        getUser,
        isAuth,
        isLoading,
        isError,
      }}
    >
      {children}
    </Contextpage.Provider>
  );
}

export default Contextpage;
