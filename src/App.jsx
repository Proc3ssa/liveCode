import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const filename = 'text.txt';
  const user = 'Faisal';
  const [content, setContent] = useState("");
  const [contentCache, setContentCache] = useState(null);
  const [loading, setLoading] = useState("Loading...");

  useEffect(() => {
    const get = async () => {
      try {
        const response = await fetch(`http://localhost:666/?filename=${filename}&user=${user}`);
        const data = await response.json();

        if (data.ok) {
          if (data.content !== contentCache) { 
            setContentCache(data.content);
            setContent(data.content);  // Update content only if it's different
          }
        } else {
          setLoading("Error reading file");
        }
      } catch (error) {
        setLoading("Error fetching data");
      }
    };

    const interval = setInterval(get, 1000);
    return () => clearInterval(interval);
  }, [contentCache]); // Add contentCache as dependency to re-run when it changes

  const write = async (e) => {
    e.preventDefault();
    const newContent = e.target.value;
    setContent(newContent);

    const data = {
      filename: filename,
      content: newContent,
      user: user
    };

    try {
      const wrt = await fetch('http://localhost:666', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const response = await wrt.json();
      if (!response.ok) {
        console.error("Unable to write");
      }
    } catch (error) {
      console.error("Request failed", error);
    }
  };

  return (
    <div>
      <h1>Live Editor 1.1</h1>
      {content === "" && <p>{loading}</p>}
      <textarea value={content} onChange={write}></textarea>
    </div>
  );
};

export default App;
