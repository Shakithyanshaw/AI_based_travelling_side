const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // For handling form data
const cors = require('cors'); // For handling cross-origin requests
const axios = require('axios'); // For making HTTP requests
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config(); // For accessing environment variables

const PORT = process.env.PORT || 8000;

// Initialize GoogleGenerativeAI with your API key
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Middleware setup
app.use(bodyParser.json()); // Parse JSON data from requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Endpoint for generating chat responses
app.post('/api/generate', async (req, res) => {
  // Extract request body parameters
  const { history, message } = req.body;

  try {
    // Get the generative model for chat
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    // Start a chat session with the provided history
    const chat = model.startChat({ history });
    // Send a message and wait for the response
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();
    // Send the generated text as JSON response
    res.json({ text });
  } catch (error) {
    // Handle errors
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while generating the response.' });
  }
});

// Endpoint for generating travel itineraries
app.post('/generate-itinerary', async (req, res) => {
  // Extract request body parameters
  const { city, days, preferences } = req.body;

  try {
    // Construct the prompt for generating itinerary
    let prompt = `You are a travel expert. Give me an itinerary for ${city}, for ${days} days. I like to: ${preferences.join(
      ', '
    )}. Limit the length of output JSON string to 1200 characters.`;

    // Send a request to OpenAI for generating the itinerary
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci/completions',
      {
        model: 'davinci',
        prompt: prompt,
        temperature: 0,
        max_tokens: 300,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          // Add your OpenAI API key here
          Authorization: 'Bearer YOUR_OPENAI_API_KEY',
        },
      }
    );

    // Extract the generated itinerary from the response and send it as JSON
    const itinerary = response.data.choices[0].text;
    res.json(itinerary);
  } catch (error) {
    // Handle errors
    console.error('Error generating itinerary:', error);
    res.status(500).json({ error: 'Failed to generate itinerary' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
