import React from 'react';
import { FaUmbrellaBeach, FaMountain, FaHome, FaCampground, FaWater, FaSnowflake, FaCrown, FaTree } from 'react-icons/fa';
import './CategoryBar.css';

const categories = [
  { id: 'beach', name: 'Beach', icon: <FaUmbrellaBeach /> },
  { id: 'amazing-views', name: 'Amazing views', icon: <FaMountain /> },
  { id: 'cabins', name: 'Cabins', icon: <FaHome /> },
  { id: 'camping', name: 'Camping', icon: <FaCampground /> },
  { id: 'lakefront', name: 'Lakefront', icon: <FaWater /> },
  { id: 'skiing', name: 'Skiing', icon: <FaSnowflake /> },
  { id: 'castles', name: 'Castles', icon: <FaCrown /> },
  { id: 'treehouses', name: 'Treehouses', icon: <FaTree /> }
];

const CategoryBar = ({ onSelectCategory, selectedCategory }) => {
  return (
    <div className="category-bar">
      <div className="category-container">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onSelectCategory(selectedCategory === category.id ? null : category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
