import { useEffect, useRef, useState } from "react";
import { StyledApp } from "./App.style";
import { questions } from "./questionsData";
import { cleanQuestionNumber } from "./utils";

function App() {
  const [index, setIndex] = useState(0);
  const [message, setMessage] = useState('')
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
    const nextMessage = cleanQuestionNumber(questions[index])
    setMessage(nextMessage);
  }, [index]);

  return (
    <StyledApp onClick={handleOnClick}>
      <h1>{message}</h1>
      {finished && <button onClick={startOver}>start over</button>}
    </StyledApp>
  );
}

export default App;
