import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { FaMapPin } from "react-icons/fa6";

function PostItem({ post }) {
  const router = useRouter();

  const [serializedTags, setSerializedTags] = useState(
    JSON.stringify(post.tags)
  );

  //console.log(serializedTags);

  return (
    <div>
      {post ? (
        <div className="max-w-sm border-2 border-slate-300 rounded-lg shadow-sm h-full sm:w-[30rem]">
          <div className="mx-auto p-2">
            <Image
              className="rounded-md object-cover w-full h-[12rem] shadow-lg shadow-slate-400"
              src={post.image}
              alt="activity image"
              width={400}
              height={400}
            />
          </div>
          <div className="p-6 text-start">
            <h5 className="mb-2 text-2xl font-bold text-gray-900">
              {post.title}
            </h5>

            <div className="text-sm flex gap-1 justify-start items-center py-2 font-semibold">
              {" "}
              <FaMapPin fill="#0356fc" size={20} /> {post.location},{" "}
              {post.zipCode}
            </div>
            <p className="font-semibold text-slate-500 line-clamp-3 text-ellipsis text-sm">
              {post.desc}
            </p>
            <div className="flex flex-wrap justify-start gap-2 mt-6 mb-8">
              {post.tags.map((tag, indx) => {
                return (
                  <div
                    key={indx}
                    className="py-1 px-3 text-[0.7rem] text-gray-900 rounded-lg font-semibold bg-slate-100 border-2 border-slate-400 shadow-sm"
                  >
                    {tag.label}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-2 justify-between">
              <button
                onClick={() =>
                  router.push({
                    pathname: "/details",
                    query: { ...post, tags: serializedTags }
                  })
                }
                className="text-white bg-[#0356fc] hover:bg-[#0339a3] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-xs font-semibold w-full lg:w-auto px-5 py-2.5 text-center "
              >
                Explore
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>No Posts</div>
      )}
    </div>
  );
}

export default PostItem;
