import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./hooks/usePrivateRoute";
import Homepage from "./pages/Homepage";
import Favoritepage from "./pages/Favoritepage";
import Watchlistpage from "./pages/Watchlistpage";
import DetailMovepage from "./pages/DetailMovepage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/favorite"
          element={
            <PrivateRoute isAuth={true}>
              <Favoritepage />
            </PrivateRoute>
          }
        />
        <Route
          path="/watchlist"
          element={
            <PrivateRoute isAuth={true}>
              <Watchlistpage />
            </PrivateRoute>
          }
        />
        <Route path="/movie/:id" element={<DetailMovepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
