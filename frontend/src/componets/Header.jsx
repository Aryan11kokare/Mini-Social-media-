import { useState } from "react";
import "./Header.css";

function Header({ onToggleDarkMode, isDarkMode, setAuth }) {
  return (
    <header className="header">
      <div className="header-top">
        <h1 className="header-title">Social</h1>
        <div className="header-actions">
          <button className="icon-btn">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <text
                x="12"
                y="16"
                textAnchor="middle"
                fontSize="10"
                fill="currentColor"
                stroke="none"
              >
                $
              </text>
            </svg>
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              setAuth(false);
            }}
            className="icon-btn wallet-btn"
          >
            <span className="wallet-text">Logout</span>
          </button>
          <button className="icon-btn notification-btn">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="notification-badge">3</span>
          </button>
          <button className="icon-btn avatar-btn">
            <img
              src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=80"
              alt="Profile"
            />
          </button>
        </div>
      </div>
      <div className="search-container">
        <div className="search-bar">
          <svg
            className="search-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search promotions, users, posts..."
            className="search-input"
          />
        </div>
        <button
          className="icon-btn dark-mode-toggle"
          onClick={onToggleDarkMode}
        >
          {isDarkMode ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;
