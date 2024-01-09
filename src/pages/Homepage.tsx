import React, { useEffect, useContext } from "react";
import Layout from "../components/Layout";
import NowPlaying from "../components/NowPlaying";
import TopRated from "../components/TopRated";
import Contextpage from "../context/Contextpage";
function Homepage() {
  const {
    getNowPlayingMovie,
    isLoading,
    nowMoviesData,
    getTopRatedMovie,
    topMoviesData,
  }: any = useContext(Contextpage);
  useEffect(() => {
    getNowPlayingMovie();
    getTopRatedMovie();
  }, []);
  return (
    <Layout>
      <div className="min-h-screen px-4  xl:container ">
        <NowPlaying nowMoviesData={nowMoviesData} isLoading={isLoading} />
        <TopRated topMoviesData={topMoviesData} isLoading={isLoading} />
      </div>
    </Layout>
  );
}

export default Homepage;
