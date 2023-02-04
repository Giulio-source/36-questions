import { useContext, useEffect, useRef, useState } from "react";
import { StyledApp, StyledQuestion } from "./App.style";
import { LanguagePicker } from "./components/LanguagePicker";
import { AppContext } from "./context/AppContext";
import { languageData } from "./data/languageData";
import { questions } from "./data/questionsData";

function App() {
  const [step, setStep] = useState<"language" | "question" | "end-game">(
    "language"
  );
  const [index, setIndex] = useState(0);
  const [message, setMessage] = useState("");

  const questionsRef = useRef({ available: [...Array(36).keys()] });

  const { lang } = useContext(AppContext);

  function handleOnClick() {
    if (questionsRef.current.available.length === 0) {
      setMessage(languageData.endGame[lang]);
      setStep("end-game");
    }
    const random = Math.floor(
      Math.random() * questionsRef.current.available.length
    );
    setIndex(questionsRef.current.available[random]);
  }

  function startOver() {
    questionsRef.current.available = [...Array(36).keys()];
    setIndex(0);
    setStep("question");
  }

  useEffect(() => {
    if (index !== undefined) {
      questionsRef.current.available = questionsRef.current.available.filter(
        (x) => x !== index
      );
      const nextMessage = questions[index][lang];
      setMessage(nextMessage);
    }
  }, [index, lang]);

  return (
    <StyledApp>
      {step === "language" && (
        <LanguagePicker onNext={() => setStep("question")} />
      )}
      {step === "question" && (
        <StyledQuestion onClick={handleOnClick}>{message}</StyledQuestion>
      )}
      {step === "end-game" && (
        <>
          <h1 onClick={handleOnClick}>{message}</h1>
          <button onClick={startOver}>{languageData.startOver[lang]}</button>
        </>
      )}
    </StyledApp>
  );
}

export default App;
