import styled from "styled-components";

export const StyledApp = styled.div`
  max-width: min(80vw, 400px);
  height: 90vh;
  margin: auto;

  display: flex;
  gap: 16px;
  flex-direction: column;
  justify-content: center;
`;

export const StyledQuestion = styled.h1`
  cursor: pointer;
  line-height: 130%;
  font-size: 24px;
  margin: 0;

  @media screen and (min-width: 1024px) {
    font-size: 32px;
  }
`