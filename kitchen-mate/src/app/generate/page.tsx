'use client';
import { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_BASE_URL + '/api/generate', {
        messages: inputText.trim()
      });

      setOutputText(response.data.text);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Chat with GPT-3.5 Turbo</h1>
      <div>
        <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} rows={5} cols={50} />
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {outputText && (
        <div>
          <h2>Response:</h2>
          <p>{outputText}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
