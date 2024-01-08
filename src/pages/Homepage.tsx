import React from "react";
import Layout from "../components/Layout";
import NowPlaying from "../components/NowPlaying";
import TopRated from "../components/TopRated";
function Homepage() {
  return (
    <Layout>
      <div className="min-h-screen px-4  xl:container ">
        <NowPlaying />
        <TopRated />
      </div>
    </Layout>
  );
}

export default Homepage;
