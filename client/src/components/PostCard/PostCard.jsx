"use client";
import React, { useState } from "react";
import "./postcard.css"; // Make sure to have your CSS file

const PostCard = ({ username, image, content, upvotes, downvotes }) => {
  const [currentUpvotes, setCurrentUpvotes] = useState(upvotes);
  const [currentDownvotes, setCurrentDownvotes] = useState(downvotes);

  const handleUpvote = () => {
    setCurrentUpvotes(currentUpvotes + 1);
  };

  const handleDownvote = () => {
    setCurrentDownvotes(currentDownvotes + 1);
  };

  return (
    <div className="post-card">
      <div className="user-info">
        <img src={image} alt={`${username}'s profile`} className="user-image" />
        <span className="username">{username}</span>
      </div>

      {[1, 2, 3].map((item, index) => {
        return (
          <div key={index}>
            <p className="post-content">{content}</p>
            <div className="vote-buttons">
              <button
                className="vote-button upvote-button"
                onClick={handleUpvote}
              >
                ⬆️
              </button>
              <span className="vote-count">{currentUpvotes}</span>
              <button
                className="vote-button downvote-button"
                onClick={handleDownvote}
              >
                ⬇️
              </button>
              <span className="vote-count">{currentDownvotes}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostCard;
