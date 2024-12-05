import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <input
            type="text"
            placeholder="Search or start new chat"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
        />
    );
};

export default SearchBar;
