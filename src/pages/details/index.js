import PostDetail from "@/components/Home/PostDetail";
import React from "react";
import { useRouter } from "next/router";

function Detail() {
  const router = useRouter();
  return <PostDetail post={router.query} />;
}

export default Detail;
