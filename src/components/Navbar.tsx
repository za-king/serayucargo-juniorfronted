import React, { useState, useEffect, useContext } from "react";
import Search from "./Search";
import Contextpage from "../context/Contextpage";

const Navbar = () => {
  const { Login, Logout, isAuth, getUser }: any = useContext(Contextpage);
  const handleLogin = () => {
    Login();
  };
  const handleLogout = () => {
    Logout();
  };

  useEffect(() => {
    getUser();
  }, [isAuth, getUser]);
  return (
    <div className="navbar   bg-[#0EA5E9] xl:container">
      <div className="flex-none md:hidden">
        <div className="drawer z-50">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}

            <label
              htmlFor="my-drawer"
              className="btn rounded bg-transparent border-none swap swap-rotate"
            >
              {/* this hidden checkbox controls the state */}
              <input type="checkbox" />

              {/* hamburger icon */}
              <svg
                className="swap-off fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>

              {/* close icon */}
              <svg
                className="swap-on fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              <li>
                <a href="/favorite">Favorite</a>
              </li>
              <li>
                <a href="/watchlist">Watchlist</a>
              </li>

              {isAuth === null ? (
                <li>
                  <button onClick={handleLogin}>Login</button>
                </li>
              ) : (
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex-1 ">
        <a
          className="btn btn-ghost text-4xl font-bold tracking-[.25em] p-0"
          href="/"
        >
          CINEMA
        </a>
      </div>
      <div className="flex-none">
        <div className="form-control">
          <Search />
        </div>
        <ul className="menu menu-horizontal px-1  hidden md:flex">
          <li>
            <a href="/favorite">Favorite</a>
          </li>
          <li>
            <a href="/watchlist">Watchlist</a>
          </li>

          {isAuth === null ? (
            <li>
              <button onClick={handleLogin}>Login</button>
            </li>
          ) : (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
