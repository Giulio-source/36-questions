import { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../context/AppContext";

const StyledLanguagePicker = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const LanguagePicker = ({ onNext }: { onNext: () => void }) => {
  const { onChangeLang } = useContext(AppContext);

  return (
    <StyledLanguagePicker>
      <button
        onClick={() => {
          onChangeLang("en");
          onNext();
        }}
      >
        English
      </button>
      <button
        onClick={() => {
          onChangeLang("it");
          onNext();
        }}
      >
        Italiano
      </button>
    </StyledLanguagePicker>
  );
};
