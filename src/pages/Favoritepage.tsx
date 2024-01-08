import React from "react";
import Layout from "../components/Layout";
import Favorite from "../components/Favorite";
function Favoritepage() {
  return (
    <Layout>
      <div className="min-h-screen container py-12">
        <h1 className="text-4xl font-semibold">Your Favorite Movie</h1>
        <Favorite />
      </div>
    </Layout>
  );
}

export default Favoritepage;
