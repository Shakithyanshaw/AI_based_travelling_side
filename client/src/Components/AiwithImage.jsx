import React, { Component } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getBase64 } from '../helpers/imagehealper';

class AiwithImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      imageInlineData: '',
      aiResponse: '',
      loading: false,
    };
    // Initialize Google Generative AI with API key
    this.genAI = new GoogleGenerativeAI('your key');
    // Bind event handlers
    this.handleImageChange = this.handleImageChange.bind(this);
    this.aiImageRun = this.aiImageRun.bind(this);
    this.fileToGenerativePart = this.fileToGenerativePart.bind(this);
  }

  // Function to run Generative AI with image
  async aiImageRun() {
    this.setState({ loading: true, aiResponse: '' });
    // Get Generative AI model
    const model = this.genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
    // Generate content based on image and description
    const result = await model.generateContent([
      'This is a geographical location in srilanka ',
      this.state.imageInlineData,
      'Provide a detailed description of this location in Sri Lanka, focusing on its geographical features and significance. Use bullet points for clarity',
    ]);
    const response = await result.response;
    const text = await response.text();
    // Update state with AI response
    this.setState({ aiResponse: text, loading: false });
  }

  // Function to handle image file change
  handleImageChange(e) {
    const file = e.target.files[0];
    // Convert image file to base64 string and update state
    getBase64(file)
      .then((result) => {
        this.setState({ image: result });
      })
      .catch((error) =>
        console.error('Error converting image to base64:', error)
      );

    // Convert image file to Generative AI input format and update state
    this.fileToGenerativePart(file)
      .then((imageData) => {
        this.setState({ imageInlineData: imageData });
      })
      .catch((error) =>
        console.error('Error converting file to generative part:', error)
      );
  }

  // Function to convert image file to Generative AI input format
  async fileToGenerativePart(file) {
    const base64EncodedData = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    return {
      inlineData: { data: base64EncodedData, mimeType: file.type },
    };
  }

  render() {
    const { image, loading, aiResponse } = this.state;

    return (
      <div>
        <div style={{ display: 'flex' }}>
          {/* Input for selecting image file */}
          <input type="file" onChange={this.handleImageChange} />
          {/* Button to trigger AI processing */}
          <button style={{ marginLeft: '20px' }} onClick={this.aiImageRun}>
            Search
          </button>
        </div>
        {/* Display selected image */}
        <img
          src={image}
          style={{ width: '30%', marginTop: 30 }}
          alt="Selected"
        />

        {/* Display loading indicator or AI response */}
        {loading ? (
          <p style={{ margin: '30px 0' }}>Loading ...</p>
        ) : (
          <div style={{ margin: '30px 0' }}>
            <p>{aiResponse}</p>
          </div>
        )}
      </div>
    );
  }
}

export default AiwithImage;
