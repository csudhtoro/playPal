import React, { useEffect, useState } from "react";
import data from "../../shared/data";
import Image from "next/image";

function GameList({ setPosts, filteredPosts }) {
  const [games, setGames] = useState();

  useEffect(() => {
    setGames(data);
    //console.log(games);
  }, []);

  //Filter type - basketball, swimming, tennis, etc...
  const filterType = (category) => {
    console.log(category === "All");
    category === "All"
      ? setPosts(filteredPosts)
      : setPosts(
          filteredPosts.filter((item) => {
            return item.activity === category;
          })
        );
  };

  return (
    <div className="flex justify-center px-6 mb-12">
      <div className="max-w-[38rem]  flex flex-wrap justify-center gap-6">
        {games?.GameList.map((item) => (
          <button
            key={item.id}
            className="flex flex-col items-center cursor-pointer hover:scale-105"
            onClick={() => {
              filterType(item.name);
            }}
          >
            <Image
              src={item.image}
              alt="game image"
              width={45}
              height={45}
              quality={100}
            />
            <h3 className="text-sm text-center font-semibold">{item.name}</h3>
          </button>
        ))}
      </div>
    </div>
  );
}

export default GameList;
