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
    font-family: 'Josefin Sans', sans-serif;  
    overflow: hidden;
  }

  button {
    font-family: inherit;
    background: transparent;
    color: inherit;
    border: 1px solid ${Colors.white};
    padding: 16px 24px;
    font-size: 18px;
    cursor: pointer;
    text-transform: uppercase;
    transition: all 0.3s;
    width: 100%;

    &:active {
      background: ${Colors.white};
      color: ${Colors.black};
    }

    svg {
      width: 32px;
    }
  }

  h1 {
    line-height: 130%;
    font-size: 24px;
    margin: 0;

  @media screen and (min-width: 1024px) {
    font-size: 32px;
  }
  }

  p {
    line-height: 130%;
    font-size: 16px;
    margin: 0;

  @media screen and (min-width: 1024px) {
    font-size: 18px;
  }
  }
`;
