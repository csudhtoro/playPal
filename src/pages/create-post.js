import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthUserContext";

import CreatePostForm from "@/components/Home/CreatePostForm";

function CreatePost() {
  //const { data: session } = useSession();
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user === null) router.push("/");
  }, [user]);

  return <CreatePostForm />;
}

export default CreatePost;
