import React, { useState } from "react";
import "./comment.css";
import { clientServer } from "../config";

const CommentSection = ({ commentsData = [], currentUser = "You", postId }) => {
  const [comments, setComments] = useState(commentsData);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const responce = await clientServer.post(
      `/post/comment/${postId}`,
      {
        comment: newComment,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    );

    const comment = {
      id: Date.now(),
      user: currentUser,
      text: newComment,
      createdAt: new Date().toLocaleString(),
    };

    setComments([comment, ...comments]);
    setNewComment("");
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
    <div className="comment-section">
      <h4 className="comment-title">Comments ({comments.length})</h4>

      {/* Input */}
      <div className="comment-input-box">
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="comment-input"
        />
        <button onClick={handleAddComment} className="comment-btn">
          Post
        </button>
      </div>

      {/* Comment List */}
      <div className="comment-list">
        {comments.length === 0 && (
          <p className="no-comments">No comments yet</p>
        )}

        {comments.map((c, index) => (
          <div key={index} className="comment-item">
            <div className="comment-avatar">
              {c.user?.username?.charAt(0).toUpperCase()}
            </div>

            <div className="comment-content">
              <div className="comment-header">
                <span className="comment-user">{c?.user?.username}</span>
                <span className="comment-time">{formatDate(c.createdAt)}</span>
              </div>

              <p className="comment-text">{c.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
