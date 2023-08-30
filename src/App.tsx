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
import { shuffleNumbers } from "./utils";

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
  const [order, setOrder] = useState<"set" | "random">();
  const [questionsOrder, setQuestionsOrder] = useState<number[]>();

  const { lang, onChangeLang } = useContext(AppContext);

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
    setOrder(undefined);
    setQuestionsOrder(undefined);
    onChangeLang("en");
  }

  useEffect(() => {
    gsap.registerPlugin(TextPlugin);
  }, []);

  useEffect(() => {
    if (!order) return;
    if (order === "set") {
      setQuestionsOrder(Array.from({ length: 36 }, (_, index) => index));
    } else {
      setQuestionsOrder(shuffleNumbers());
    }
  }, [order]);

  useEffect(() => {
    if (index !== undefined && lang && step === "question" && questionsOrder) {
      if (index >= 1) {
        setStep("end-game");
      } else {
        const nextMessage = questions[questionsOrder[index]][lang];
        setMessage(nextMessage);
      }
    }
  }, [index, lang, step, questionsOrder]);

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
        <Instructions
          onNext={(order: "set" | "random") => {
            setStep("question");
            setOrder(order);
          }}
        />
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
