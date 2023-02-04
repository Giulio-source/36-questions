import gsap from "gsap";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import { AppContext } from "../context/AppContext";
import { languageData } from "../data/languageData";

const StyledEndGame = styled.div`
  opacity: 0;
  visibility: hidden;

  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const EndGame = ({ startOver }: { startOver: () => void }) => {
  const { lang } = useContext(AppContext);

  useEffect(() => {
    gsap.to("#end-game", {
      autoAlpha: 1,
      duration: 2,
    });
  }, []);

  return (
    <StyledEndGame id="end-game">
      <h1>{languageData.endGame[lang]}</h1>
      <button onClick={startOver}>{languageData.startOver[lang]}</button>
    </StyledEndGame>
  );
};
