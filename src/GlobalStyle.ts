import { createGlobalStyle } from "styled-components";

export const Colors = {
  black: "#181A20",
  white: "#ddd",
};

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: ${Colors.black};
    color: ${Colors.white};
    text-align: center;
    font-family: "Italiana", monospace;
    overflow: hidden;
  }

  button {
    font-family: inherit;
    background: transparent;
    color: inherit;
    border: 1px solid ${Colors.white};
    padding: 12px 24px;
    font-size: 18px;
  }
`;
