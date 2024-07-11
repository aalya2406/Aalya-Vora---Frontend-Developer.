import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import  './Fooditems.jsx'; // Adjust the path as necessary
import { fetchMealsByArea, fetchMealDetails } from '../../services/api'; // Mock API calls

// Mock API responses
jest.mock('../../services/api', () => ({
  fetchMealsByArea: jest.fn(),
  fetchMealDetails: jest.fn(),
}));

describe('FoodItems Component', () => {
  beforeEach(() => {
    fetchMealsByArea.mockClear();
    fetchMealDetails.mockClear();
  });

  it('renders food items correctly', async () => {
    const mockFoodItems = [
      { idMeal: '1', strMeal: 'Test Meal 1', strMealThumb: 'test-image-1.jpg' },
      { idMeal: '2', strMeal: 'Test Meal 2', strMealThumb: 'test-image-2.jpg' },
    ];
    fetchMealsByArea.mockResolvedValue(mockFoodItems);

    render(<FoodItems selectedArea="Indian" />);

    // Ensure loading state is displayed initially
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for API call to resolve and items to render
    await waitFor(() => {
      expect(screen.getByAltText('Test Meal 1')).toBeInTheDocument();
      expect(screen.getByAltText('Test Meal 2')).toBeInTheDocument();
    });

    // Check if images and meal names are displayed correctly
    expect(screen.getByText('Test Meal 1')).toBeInTheDocument();
    expect(screen.getByText('Test Meal 2')).toBeInTheDocument();
  });

  it('displays modal on item click', async () => {
    const mockFoodItem = { idMeal: '1', strMeal: 'Test Meal', strMealThumb: 'test-image.jpg' };
    fetchMealsByArea.mockResolvedValue([mockFoodItem]);
    fetchMealDetails.mockResolvedValue(mockFoodItem);

    render(<FoodItems selectedArea="Indian" />);

    // Waiting for items to render
    await waitFor(() => {
      expect(screen.getByAltText('Test Meal')).toBeInTheDocument();
    });

    // Click on a food item to open modal
    userEvent.click(screen.getByAltText('Test Meal'));

    // Ensure modal content is displayed
    expect(screen.getByText('Test Meal')).toBeInTheDocument();
    expect(screen.getByText('Category: undefined')).toBeInTheDocument(); // Adjust as per API response
    expect(screen.getByText('Area: undefined')).toBeInTheDocument(); // Adjust as per API response
    expect(screen.getByText('Instructions: undefined')).toBeInTheDocument(); // Adjust as per API response
  });



// Testing pagination
const mockFoodItems = [
  { idMeal: 1, strMeal: 'Meal 1' },
  { idMeal: 2, strMeal: 'Meal 2' },
  // Add more mock items as needed
];

jest.mock('../../services/api', () => ({
  fetchMealsByArea: jest.fn().mockResolvedValue(mockFoodItems),
  fetchMealDetails: jest.fn().mockResolvedValue({}), // Mock fetchMealDetails if needed
}));

describe('FoodItems component', () => {
  it('should render paginated items correctly', async () => {
    render(<FoodItems selectedArea="Indian" />);

    // Wait for data to be fetched and component to render
    await waitFor(() => {
      expect(screen.getByText('Meal 1')).toBeInTheDocument(); // Check if first item is rendered
    });

    // Simulate clicking on the next page button (assuming there are pagination buttons)
    fireEvent.click(screen.getByText('2'));

    // Assert that the next page of items is rendered
    await waitFor(() => {
      expect(screen.getByText('Meal 2')).toBeInTheDocument(); // Check if second item is rendered after pagination
    });
    
  });

});


});