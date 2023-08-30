import gsap from "gsap";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import { AppContext } from "../context/AppContext";
import { languageData } from "../data/languageData";

export const StyledInstructions = styled.div`
  opacity: 0;
  visibility: hidden;

  flex: 1;

  display: flex;
  flex-direction: column;

  section {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    gap: 24px;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 32px;

    button {
      text-transform: none;
    }
  }
`;

export const Instructions = ({
  onNext,
}: {
  onNext: (order: "set" | "random") => void;
}) => {
  const { lang } = useContext(AppContext);

  function handleOnClick(value: "set" | "random") {
    gsap
      .timeline()
      .to("#instructions", {
        autoAlpha: 0,
        duration: 2,
      })
      .to(
        "#instructions button",
        {
          y: "random(-50, 50)",
          autoAlpha: 0,
          duration: 2,
          ease: "power4.out",
        },
        "<"
      )
      .to({}, { duration: 0.5 })
      .then(() => onNext(value));
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
        <p>{languageData.order[lang]}</p>
      </section>
      <div className="wrapper">
        <button onClick={() => handleOnClick("set")}>
          {languageData.orderSet[lang]}
        </button>
        <button onClick={() => handleOnClick("random")}>
          {languageData.orderRandom[lang]}
        </button>
      </div>
    </StyledInstructions>
  );
};
