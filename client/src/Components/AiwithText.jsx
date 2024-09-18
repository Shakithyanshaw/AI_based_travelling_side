import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const AiwithText = () => {
  // Initialize Generative AI with API key
  const genAI = new GoogleGenerativeAI('your key');

  // State variables for user input, AI response, and loading state
  const [search, setSearch] = useState('');
  const [aiResponse, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to trigger Generative AI process
  async function aiRun() {
    setLoading(true);
    setResponse('');
    try {
      // Get Generative AI model
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      // Construct prompt for AI based on user input
      const prompt = `List the top-rated places in Sri Lanka associated with the following tags ${search}. Ensure that the response includes multiple places and strictly follows this format: city: location:, arranged in ascending order`;
      // Generate content using the AI model
      const result = await model.generateContent(prompt);
      const response = await result.response;
      // Remove asterisks from the AI response
      const text = response.text().replace(/\*/g, '');

      // Split the response into individual place entries
      const places = text.split('- ').filter((place) => place.trim() !== '');

      // Format the response with line breaks between each place entry
      const formattedResponse = places.map((place) => (
        <React.Fragment key={place}>
          {place.trim()}
          <br />
        </React.Fragment>
      ));
      setResponse(formattedResponse);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setResponse('An error occurred while fetching the response.');
    } finally {
      setLoading(false);
    }
  }

  // Event handler for handling changes in the search input
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  // Event handler for handling click on the search button
  const handleClick = () => {
    aiRun();
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        {/* Input for entering search query */}
        <input
          placeholder="Enter your traveling desire"
          onChange={(e) => handleChangeSearch(e)}
        />
        {/* Button to trigger AI processing */}
        <button style={{ marginLeft: '20px' }} onClick={handleClick}>
          Search
        </button>
      </div>

      {/* Display loading indicator or AI response */}
      {loading ? (
        <p style={{ margin: '30px 0' }}>Loading ...</p>
      ) : (
        <div style={{ margin: '30px 0' }}>{aiResponse}</div>
      )}
    </div>
  );
};

export default AiwithText;
