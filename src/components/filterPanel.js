import { useState } from 'react';

const FilterPanel = ({ filters, setFilters }) => {
  const handleFilterChange = (filter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: !prevFilters[filter],
    }));
  };

  return (
    <div className="p-4 border-l border-gray-200">
      <h2 className="text-lg font-bold mb-4">Filter</h2>
      <div>
        {Object.keys(filters).map((filter) => (
          <div key={filter} className="mb-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters[filter]}
                onChange={() => handleFilterChange(filter)}
                className="form-checkbox"
              />
              <span>{filter}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;