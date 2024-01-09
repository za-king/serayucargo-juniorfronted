import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./hooks/usePrivateRoute";
import Homepage from "./pages/Homepage";
import Favoritepage from "./pages/Favoritepage";
import Watchlistpage from "./pages/Watchlistpage";
import DetailMovepage from "./pages/DetailMovepage";
import { MovieProvider } from "./context/Contextpage";
import { ToastContainer } from "react-toastify";
import "./App.css";

function App() {
  const [isAuth, setIsAuth] = useState<string | any>("");

  useEffect(() => {
    const session = sessionStorage.getItem("session_id");
    setIsAuth(session);
  }, []);
  return (
    <BrowserRouter>
      <MovieProvider>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/favorite"
            element={
              <PrivateRoute isAuth={isAuth}>
                <Favoritepage />
              </PrivateRoute>
            }
          />
          <Route
            path="/watchlist"
            element={
              <PrivateRoute isAuth={isAuth}>
                <Watchlistpage />
              </PrivateRoute>
            }
          />
          <Route path="/movie/:id" element={<DetailMovepage />} />
        </Routes>
      </MovieProvider>
    </BrowserRouter>
  );
}

export default App;
