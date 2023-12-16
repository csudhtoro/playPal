import Hero from "@/components/Home/Hero";
import Search from "@/components/Home/Search";
import GameList from "@/components/Home/GameList";
import app from "@/shared/FirebaseConfig";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Posts from "@/components/Home/Posts";
import { useAuthContext } from "@/context/AuthUserContext";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

function Dashboard() {
  const db = getFirestore(app);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user === null) router.push("/");
  }, [user]);

  useEffect(() => {
    //retrieving "all" post data from db on load
    if (db) {
      getPost();
    }
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
          : item.title.toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  };

  const getPost = async () => {
    const querySnapshot = await getDocs(collection(db, "PublicPosts"));
    querySnapshot.forEach((doc) => {
      setPosts((posts) => [...posts, doc.data()]);
      setFilteredPosts((posts) => [...posts, doc.data()]);
    });
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="px-5 sm:px-7 md:px-10 pt-6 pb-6 text-center">
          <Hero />
          <Search setQuery={setQuery} />
          <GameList setPosts={setPosts} filteredPosts={filteredPosts} />
          {posts ? <Posts posts={posts} /> : null}
        </div>
      )}
    </>
  );
}

export default Dashboard;
