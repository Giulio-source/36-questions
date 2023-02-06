import gsap from "gsap";
import { useEffect } from "react";
import styled from "styled-components";
import { ArrowLeft } from "./icons/ArrowLeft";
import { ArrowRight } from "./icons/ArrowRight";

const StyledQuestionWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const StyledQuestion = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
`;

const StyledQuestionMessage = styled.h1`
  opacity: 0;
  visibility: hidden;
`;

export const StyledQuestionNumber = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 300px;
  opacity: 0.1;
  z-index: -1;
`;

const StyledNavigation = styled.div`
  display: flex;
  gap: 32px;

  button {
    flex: 1;
    opacity: 0;
    visibility: hidden;

    svg {
      width: 32px;
    }
  }
`;

export const Question = ({
  message,
  questionNumber,
  onNext,
  onPrev,
}: {
  message: string;
  questionNumber: number;
  onNext: () => void;
  onPrev: () => void;
}) => {
  function handleOnNext() {
    gsap
      .timeline()
      .to("#question-container, #question-number", {
        autoAlpha: 0,
        duration: 1,
        ease: "power4.out",
      })
      .to(
        "#button-navigation button",
        {
          y: "random(-50, 50)",
          autoAlpha: 0,
          duration: 2,
          ease: "power4.out",
        },
        "<"
      )
      .to({}, { duration: 0.5 })
      .then(() => {
        onNext();
      });
  }

  useEffect(() => {
    gsap
      .timeline()
      .add("start")
      .fromTo(
        "#question-container",
        { text: "", autoAlpha: 1 },
        {
          text: { value: message, speed: 1 },
          ease: "none",
        },
        "start"
      )
      .fromTo(
        "#button-navigation button",
        {
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 2,
          ease: "power4.out",
        },
        "start"
      )
      .fromTo(
        "#question-number",
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 0.1,
          duration: 2,
          ease: "power4.out",
        },
        "start"
      );
  }, [message]);

  return (
    <StyledQuestionWrapper>
      <StyledQuestion style={{ position: "relative" }}>
        <StyledQuestionNumber id="question-number">
          {questionNumber}
        </StyledQuestionNumber>
        <StyledQuestionMessage id="question-container" />
      </StyledQuestion>
      <StyledNavigation id="button-navigation">
        <button onClick={onPrev}>
          <ArrowLeft />
        </button>
        <button onClick={handleOnNext}>
          <ArrowRight />
        </button>
      </StyledNavigation>
    </StyledQuestionWrapper>
  );
};
