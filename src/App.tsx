import { useEffect, useRef, useState } from "react";
import "./App.css";
import { questions } from "./questionsData";

function App() {
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  const questionsRef = useRef({ available: [...Array(36).keys()] });

  function handleOnClick() {
    if (questionsRef.current.available.length === 0) {
      setFinished(true);
    }
    const random = Math.floor(
      Math.random() * questionsRef.current.available.length
    );
    setIndex(questionsRef.current.available[random]);
  }

  function startOver() {
    questionsRef.current.available = [...Array(36).keys()];
    setIndex(0);
    setFinished(false);
  }

  useEffect(() => {
    questionsRef.current.available = questionsRef.current.available.filter(
      (x) => x !== index
    );
  }, [index]);

  console.log(questionsRef.current.available);

  return (
    <div className="App">
      <h1>{finished ? "End game" : questions[index]}</h1>
      <div className="card">
        {finished ? (
          <button onClick={startOver}>start over</button>
        ) : (
          <button onClick={handleOnClick}>random</button>
        )}
      </div>
    </div>
  );
}

export default App;
