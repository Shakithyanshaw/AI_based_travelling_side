import React, { useState } from 'react';
import AiwithText from './AiwithText';
import AiwithImage from './AiwithImage';

const ImageSearch = () => {
  // State variable to track which AI component to display
  const [aiWith, setAiWith] = useState('text');

  // Function to handle switching between AI components
  const handleAiWith = (value) => {
    setAiWith(value);
  };

  return (
    <div className="image-search-container">
      <div className="content">
        <h1>Search the place you want to know</h1>

        {/* Button container to switch between AI components */}
        <div className="button-container">
          <button
            onClick={() => handleAiWith('image')}
            className={`ai-button ${aiWith === 'image' ? 'active' : ''}`}
          >
            AI with Image
          </button>
        </div>

        {/* Render the selected AI component */}
        <div className="ai-component">
          {aiWith === 'text' ? <AiwithText /> : <AiwithImage />}
        </div>
      </div>

      {/* Inline styling for the component */}
      <style jsx>{`
        /* Styles for the main container */
        .image-search-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh; /* Fill the entire viewport height */
          background-color: #111; /* Dark background color */
          color: #fff; /* Light text color */
        }

        /* Styles for the content */
        .content {
          max-width: 800px; /* Adjusted max-width */
          padding: 20px;
          background-color: #333; /* Dark content background color */
          border-radius: 10px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); /* Darker shadow */
          text-align: center;
        }

        /* Styles for headings */
        h1 {
          font-size: 24px;
          margin-bottom: 10px;
          color: #fff; /* Light text color */
        }

        /* Styles for paragraphs */
        p {
          font-size: 16px;
          color: #ccc; /* Lighter text color */
          margin-bottom: 20px;
        }

        /* Styles for the button container */
        .button-container {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }

        /* Styles for AI buttons */
        .ai-button {
          padding: 10px 20px;
          background-color: #007bff; /* Blue button */
          color: #fff; /* Light text color */
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        /* Styles for active AI button */
        .ai-button.active {
          background-color: #0056b3; /* Darker blue button when active */
        }

        /* Styles for spacing between buttons */
        .ai-button + .ai-button {
          margin-left: 20px;
        }

        /* Styles for AI component */
        .ai-component {
          margin-top: 20px;
        }

        /* Adjusted input styles */
        input {
          width: 100%; /* Take up full width */
          padding: 12px; /* Increased padding */
          font-size: 16px; /* Increased font size */
          color: #000; /* Set text color to black */
          background-color: #fff; /* White background */
          border: 1px solid #ccc; /* Light border color */
          border-radius: 5px; /* Rounded corners */
          transition: border-color 0.3s; /* Smooth border transition */
        }

        /* Styles for input focus */
        input:focus {
          outline: none; /* Remove focus outline */
          border-color: #007bff; /* Blue border color on focus */
        }

        /* Styles for the search button */
        .search-button {
          background-color: #007bff; /* Blue button */
          color: #fff; /* Light text color */
          border: none;
          border-radius: 5px;
          padding: 10px 20px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        /* Styles for search button hover */
        .search-button:hover {
          background-color: #0056b3; /* Darker blue button on hover */
        }
      `}</style>
    </div>
  );
};

export default ImageSearch;
