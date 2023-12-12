import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toggleBookmark } from "../action/Actions";

function BookmarkedUsers({ bookmarkedUsers, toggleBookmark }) {
   const [searchQuery, setSearchQuery] = useState("");
   const [searchResults, setSearchResults] = useState([]);

   const handleSearch = (query) => {
      setSearchQuery(query);
      const lowerCaseQuery = query.toLowerCase();
      const filteredUsers = bookmarkedUsers.filter((user) =>
         user.login.toLowerCase().includes(lowerCaseQuery)
      );
      setSearchResults(filteredUsers);
   };

   useEffect(() => {
      console.log("book mark+++", bookmarkedUsers);
   }, [bookmarkedUsers]);

   return (
      <div>
         <h2 className="Bookmark_heading">Bookmarked Users</h2>
         <div className="search-container">
            <input
               type="text"
               placeholder="Search bookmarked users..."
               value={searchQuery}
               onChange={(e) => handleSearch(e.target.value)}
               className="search-input"
            />
         </div>
         <div className="Bookmark_Search">
            <ul>
               {(searchQuery ? searchResults : bookmarkedUsers).map((user) => (
                  <div
                     key={`bookmarked-${user.id}-${
                        user.bookmarked ? "bookmarked" : "unbookmarked"
                     }`}
                     className="list-item"
                  >
                     <li>{user.login}</li>
                     <button onClick={() => toggleBookmark(user.id)}>
                        Unbookmark
                     </button>
                  </div>
               ))}
            </ul>
         </div>
      </div>
   );
}

const mapStateToProps = (state) => ({
   bookmarkedUsers: state.users.users.filter((user) => user.bookmarked)
});

const mapDispatchToProps = {
   toggleBookmark
};

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkedUsers);
