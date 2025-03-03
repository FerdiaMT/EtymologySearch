import React, { useState, useRef } from "react";
import TextInput from "./components/TextInput";
import SubmitButton from "./components/SubmitButton";
import Legend from "./components/Legend";
import fetchOrigin from "./utils/fetchOrigin";
import colorMap from "./utils/colorMap";

import "./index.css";
import Toolbar from "./components/Toolbar";

function App() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const textRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      alert("please enter some text.");
      return;
    }

    setIsLoading(true);
    const words = text.split(/\s+/);
    textRef.current.innerHTML = "";

    for (const word of words) {
      if (word) {
        const origin = await fetchOrigin(word);
        const language = Object.keys(colorMap).find((lang) =>
          origin.includes(lang)
        );
        const color = colorMap[language] || "black";

        const span = document.createElement("span");
        span.textContent = word + " ";
        span.style.color = color;
        textRef.current.appendChild(span);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="App">

      <div className="CentreBox">
        <h1>Etymology Search</h1>
        <form onSubmit={handleSubmit}>
          <TextInput textRef={textRef} setText={setText} />
          <SubmitButton isLoading={isLoading} />
        </form>
        <Legend /> {}
      </div>

      

    </div>
  );
}

export default App;
