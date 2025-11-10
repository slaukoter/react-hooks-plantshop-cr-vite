import React, { useState, useEffect } from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch plants on mount
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then((data) => setPlants(data))
      .catch((err) => console.error("Error fetching plants:", err));
  }, []);

  // Add a new plant
  function handleAddPlant(newPlant) {
    setPlants((plants) => [...plants, newPlant]);
  }

  // Toggle "sold out"
  function handleToggleSoldOut(id) {
    setPlants((plants) =>
      plants.map((p) => (p.id === id ? { ...p, soldOut: !p.soldOut } : p))
    );
  }

  // Filter by search term
  const filteredPlants = plants.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <Header />
      <PlantPage
        plants={filteredPlants}
        onAddPlant={handleAddPlant}
        onToggleSoldOut={handleToggleSoldOut}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
    </div>
  );
}

export default App;
