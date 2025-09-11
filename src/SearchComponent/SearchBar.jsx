import React from 'react'

function SearchBar( {searchTerm, onSearchChange} ) {
  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search recipes..."
        style={{ width: '90vw', padding: '10px', fontSize: '16px', borderRadius: '5px'}}
      />
    </div>
  )
}

export default SearchBar
