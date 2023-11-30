import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";

function Posts({ posts }) {
  const [post, setPost] = useState();

  //   useEffect(() => {
  //     console.log("Posts", posts);
  //   });

  return (
    <div className=" max-w-[120rem] mx-auto flex flex-wrap justify-center items-start gap-4 sm:gap-6">
      {posts.map((item, indx) => (
        <div key={indx}>
          <PostItem post={item} />
        </div>
      ))}
    </div>
  );
}

export default Posts;
