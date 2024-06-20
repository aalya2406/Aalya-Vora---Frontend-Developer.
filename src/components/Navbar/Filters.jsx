import React, { useState, useEffect } from 'react';
import './Filters.css';
import { fetchAllAreas } from '../../services/api';

const Filters = ({ setSelectedArea }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [areas, setAreas] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const filters = ['Filter By Area', 'Under Rs.300', 'Desserts', 'Starters'];

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
          onClick={() => toggleDropdown(filter)}
        >
          <span>{filter}</span>
          <span className={`arrow ${selectedFilter === filter && showDropdown ? 'up' : 'down'}`}>&#9660;</span>
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
