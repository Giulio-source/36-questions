import { gsap } from "gsap";
import { useContext } from "react";
import styled from "styled-components";
import { AppContext, LanguageType } from "../context/AppContext";

const StyledLanguagePicker = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const LanguagePicker = ({ onNext }: { onNext: () => void }) => {
  const { onChangeLang } = useContext(AppContext);

  function handleOnClick(lang: LanguageType) {
    gsap
      .timeline()
      .to("#language-picker button", {
        y: "random(30, 80)",
        autoAlpha: 0,
        duration: 2,
        ease: "easeInOut",
      })
      .to({}, { duration: 1 })
      .then(() => {
        onChangeLang(lang);
        onNext();
      });
  }

  return (
    <StyledLanguagePicker id="language-picker">
      <button
        onClick={() => {
          handleOnClick("en");
        }}
      >
        English
      </button>
      <button
        onClick={() => {
          handleOnClick("it");
        }}
      >
        Italiano
      </button>
    </StyledLanguagePicker>
  );
};
