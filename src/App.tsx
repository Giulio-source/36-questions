import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useContext, useEffect, useState } from "react";
import { StyledApp } from "./App.style";
import { EndGame } from "./components/EndGame";
import { LanguagePicker } from "./components/LanguagePicker";
import { Question } from "./components/Question";
import { AppContext } from "./context/AppContext";
import { questions } from "./data/questionsData";

function App() {
  const [step, setStep] = useState<"language" | "question" | "end-game">(
    "language"
  );
  const [index, setIndex] = useState(0);
  const [message, setMessage] = useState("");

  const { lang } = useContext(AppContext);

  function onNext() {
    if (index === 35) {
      setStep("end-game");
      return;
    }
    setIndex((prev) => (prev += 1));
  }

  function onPrev() {
    if (index === 0) {
      setStep("language");
      return;
    }
    setIndex((prev) => (prev -= 1));
  }

  function startOver() {
    setIndex(0);
    setStep("language");
  }

  useEffect(() => {
    gsap.registerPlugin(TextPlugin);
  }, []);

  useEffect(() => {
    if (index !== undefined && lang && step === "question") {
      const nextMessage = questions[index][lang];
      setMessage(nextMessage);
    }
  }, [index, lang, step]);

  return (
    <StyledApp id="app">
      {step === "language" && (
        <LanguagePicker onNext={() => setStep("question")} />
      )}
      {step === "question" && (
        <Question
          message={message}
          questionNumber={index + 1}
          onNext={onNext}
          onPrev={onPrev}
        />
      )}
      {step === "end-game" && <EndGame startOver={startOver} />}
    </StyledApp>
  );
}

export default App;
