import gsap from "gsap";
import { useEffect } from "react";
import styled from "styled-components";
import { ArrowRight } from "./icons/ArrowRight";
import { StyledInstructions } from "./Instructions";
import { StyledQuestionNumber } from "./Question";

export const StyledTitle = styled.div`
  /* font-size: 40px;
  line-height: 130%; */
  text-transform: capitalize;
  font-weight: 700;
  font-size: 64px;
  letter-spacing: -2px;
  line-height: 80%;
`;

export const Cover = ({ onNext }: { onNext: () => void }) => {
  function handleOnClick() {
    gsap
      .timeline()
      .to("#cover", {
        autoAlpha: 0,
        duration: 2,
      })
      .to(
        "#cover button",
        {
          y: "random(-50, 50)",
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
    gsap
      .timeline()
      .to("#cover", {
        autoAlpha: 1,
        duration: 2,
      })
      .fromTo(
        "#cover-title",
        { text: "", autoAlpha: 1 },
        {
          text: { value: "The 36 Questions to fall in love.", speed: 1 },
          ease: "none",
        },
        "-=1"
      );
  }, []);

  return (
    <StyledInstructions id="cover">
      <section>
        <StyledTitle id="cover-title"></StyledTitle>
        <StyledQuestionNumber id="question-number">36</StyledQuestionNumber>
      </section>
      <button onClick={handleOnClick}>
        <ArrowRight />
      </button>
    </StyledInstructions>
  );
};
