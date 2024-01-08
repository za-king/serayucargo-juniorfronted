import React from "react";
import Layout from "../components/Layout";
import WatchList from "../components/WatchList";
function Watchlistpage() {
  return (
    <Layout>
      <div className="min-h-screen container py-12">
        <h1 className="text-4xl font-semibold">Your Watchlist</h1>
        <WatchList />
      </div>
    </Layout>
  );
}

export default Watchlistpage;
