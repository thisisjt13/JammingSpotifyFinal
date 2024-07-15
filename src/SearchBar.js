import React, { useState } from 'react';

export default function SearchBar(props) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleKeyDown = (event) => {
        // Check if the key pressed is 'Enter'
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = () => {
        props.onSearch(searchTerm);
    };

    return (
        <div className="searchBar">
            <input
                type="search"
                id="searchField"
                name="search"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown} // Use onKeyDown instead of onKeyPress
            />
            <div className="buttonContainer">
                <button type="button" onClick={handleSearch}>
                    Search
                </button>
            </div>
        </div>
    );
}