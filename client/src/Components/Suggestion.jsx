import React, { useState } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Places from './Places';

// Suggestion component
const Suggestion = ({ pls, childClicked }) => {
  // State for filtering by type
  const [type, setType] = useState('All');
  // State for filtering by ratings
  const [ratings, setRatings] = useState('');

  // Check if pls (places) data is available
  if (!pls) return null; // Add a check to render nothing if pls is undefined

  // Function to filter places based on type and ratings
  const filterPlaces = (place) => {
    // If type is 'All' and ratings are empty, return true for all places
    if (type === 'All' && !ratings) return true;
    // Check if the place matches the selected type
    const typeMatch = type === 'All' || place.type === type;
    // Check if the place rating is greater than or equal to the selected ratings
    const ratingMatch = !ratings || place.rating >= parseFloat(ratings);
    // Return true if both type and rating matches
    return typeMatch && ratingMatch;
  };

  // Filter places based on type and ratings
  const filteredPlaces = pls.filter(filterPlaces);

  return (
    <div>
      {/* Dropdowns for selecting type and ratings */}
      <div className="flex gap-x-6 pl-4">
        <div>
          {/* Dropdown for selecting ratings */}
          <NavDropdown
            id="nav-dropdown"
            title="Ratings"
            default={ratings}
            onSelect={(selectedRatings) => setRatings(selectedRatings)}
          >
            <NavDropdown.Item value="">All</NavDropdown.Item>
            <NavDropdown.Item value={3.0}>Above 3.0</NavDropdown.Item>
            <NavDropdown.Item value={4.0}>Above 4.0</NavDropdown.Item>
            <NavDropdown.Item value={4.5}>Above 4.5</NavDropdown.Item>
          </NavDropdown>
        </div>
      </div>
      {/* Render message if no places found */}
      {filteredPlaces.length === 0 && (
        <div className="text-white mt-4 ml-4">No places found</div>
      )}
      {/* Display filtered places */}
      <div className="flex flex-col mt-4 h-96 overflow-scroll">
        {filteredPlaces.map((place, i) => (
          <div key={i} className="">
            <Places place={place} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestion;
