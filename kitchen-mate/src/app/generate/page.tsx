'use client';
import axios from 'axios';
import { useState } from 'react';

const GenerateTextComponent = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  const handleGenerateText = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/generate', { prompt });
      setGeneratedText(response.data.text);
    } catch (error) {
      console.error('Error generating text:', error);
      setGeneratedText('Error generating text. Please try again.');
    }
  };

  return (
    <div>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt"
      />
      <button onClick={handleGenerateText}>Generate Text</button>
      <p>Generated Text: {generatedText}</p>
    </div>
  );
};

export default GenerateTextComponent;
