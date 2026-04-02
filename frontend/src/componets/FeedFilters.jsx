import { useState } from "react";
import "./FeedFilters.css";

function FeedFilters() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All Post" },
    { id: "foryou", label: "For You" },
    { id: "liked", label: "Most Liked" },
    { id: "commented", label: "Most Commented" },
    { id: "shared", label: "Most Shared" },
  ];

  return (
    <div className="feed-filters">
      <div className="filters-scroll">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`filter-btn ${activeFilter === filter.id ? "active" : ""}`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FeedFilters;
