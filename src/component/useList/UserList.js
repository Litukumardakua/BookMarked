import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchGitHubUsers,
  toggleBookmark,
  goToPreviousPage,
} from "../action/Actions";
import _ from "lodash";

function UserList({
  isAtStart,
  goToPreviousPage,
  users,
  loading,
  error,
  fetchGitHubUsers,
  toggleBookmark,
}) {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const itemsPerPage = 10;

  const throttledSearch = _.throttle((query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filteredUsers = users.filter((user) =>
      user.login.toLowerCase().includes(lowerCaseQuery)
    );
    setSearchResults(filteredUsers);
  }, 300);

  const handleLoadPrevious = () => {
    if (page > 1) {
      setPage(page - 1);
      goToPreviousPage()
    }
  };

  useEffect(() => {
    fetchGitHubUsers(page);
  }, [fetchGitHubUsers, page]);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedUsers = searchQuery
    ? searchResults
    : users.slice(startIndex, endIndex);

  const handleLoadMore = () => {
    if (endIndex < (searchQuery ? searchResults.length : users.length)) {
      setPage(page + 1);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    throttledSearch(query);
  };

  const handleBookmark = (userId) => {
    toggleBookmark(userId);
  };

  if (loading && users.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="User_heading">Users</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <div className="user_container">
        <ul>
          {displayedUsers.length === 0 ? (
            <p className="no_daya_available">No data available.</p>
          ) : (
            displayedUsers.map((user) => (
              <div key={`user-${user.id}`} className="list-item">
                <li>{user.login}</li>
                <li>{user.avatar_url}</li>
                <button onClick={() => handleBookmark(user.id)}>
                  {user.bookmarked ? "Unbookmark" : "Bookmark"}
                </button>
              </div>
            ))
          )}
        </ul>
        <div className="load-button-container">
          {!isAtStart && (
            <button
              onClick={handleLoadPrevious}
              disabled={loading}
              className="prev-button"
            >
              Previous
            </button>
          )}
          {endIndex < (searchQuery ? searchResults.length : users.length) && (
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="load-button"
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  users: state.users.users,
  loading: state.users.loading,
  isAtStart: state.users.isAtStart,
  error: state.users.error,
});

const mapDispatchToProps = {
   fetchGitHubUsers,
  toggleBookmark,
  goToPreviousPage
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
