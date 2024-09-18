import { useState } from 'react';
import axios from 'axios';

const Chat = () => {
  // State variables for error message, chat history, and user input
  const [error, setError] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [value, setValue] = useState('');

  // Function to fetch response from server
  const getResponse = async () => {
    if (!value) {
      setError('Please enter a prompt');
      return;
    }
    try {
      // Construct prompt for AI based on user input
      const prompt = `Generate a concise summary of ${value},`;
      // Send request to server to generate response
      const response = await axios.post('http://localhost:8000/api/generate', {
        history: chatHistory,
        message: prompt,
      });

      // Extract response data from server response
      const data = response.data.text;
      // Update chat history with user input and AI response
      setChatHistory((oldChatHistory) => [
        ...oldChatHistory,
        {
          role: 'user',
          parts: value,
        },
        {
          role: 'model',
          parts: data,
        },
      ]);
      // Clear user input
      setValue('');
    } catch (error) {
      // Log error if fetching response fails
      console.log(error);
      setError('Something went wrong, Please try again');
    }
  };

  return (
    <div className="bg-zinc-600  pt-3 overflow-hidden">
      <div className="">
        <div className="overflow-y-clip">
          {/* Render chat history */}
          {chatHistory.map((chatItem, index) => (
            <div key={index}>
              <p
                className={`py-2 border rounded my-2 px-5 ${
                  // Apply different styles for user and AI responses
                  chatItem.role === 'user'
                    ? 'text-blue-500 bg-blue-100'
                    : 'text-gray-900 bg-gray-200'
                }`}
              >
                {/* Display role and message parts */}
                <span className="font-bold">{chatItem.role}</span>:{' '}
                {chatItem.parts}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto ">
          <div className="flex items-center py-3 px-3 bg-slate-900 rounded-lg my-4">
            {/* Input field for user prompt */}
            <input
              className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-100 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter a prompt here"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            ></input>

            {/* Button to submit user prompt */}
            <button
              className="inline-flex justify-center p-2 text-blue-500 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
              title="Submit message"
              onClick={getResponse}
            >
              <svg
                className="w-6 h-6 rotate-90"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
