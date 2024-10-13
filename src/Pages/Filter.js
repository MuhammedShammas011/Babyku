import React, { useState } from 'react';
import './pageStyle/Filter.css';

const Filter = ({ isOpen, toggleFilterSidebar, applyFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleApplyFilter = () => {
    applyFilter(selectedCategory); 
  };

  return (
    <div className={`filter-sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleFilterSidebar}>
        ✖
      </button>
  
      <h3>Filter Options</h3>
      <div>
        <label>Category</label>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All</option>
          <option value="Clothing">Clothing</option>
          <option value="Toys">Toys</option>
          <option value="Protein">Protein</option>
        </select>
        <button className='filter-btn' onClick={handleApplyFilter}>
          Done
        </button>
      </div>
    </div>
  );
};

export default Filter;
