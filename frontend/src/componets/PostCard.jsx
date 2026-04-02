import { useEffect, useState } from "react";
import "./PostCard.css";
import { BASE_URL, clientServer } from "../config";
import Comment from "../componets/Comment";

function PostCard({ post, handleDelete }) {
  const [isLiked, setIsLiked] = useState(post.liked);
  const [loading, setLoading] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes?.length);
  const [openComment, setOpenComment] = useState(false);

  const handleLike = async (id) => {
    const responce = await clientServer.put(
      `post/like/${id}`,
      {},
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    );
    console.log(responce.data);
    if (isLiked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setIsLiked(!isLiked);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return (
    <div className="post-card">
      <div className="post-header">
        <img
          src={
            "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg"
          }
          alt={post.userId.username}
          className="post-avatar"
        />
        <div className="post-user-info">
          <div className="post-user-name">{post.userId.username}</div>
          <div className="post-meta">
            <span className="post-handle">@{post.userId.username}</span>
            <span className="post-dot">•</span>
            <span className="post-timestamp">{formatDate(post.createdAt)}</span>
          </div>
        </div>
        <button
          onClick={() => {
            handleDelete(post._id);
          }}
          className="follow-btn"
        >
          Delete
        </button>
      </div>

      <div className="post-content">
        <p className="post-text">{post.text}</p>
        {post.image && (
          <img
            src={`${BASE_URL}/${post.image}`}
            alt="Post content"
            className="post-image"
          />
        )}
      </div>

      <div className="post-stats">
        <span className="stat-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {likesCount}
        </span>
        <span className="stat-item">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          {post?.comments?.length}
        </span>
      </div>

      <div className="post-actions">
        <button
          className={`action-btn ${isLiked ? "liked" : ""}`}
          onClick={() => {
            handleLike(post._id);
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={isLiked ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          Like
        </button>
        <button
          onClick={() => {
            setOpenComment((c) => !c);
          }}
          className="action-btn"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Comment
        </button>
      </div>
      {openComment && (
        <Comment postId={post._id} commentsData={post.comments} />
      )}
    </div>
  );
}

export default PostCard;
