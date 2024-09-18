import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  // State variables for city, number of days, user preferences, and generated itinerary
  const [city, setCity] = useState('');
  const [days, setDays] = useState(1);
  const [preferences, setPreferences] = useState([]);
  const [itinerary, setItinerary] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the server to generate itinerary based on user input
      const response = await axios.post(
        'http://localhost:8000/generate-itinerary',
        { city, days, preferences }
      );
      // Update state with the generated itinerary
      setItinerary(response.data);
    } catch (error) {
      console.error('Error generating itinerary:', error);
    }
  };

  // Function to handle changes in checkbox for user preferences
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      // Add selected preference to the preferences array
      setPreferences((prevPreferences) => [...prevPreferences, value]);
    } else {
      // Remove deselected preference from the preferences array
      setPreferences((prevPreferences) =>
        prevPreferences.filter((pref) => pref !== value)
      );
    }
  };

  return (
    <div
      style={{
        padding: '20px',
        margin: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '2rem',
      }}
    >
      <form onSubmit={handleSubmit}>
        {/* Input fields for city and number of days */}
        <label>
          City:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </label>
        <label style={{ marginLeft: '10px' }}>
          Days:
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value))}
            style={{ marginLeft: '10px' }}
          />
        </label>
        {/* Checkboxes for user preferences */}
        <div
          style={{ marginTop: '20px', marginLeft: '10px', fontSize: '1.2rem' }}
        >
          <label style={{ fontSize: '1.5rem' }}>
            <input
              type="checkbox"
              value="Beach"
              onChange={handleCheckboxChange}
              style={{ marginRight: '5px', transform: 'scale(1.5)' }}
            />
            Beach
          </label>
          <label style={{ marginLeft: '10px', fontSize: '1.2rem' }}>
            <input
              type="checkbox"
              value="Mountains"
              onChange={handleCheckboxChange}
              style={{ marginRight: '5px', transform: 'scale(1.5)' }}
            />
            Mountains
          </label>
        </div>
        {/* Button to submit form */}
        <button
          type="submit"
          style={{
            marginTop: '10px',
            marginLeft: '10px',
            padding: '5px 10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1.2rem',
          }}
        >
          Generate Itinerary
        </button>
      </form>
      {/* Display generated itinerary */}
      {itinerary && (
        <div style={{ marginTop: '20px' }}>
          <h2>Generated Itinerary:</h2>
          <pre>{itinerary}</pre>
        </div>
      )}
    </div>
  );
};

export default Form;
