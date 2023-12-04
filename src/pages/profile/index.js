import {
  getFirestore,
  collection,
  query,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import app from "./../../shared/FirebaseConfig";
import React, { useEffect, useState } from "react";
import PostItem from "@/components/Home/PostItem";
import { Ghost, TrashIcon } from "lucide-react";
import Toast from "../../components/Home/Toast";
import { useRouter } from "next/router";

function Profile() {
  const { data: session } = useSession();
  const db = getFirestore(app);
  const router = useRouter();

  const [ownedPosts, setOwnedPosts] = useState([]);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    getUserOwnedPosts();
  }, [session]);

  const getUserOwnedPosts = async () => {
    if (session?.user.email) {
      const q = query(
        collection(db, "Posts", session.user.email, "PostsOwned")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setOwnedPosts((ownedPosts) => [...ownedPosts, doc.data()]);
      });
    }
  };

  const onDeletePost = async (title) => {
    const postId = title.split("").reverse().join("");

    //deleting from logged in user collection
    await deleteDoc(doc(db, "Posts", session.user.email, "PostsOwned", postId));

    //deleting from public collection
    await deleteDoc(doc(db, "PublicPosts", postId));
    presentToast();
  };

  const presentToast = () => {
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
      router.push("/");
    }, 2000);
  };

  return (
    <div className="h-screen">
      {showToast ? (
        <div className="absolute top-10 right-10">
          <Toast
            msg={"Post Deleted Successfully"}
            closeToast={() => setShowToast(false)}
          />
        </div>
      ) : null}
      <div className="lg:max-w-[1126px] mx-auto py-6">
        <h2 className="px-6 text-center lg:text-start text-[3rem] font-extrabold text-[#0356fc]">
          Profile{" "}
          <span className="text-gray-900 text-[0.8rem] font-semibold">
            ({session.user.email})
          </span>
        </h2>
        <p className="text-[1rem] font-semibold text-slate-500 px-6 text-center lg:text-start">
          Manage your posts
        </p>
        <div className="text-center lg:text-center text-[2rem] font-bold text-[#0356fc] border-b-slate-100 border-b-2 px-6 mt-12 py-2">
          My Posts
        </div>
        <div className="max-w-[120rem] mx-auto flex flex-wrap justify-center items-start gap-4 sm:gap-6">
          {ownedPosts.length > 0 ? (
            ownedPosts.map((item, indx) => (
              <div key={indx} className="relative p-3">
                <PostItem post={item} />
                <button className="p-2 w-fit text-sm text-white font-semibold rounded-md absolute top-5 right-5">
                  <TrashIcon
                    stroke="#fff"
                    fill="#db2525"
                    size={24}
                    className="hover:scale-110"
                    onClick={() => onDeletePost(item.title)}
                  />
                </button>
              </div>
            ))
          ) : (
            <>
              <div className="p-6 w-full h-[50%] flex flex-col items-center justify-center gap-3">
                <Ghost stroke="#000" size={42} />
                <p className="text-lg font-semibold">Nothing to see here...</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
