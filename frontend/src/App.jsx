import { useEffect, useState } from "react";
import Header from "./componets/Header";
import CreatePost from "./componets/CreatePost";
import FeedFilters from "./componets/FeedFilters";
import PostCard from "./componets/PostCard";
import Navbar from "./componets/Navbar";

import "./App.css";
import AuthPage from "./pages/Auth";
import { clientServer } from "./config";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [auth, setAuth] = useState(false);
  const [posts, setPosts] = useState([]);

  const featchPosts = async () => {
    const responce = await clientServer.get("/posts", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    setPosts(responce.data.posts);
    console.log(responce.data.posts);
  };

  useEffect(() => {
    featchPosts();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuth(true);
    }
  }, []);

  const handleDelete = async (id) => {
    const responce = await clientServer.delete(`/post/${id}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    const newPosts = posts.filter((post) => post._id !== id);
    setPosts(newPosts);
    console.log(responce);
  };

  return (
    <div className={`app ${isDarkMode ? "dark-mode" : ""}`}>
      {auth === true ? (
        <>
          <Header
            onToggleDarkMode={toggleDarkMode}
            isDarkMode={isDarkMode}
            setAuth={setAuth}
          />

          <main className="main-content">
            <div className="container">
              <CreatePost />
              <FeedFilters />

              <div className="posts-feed">
                {posts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    handleDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          </main>

          <Navbar />
        </>
      ) : (
        <AuthPage setAuth={setAuth} />
      )}
    </div>
  );
}

export default App;
