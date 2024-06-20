import axios from 'axios';

const API_URL = 'https://www.themealdb.com/api/json/v1/1';

export const fetchMealsByArea = async (area) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  const data = await response.json();
  return data.meals;
};

export const fetchMealDetails = async (id) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data.meals[0];
};

export const fetchAllAreas = async () => {
  try {
    const response = await axios.get(`${API_URL}/list.php?a=list`);
    return response.data.meals;
  } catch (error) {
    console.error('Error fetching areas:', error);
    throw error;
  }
};
