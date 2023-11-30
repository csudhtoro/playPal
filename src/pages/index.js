import Hero from "@/components/Home/Hero";
import Search from "@/components/Home/Search";
import GameList from "@/components/Home/GameList";
import app from "@/shared/FirebaseConfig";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  getDoc,
  query,
  doc,
  where
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Posts from "@/components/Home/Posts";

export default function Home() {
  const db = getFirestore(app);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      setPosts((posts) => [...posts, doc.data()]);
    });
  };

  return (
    <div className="px-5 sm:px-7 md:px-10 mt-7 text-center">
      <Hero />
      <Search />
      <GameList />
      {posts ? <Posts posts={posts} /> : null}
    </div>
  );
}
