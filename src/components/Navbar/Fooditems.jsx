import React, { useEffect, useState } from 'react';
import './Fooditems.css'; // Correct the file name here
import { fetchMealsByArea, fetchMealDetails  } from '../../services/api';
import './Navbar.css';
// src/components/FoodItems/FoodItems.jsx


const FoodItems = ({ selectedArea }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const meals = await fetchMealsByArea(selectedArea);
        setFoodItems(meals);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };

    fetchFoodItems();
  }, [selectedArea]);

  const handleFoodItemClick = async (id) => {
    try {
      const meal = await fetchMealDetails(id);
      setSelectedFoodItem(meal);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching meal details:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFoodItem(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedFoodItems = foodItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="food-items-container">
      <div className="food-items">
        {paginatedFoodItems.map((item) => (
          <div className="food-item" key={item.idMeal} onClick={() => handleFoodItemClick(item.idMeal)}>
            <img src={item.strMealThumb} alt={item.strMeal} />
            <h3>{item.strMeal}</h3>
            <p>Rating: {Math.floor(Math.random() * 5) + 1}/5</p>
          </div>
        ))}
      </div>

      {showModal && selectedFoodItem && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>{selectedFoodItem.strMeal}</h2>
            <img src={selectedFoodItem.strMealThumb} alt={selectedFoodItem.strMeal} />
            <p><strong>Category:</strong> {selectedFoodItem.strCategory}</p>
            <p><strong>Area:</strong> {selectedFoodItem.strArea}</p>
            <p><strong>Instructions:</strong> {selectedFoodItem.strInstructions}</p>
          </div>
        </div>
      )}

      <div className="pagination">
        {Array.from({ length: Math.ceil(foodItems.length / itemsPerPage) }, (_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)} className={index + 1 === currentPage ? 'active' : ''}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FoodItems;
