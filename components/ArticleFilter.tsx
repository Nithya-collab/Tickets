"use client"
import React from 'react';

const ArticleFilter = ({ categories, onFilterChange }: { categories: string[], onFilterChange: (category: string) => void }) => {
  return (
    <div className="filter">
      <select onChange={(e) => onFilterChange(e.target.value)} className="p-2 border">
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ArticleFilter;
