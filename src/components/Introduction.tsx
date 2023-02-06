import gsap from "gsap";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import { AppContext } from "../context/AppContext";
import { languageData } from "../data/languageData";
import { ArrowRight } from "./icons/ArrowRight";
import { StyledInstructions } from "./Instructions";

export const StyledIntroductions = styled.div``;

export const Introduction = ({ onNext }: { onNext: () => void }) => {
  const { lang } = useContext(AppContext);

  function handleOnClick() {
    gsap
      .timeline()
      .to("#introduction", {
        autoAlpha: 0,
        duration: 2,
      })
      .to(
        "#introduction button",
        {
          y: "random(0, 50)",
          autoAlpha: 0,
          duration: 2,
          ease: "power4.out",
        },
        "<"
      )
      .to({}, { duration: 0.5 })
      .then(() => onNext());
  }

  useEffect(() => {
    gsap.to("#introduction", {
      autoAlpha: 1,
      duration: 2,
    });
  }, []);

  return (
    <StyledInstructions id="introduction">
      <section>
        <h1>{languageData.introTitle[lang]}</h1>
        <p>{languageData.intro1[lang]}</p>
        <p>{languageData.intro2[lang]}</p>
      </section>
      <button onClick={handleOnClick}>
        <ArrowRight />
      </button>
    </StyledInstructions>
  );
};
