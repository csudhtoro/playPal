import PostDetail from "@/components/Home/PostDetail";
import React from "react";
import { useRouter } from "next/router";

function Details() {
  const router = useRouter();
  const post = router.query;

  return <PostDetail post={post} />;
}

export default Details;
