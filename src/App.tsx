import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useContext, useEffect, useState } from "react";
import { StyledApp } from "./App.style";
import { Cover } from "./components/Cover";
import { EndGame } from "./components/EndGame";
import { Instructions } from "./components/Instructions";
import { Introduction } from "./components/Introduction";
import { LanguagePicker } from "./components/LanguagePicker";
import { Question } from "./components/Question";
import { AppContext } from "./context/AppContext";
import { questions } from "./data/questionsData";

function App() {
  const [step, setStep] = useState<
    | "cover"
    | "language"
    | "introduction"
    | "instructions"
    | "question"
    | "end-game"
  >("cover");
  const [index, setIndex] = useState(0);
  const [message, setMessage] = useState("");

  const { lang } = useContext(AppContext);

  function onNext() {
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
    setStep("cover");
  }

  useEffect(() => {
    gsap.registerPlugin(TextPlugin);
  }, []);

  useEffect(() => {
    if (index !== undefined && lang && step === "question") {
      if (index >= 35) {
        setStep("end-game");
      } else {
        const nextMessage = questions[index][lang];
        setMessage(nextMessage);
      }
    }
  }, [index, lang, step]);

  return (
    <StyledApp id="app">
      {step === "cover" && <Cover onNext={() => setStep("language")} />}
      {step === "language" && (
        <LanguagePicker onNext={() => setStep("introduction")} />
      )}
      {step === "introduction" && (
        <Introduction onNext={() => setStep("instructions")} />
      )}
      {step === "instructions" && (
        <Instructions onNext={() => setStep("question")} />
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
