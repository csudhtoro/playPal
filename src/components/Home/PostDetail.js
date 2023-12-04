import Image from "next/image";
import React from "react";
import MapBox from "./MapBox";
import { PiMapPinLineDuotone } from "react-icons/pi";
import { FaRegCalendarMinus } from "react-icons/fa";

function PostDetail({ post }) {
  //console.log("this is post item in PostDetail:", post);
  //console.log(typeof post.tags);
  return (
    <div className="max-w-[1126px] mx-auto mt-6 mb-6">
      <div className="flex justify-end px-6 sm:text-xl text-black font-bold">
        <div className="flex gap-2 items-center pb-4">
          <FaRegCalendarMinus fill="#0356fc" /> July 14th 2023
        </div>
      </div>
      <div className="w-fit px-6">
        <Image
          className="rounded-lg object-cover w-screen max-h-[40rem] shadow-zinc-400 shadow-md"
          src={post.image}
          alt="activity image"
          width={966}
          height={597}
          quality={100}
        />
      </div>
      <div className="flex justify-between py-2">
        <div className="flex gap-1 items-center px-6">
          {" "}
          <PiMapPinLineDuotone fill="#0356fc" size={20} />{" "}
          <span className="text-[.5rem] sm:text-[.5rem] md:text-lg">
            {post.location}
          </span>
          <span className="text-[.5rem] sm:text-sm md:text-lg">
            {post.zipCode}
          </span>
        </div>
        <div className="px-6">
          <span className="flex items-center gap-2 text-[.6rem] sm:text-sm md:text-lg">
            Organizer:
            <span className="font-semibold">
              <Image
                src={post.userImage}
                width={25}
                height={25}
                alt="user image"
                className="rounded-full"
              />
            </span>
          </span>{" "}
        </div>
      </div>

      <div className="px-6 mt-6 sm:mt-12 text-center text-[2rem] sm:text-[3rem] font-bold">
        {post.title}
      </div>

      <div className="px-20 mt-4 text-lg sm:text-[1.4rem] text-center text-gray-500">
        {post.desc}
      </div>

      <div className="flex flex-wrap justify-center gap-2 px-12 py-6">
        {post.tags &&
          post.tags.map((tag, indx) => {
            return (
              <div
                key={indx}
                className="py-1 px-3 text-[.7rem] sm:text-[1.3rem] text-black rounded-lg font-bold border-2 bg-gray-100 shadow-sm sm:shadow-sm sm:shadow-gray-400"
              >
                {tag}
              </div>
            );
          })}
      </div>
      <>
        <div className="mt-8 sm:mt-14">
          <MapBox location={post.zipCode} />
        </div>
      </>
    </div>
  );
}

export default PostDetail;
