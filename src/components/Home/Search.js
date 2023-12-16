import React from "react";

function Search({ setQuery }) {
  const handleInput = (e) => {
    //console.log(e.target.value);
    setQuery(e.target.value);
  };

  return (
    <div className="mb-12">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only"
      >
        Search
      </label>
      <div className="flex justify-center items-center px-4">
        <div className=" w-[40rem] relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-slate-900"
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
            className="block w-full p-4 ps-10 text-md rounded-2xl bg-slate-100  border-2 border-slate-300"
            placeholder="Search By Title..."
            required
            onInput={handleInput}
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
