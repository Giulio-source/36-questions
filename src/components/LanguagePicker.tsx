import { gsap } from "gsap";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import { AppContext, LanguageType } from "../context/AppContext";

const StyledLanguagePicker = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  opacity: 0;
  visibility: hidden;
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
        ease: "power4.out",
      })
      .to({}, { duration: 0.5 })
      .then(() => {
        onChangeLang(lang);
        onNext();
      });
  }

  useEffect(() => {
    gsap.fromTo(
      "#language-picker",
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        duration: 2,
        ease: "power4.out",
      }
    );
  }, []);

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
