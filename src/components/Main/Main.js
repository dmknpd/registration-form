import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CustomContext } from "../services/context";
import axios from "axios";
import Menu from "../Menu/Menu";

const Main = () => {
  const { user, setUser, posts, setPosts } = useContext(CustomContext);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);

      // Fetch posts for the logged user
      axios
        .get(`http://localhost:3001/posts?userId=${storedUser.id}`, {
          headers: {
            Authorization: `Bearer ${storedUser.token}`,
          },
        })
        .then((response) => setPosts(response.data))
        .catch((error) => console.log(error.message));
    }
  }, []);

  const logOut = () => {
    setUser(null);
    setPosts([]);
    localStorage.removeItem("user");
  };

  const handlePostSubmit = () => {
    if (newPost.trim() === "") {
      setNewPost("");
      return;
    }

    const post = {
      userId: user.id,
      content: newPost,
    };

    axios
      .post("http://localhost:3001/posts", post, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setPosts([...posts, response.data]);
        setNewPost("");
      })
      .catch((error) => console.log(error.message));
  };

  const handlePostDelete = (postId) => {
    axios
      .delete(`http://localhost:3001/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setPosts(posts.filter((post) => post.id !== postId));
        }
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="bg-gray-700 w-screen h-screen flex flex-col gap-10 items-center justify-center">
      <Menu />

      {user ? (
        <>
          <p className="text-3xl font-bold text-white">Hello ${user.email}</p>
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded"
            onClick={logOut}
          >
            Logout
          </button>
          <div className="bg-stone-200 w-96 h-auto py-10 px-1 rounded flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-2">Your Posts</h2>
            <div className="w-full flex flex-col items-center gap-4">
              <input
                type="text"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="rounded h-8 px-2 w-4/5"
                placeholder="Write your post"
              />
              <button
                onClick={handlePostSubmit}
                className="bg-white mt-3 px-5 py-1 rounded hover:bg-gray-300"
              >
                Add Post
              </button>
              <ul className="w-full flex flex-col items-center gap-2 mt-5">
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="bg-gray-300 w-4/5 p-2 rounded flex flex-row justify-between"
                  >
                    {post.content}
                    <button
                      onClick={() => handlePostDelete(post.id)}
                      className="bg-red-400 px-2 rounded hover:bg-red-200"
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="text-3xl font-bold text-white">Please login</p>
          <Link
            className="bg-gray-500 text-white py-2 px-4 rounded"
            to="/login"
          >
            Login
          </Link>
        </>
      )}
    </div>
  );
};

export default Main;
