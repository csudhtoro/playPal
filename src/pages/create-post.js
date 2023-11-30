import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

import CreatePostForm from "@/components/Home/CreatePostForm";

function CreatePost() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, []);
  return <CreatePostForm />;
}

export default CreatePost;
