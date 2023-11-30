import { MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

function PostDetail({ post }) {
  console.log("this is post item in PostDetail:", post);
  return (
    <div className="max-w-[1126px] mx-auto mt-6 mb-6">
      <div className="flex justify-end px-6 sm:text-xl text-black font-bold">
        August 24th 2023
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
          <MapPin fill="#f97316" className="sm:text-2xl" />{" "}
          <span className="text-[.6rem] sm:text-sm md:text-lg">
            {post.location},
          </span>
          <span className="text-[.6rem] sm:text-sm md:text-lg">
            {post.zipcode}
          </span>
        </div>
        <div className="px-6">
          <span className="text-[.6rem] sm:text-sm md:text-lg">
            {post.slotsAvailable} Slots Available;{" "}
          </span>
          <span className="text-[.6rem] sm:text-sm md:text-lg italic">
            {post.slotsTaken} Attending
          </span>
        </div>
        <div className="px-6">
          <span className="text-[.6rem] sm:text-sm md:text-lg">
            Organizer: <span className="font-semibold">{post.createdBy}</span>
          </span>{" "}
        </div>
      </div>

      <div className="px-6 mt-6 sm:mt-12 text-center text-[2rem] sm:text-[3rem] font-bold">
        {post.title}
      </div>

      <div className="px-8 mt-4 text-lg sm:text-[1.4rem] text-center text-gray-500">
        {post.desc}
      </div>

      <div className="flex flex-wrap justify-center gap-2 px-12 py-6">
        {post.tags.map((tag, indx) => {
          return (
            <div
              key={indx}
              className="py-1 px-3 text-[.7rem] sm:text-[1.5rem] text-orange-600 rounded-lg font-bold border border-gray-400"
            >
              {tag}
            </div>
          );
        })}
      </div>
      <p className="px-6 mt-6 text-[1.5rem] sm:text-[2.2rem] text-center lg:text-start font-semibold">
        Interested?
      </p>
      <div className="flex flex-col lg:flex-row lg:flex-wrap gap-3 ">
        <form className="px-6 flex flex-col items-center xl:w-1/3">
          <div className="my-5 w-80 max-w-lg">
            <input
              type="text"
              id="base-input"
              className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
              placeholder="First Name..."
            />
          </div>
          <div className="my-5 w-80 max-w-lg">
            <input
              type="text"
              id="base-input"
              className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
              placeholder="Last Name..."
            />
          </div>
          <div className="my-5 w-80 max-w-lg">
            <input
              type="text"
              id="base-input"
              className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
              placeholder="Phone Number..."
            />
          </div>
          <div className="mt-5 mb-3 w-80 max-w-lg">
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-500 focus:ring-orange-500 focus:border-orange-500 "
              placeholder="Write your thoughts here..."
            ></textarea>
          </div>
          <div className="mt-3 mb-5 w-80 max-w-lg flex justify-center lg:justify-start">
            <button
              type="submit"
              className="text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full lg:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </div>
        </form>
        <Image
          src="https://images.unsplash.com/photo-1578924825042-31d14cf13c35?q=80&w=1239&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="location map"
          width={966}
          height={597}
          className="max-w-[700px] object-cover rounded-lg shadow-md shadow-zinc-400 mx-auto w-[90%] lg:w-3/5"
        />
      </div>
    </div>
  );
}

export default PostDetail;
