import React, { useEffect, useState } from "react";
import data from "../../shared/data";
import Image from "next/image";

function GameList() {
  const [games, setGames] = useState();

  useEffect(() => {
    setGames(data);
    //console.log(games);
  }, []);

  return (
    <div className="flex justify-center px-6 mb-12">
      <div className="max-w-[38rem]  flex flex-wrap justify-center gap-6">
        {games?.GameList.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center cursor-pointer"
          >
            <Image
              src={item.image}
              alt="game image"
              width={45}
              height={45}
              quality={100}
              className="hover:animate-bounce transition duration-150"
            />
            <h3 className="text-sm text-center font-semibold">{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameList;
