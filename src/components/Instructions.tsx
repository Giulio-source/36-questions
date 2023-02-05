import gsap from "gsap";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import { AppContext } from "../context/AppContext";
import { languageData } from "../data/languageData";
import { ArrowRight } from "./icons/ArrowRight";

export const StyledInstructions = styled.div`
  opacity: 0;
  visibility: hidden;

  flex: 1;

  display: flex;
  flex-direction: column;

  section {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    gap: 32px;
  }
`;

export const Instructions = ({ onNext }: { onNext: () => void }) => {
  const { lang } = useContext(AppContext);

  function handleOnClick() {
    gsap
      .timeline()
      .to("#instructions", {
        autoAlpha: 0,
        duration: 2,
      })
      .to({}, { duration: 1 })
      .then(() => onNext());
  }

  useEffect(() => {
    gsap.to("#instructions", {
      autoAlpha: 1,
      duration: 2,
    });
  }, []);

  return (
    <StyledInstructions id="instructions">
      <section>
        <h1>{languageData.instructionsTitle[lang]}</h1>
        <p>{languageData.instructions1[lang]}</p>
        <p>{languageData.instructions2[lang]}</p>
        <p>{languageData.instructions3[lang]}</p>
      </section>
      <button onClick={handleOnClick}>
        <ArrowRight />
      </button>
    </StyledInstructions>
  );
};
