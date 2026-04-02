import { useState } from "react";
import { clientServer } from "../config/index.jsx";
import "./CreatePost.css";

function CreatePost() {
  const [postContent, setPostContent] = useState("");
  const [media, setMedia] = useState("");
  const [file, setFile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitPost = async () => {
    setIsLoading(true);
    try {
      if (!file) {
        const responce = await clientServer.post(
          "/post",
          {
            text: postContent,
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          },
        );
      } else {
        const formData = new FormData();
        formData.append("media", media);
        formData.append("text", postContent);
        const responce = await clientServer.post("/post", formData, {
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
    setPostContent("");
    setMedia("");
    setFile(false);
    setIsLoading(false);
  };

  return (
    <div className="create-post-card">
      <div className="create-post-content">
        <textarea
          className="post-textarea"
          placeholder="What's on your mind?"
          value={postContent}
          required
          onChange={(e) => setPostContent(e.target.value)}
          rows="3"
        />
        {file && <p>Photo selected </p>}

        <input
          id="fileImage"
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            setMedia(e.target.files[0]);
            setFile(true);
          }}
        />

        <div className="post-actions">
          <div className="post-action-icons">
            <button
              onClick={() => document.getElementById("fileImage").click()}
              className="action-icon-btn"
              title="Add photo"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </button>
            <button className="action-icon-btn" title="Add emoji">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </button>
            <button className="action-icon-btn" title="More options">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </button>
          </div>
          <button
            onClick={handleSubmitPost}
            className={`post-btn ${!postContent ? "disabled" : ""}`}
            disabled={isLoading}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
