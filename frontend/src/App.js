// client/src/App.js

import React from "react";
import logo from "./logo.svg";
import axios from 'axios'
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);
  const [URL, setURL] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  const handleGetImage = async () => {
    const data = await axios.get("/signed")
    setURL(data.data.url)
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
        <button onClick={handleGetImage}>Fetch image from aws</button>
        <img src={URL} alt="gif" />
      </header>
    </div>
  );
}

export default App;