import React, { useState, useEffect } from 'react';
import './Filters.css';
import { fetchAllAreas } from '../../services/api';

const Filters = ({ setSelectedArea, handleSort, handlePureVeg }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [areas, setAreas] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const filters = ['Filter By Area', 'Under Rs.300', 'Desserts', 'Starters', 'Sort Alphabetically', 'Pure Veg'];

  const toggleDropdown = (filter) => {
    if (selectedFilter === filter) {
      setShowDropdown(!showDropdown);
    } else {
      setSelectedFilter(filter);
      setShowDropdown(true);
    }
  };

  const handleAreaSelect = (area) => {
    setSelectedArea(area);
    setShowDropdown(false);
  };

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const areas = await fetchAllAreas();
        setAreas(areas);
      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    };

    fetchAreas();
  }, []);

  return (
    <div className="filters">
      {filters.map((filter) => (
        <div
          key={filter}
          className={`filter-tag ${selectedFilter === filter ? 'highlighted' : ''}`}
          onClick={() => {
            if (filter === 'Sort Alphabetically') {
              handleSort(); // Call the handleSort function passed as prop
              setSelectedFilter(filter); // Highlight the 'Sort Alphabetically' filter
            } else if (filter === 'Pure Veg') {
              handlePureVeg(); // Call the handlePureVeg function passed as prop
              setSelectedFilter(filter); // Highlight the 'Pure Veg' filter
            } else {
              toggleDropdown(filter);
            }
          }}
        >
          <span>{filter}</span>
          {filter === 'Filter By Area' && <span className={`arrow ${selectedFilter === filter && showDropdown ? 'up' : 'down'}`}>&#9660;</span>}
        </div>
      ))}
      {showDropdown && selectedFilter === 'Filter By Area' && (
        <div className="dropdown">
          <ul className="area-filters">
            {areas.map((area) => (
              <li key={area.strArea} onClick={() => handleAreaSelect(area.strArea)}>
                <input
                  type="radio"
                  id={area.strArea}
                  name="area"
                  value={area.strArea}
                />
                <label htmlFor={area.strArea}>{area.strArea}</label>
              </li>
            ))}
            <button onClick={() => setShowDropdown(false)}>Apply</button>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Filters;
