import React, { useState } from "react";

function Search() {
  const [searchedText, setSearchedText] = useState("");

  const onSearchButtonClick = () => {
    console.log("Searched Text:", searchedText);
  };

  return (
    <div className="mb-12">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-black sr-only"
      >
        Search
      </label>
      <div className="flex justify-center items-center px-4">
        <div className=" w-[40rem] relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-black"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-md rounded-2xl bg-gray-100  border border-gray-300"
            placeholder="Zip, Tag or Activity..."
            required
            onChange={(text) => setSearchedText(text.target.value)}
          />
          <button
            type="submit"
            className="text-white absolute end-3 bottom-3 bg-orange-600 hover:bg-orange-700 focus:ring-2 focus:ring-black focus:outline-none font-bold rounded-lg text-xs text-center sm:text-sm px-5 sm:px-6 py-2.5"
            onClick={() => onSearchButtonClick()}
          >
            SEARCH
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;
