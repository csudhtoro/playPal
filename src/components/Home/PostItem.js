import { CalendarRange, MapIcon, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function PostItem({ post }) {
  ///console.log("This is a post:", post);

  return (
    <div className="">
      {post ? (
        <div className="max-w-sm border-2 border-gray-300 rounded-lg shadow h-full w-[30rem]">
          <Image
            className="rounded-t-lg object-cover w-full h-[12rem]"
            src={post.image}
            alt="activity image"
            width={400}
            height={400}
          />
          <div className="p-5 text-start">
            <h5 className="mb-2 text-2xl font-bold text-gray-900">
              {post.title}
            </h5>
            <div className="flex gap-2 items-center">
              <CalendarRange stroke="#f97316" className="text-lg" /> 07/14/2013
            </div>
            <div className="flex gap-1 items-center py-2 font-semibold">
              {" "}
              <MapPin stroke="#f97316" className="text-lg" /> {post.location},{" "}
              {post.zipcode}
            </div>
            <p className="font-semibold text-gray-500 line-clamp-3 text-ellipsis">
              {post.desc}
            </p>
            <div className="flex flex-wrap gap-2 my-5">
              {post.tags.map((tag, indx) => {
                return (
                  <div
                    key={indx}
                    className="py-1 px-3 text-[0.7rem] text-orange-600 rounded-lg font-bold border border-gray-400"
                  >
                    {tag}
                  </div>
                );
              })}
            </div>
            <Link
              href={{ pathname: "/details/", query: post }}
              className="text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full lg:w-auto px-5 py-2.5 text-center"
              //   onClick={() => {
              //     <PostDetail post={post} />;
              //     console.log("clicked post:", post);
              //   }}
            >
              Explore
            </Link>
          </div>
        </div>
      ) : (
        <div>No Posts</div>
      )}
    </div>
  );
}

export default PostItem;
