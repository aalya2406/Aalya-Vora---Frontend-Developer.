import React, { useState } from 'react';
import './index.css';
import Navbar from './components/Navbar/Navbar';
import Filters from './components/Navbar/Filters';
import FoodItems from './components/Navbar/Fooditems';
import Footer from './components/Navbar/Footer';

function App() {
  const [selectedArea, setSelectedArea] = useState('Indian');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query); // Update the search query
  };

  return (
    <div className="App">
      <Navbar handleSearch={handleSearch} /> {/* Pass handleSearch to Navbar */}
      <Filters setSelectedArea={setSelectedArea} />
      <FoodItems selectedArea={selectedArea} searchQuery={searchQuery} /> {/* Pass searchQuery to FoodItems */}
      <Footer />
    </div>
  );
}

export default App;
