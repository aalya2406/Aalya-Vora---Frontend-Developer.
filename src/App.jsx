import React, { useState } from 'react';
import './index.css';
import Navbar from './components/Navbar/Navbar';
import Filters from './components/Navbar/Filters'; // Import the Filters component
import FoodItems from './components/Navbar/Fooditems'; // Corrected import
import Footer from './components/Navbar/Footer'; // Corrected import


function App() {
  const [selectedArea, setSelectedArea] = useState('Indian'); // Default to Indian

  return (
    <div className="App">
      <Navbar />
      <Filters setSelectedArea={setSelectedArea} /> {/* Pass setSelectedArea to Filters */}
      <FoodItems selectedArea={selectedArea} /> {/* Pass selectedArea to FoodItems */}
      <Footer />
    </div>
  );
}

export default App;

