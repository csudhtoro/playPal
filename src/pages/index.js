import Hero from "@/components/Home/Hero";
import Search from "@/components/Home/Search";
import GameList from "@/components/Home/GameList";
import app from "@/shared/FirebaseConfig";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Posts from "@/components/Home/Posts";

export default function Home() {
  const db = getFirestore(app);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    //retrieving "all" post data from db on load
    getPost();
  }, []);

  useEffect(() => {
    filterBySearch(query);
  }, [query]);

  //Filter by query
  const filterBySearch = (searchTerm) => {
    setPosts(
      filteredPosts.filter((item) => {
        return searchTerm.toLowerCase() === " "
          ? filteredPosts(posts)
          : item.title.toLowerCase().includes(searchTerm);
      })
    );
  };

  const getPost = async () => {
    const querySnapshot = await getDocs(collection(db, "PublicPosts"));
    querySnapshot.forEach((doc) => {
      setPosts((posts) => [...posts, doc.data()]);
      setFilteredPosts((posts) => [...posts, doc.data()]);
    });
  };

  return (
    <div className="px-5 sm:px-7 md:px-10 mt-7 text-center">
      <Hero />
      <Search setQuery={setQuery} />
      <GameList setPosts={setPosts} filteredPosts={filteredPosts} />
      {posts ? <Posts posts={posts} /> : null}
    </div>
  );
}
