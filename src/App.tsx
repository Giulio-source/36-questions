import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useContext, useEffect, useRef, useState } from "react";
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

  const questionsRef = useRef({ available: [...Array(36).keys()] });

  const { lang } = useContext(AppContext);

  // function handleOnClick() {
  //   if (questionsRef.current.available.length === 0) {
  //     setStep("end-game");
  //   }
  //   const random = Math.floor(
  //     Math.random() * questionsRef.current.available.length
  //   );
  //   setIndex(questionsRef.current.available[random]);
  // }]

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
    questionsRef.current.available = [...Array(36).keys()];
    setIndex(0);
    setStep("language");
  }

  useEffect(() => {
    gsap.registerPlugin(TextPlugin);
  }, []);

  useEffect(() => {
    if (index !== undefined && lang && step === "question") {
      questionsRef.current.available = questionsRef.current.available.filter(
        (x) => x !== index
      );
      const nextMessage = questions[index][lang];
      setMessage(nextMessage);
    }
  }, [index, lang]);

  return (
    <StyledApp id='app'>
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
