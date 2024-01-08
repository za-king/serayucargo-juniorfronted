import React, { useEffect, useState } from "react";
import { apiUrl, accesToken } from "../api/service";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
const Search = () => {
  const [moviesData, setMoviesData] = useState<any>([]);
  const [searchName, setSearchName] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState();
  const [value] = useDebounce(searchName, 1000);

  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    const getSearchMovie = async () => {
      const url = `${apiUrl}3/search/movie?query=${searchName}&include_adult=false&language=en-US&page=1`;
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
        setMoviesData(data.results);
      } catch (error: any) {
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getSearchMovie();
  }, [value]);

  return (
    <div className="mx-2  ">
      <button
        className="btn bg-white border-none rounded-md "
        onClick={() =>
          (
            document.getElementById("my_modal_1") as HTMLButtonElement | any
          ).showModal()
        }
      >
        <IoSearch />
      </button>
      <dialog id="my_modal_1" className="modal sm:modal-middle ">
        <div className="modal-box rounded-lg">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered w-full  input-primary relative"
            onChange={(e) => {
              setSearchName(e.target.value);
            }}
          />
          <div className="my-4">
            <div>
              {isLoading ? (
                <div className="w-full h-10 text-center">
                  <span className="loading loading-spinner loading-md"></span>
                </div>
              ) : (
                moviesData.map((movie: any) => {
                  return (
                    <div
                      className="shadow p-2 rounded cursor-pointer text-white"
                      key={movie.id}
                      onClick={() => {
                        navigate(`/movie/${movie.id}`);
                      }}
                    >
                      {movie.title}
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Search;
