import React from 'react';
import './SearchPanel.css'

const SearchPanel = ({state,onSearchChange}) => {
    return (
        <input 
            value={state}
            className="form-control search-input"
            type='text' 
            placeholder='search' 
            name='search'
            onChange={onSearchChange}
        />
    )
}

export default SearchPanel;