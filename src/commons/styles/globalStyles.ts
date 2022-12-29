import { css } from '@emotion/react';

export const globalStyles = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'InfinitySans', '돋움', 'AppleGothic, sans-serif';
  }
  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }
  body {
    cursor: default;
    position: relative;
  }
  h1 {
    font-family: 'SSShinb7', '돋움', 'AppleGothic, sans-serif';
  }
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 400;
    line-height: 1.5;
    vertical-align: top;
    letter-spacing: -0.5%;
  }
  button {
    border: none;
  }
  a {
    text-decoration: none;
    color: #000000;
    :hover {
      color: inherit;
    }
  }
  li {
    list-style: none;
  }
  input:focus {
    outline: none;
  }
  textarea:focus {
    outline: none;
  }

  @font-face {
    font-family: 'SSShinb7';
    src: url('/fonts/SSShinb7Regular.ttf');
  }

  @font-face {
    font-family: 'InfinitySans';
    src: url('/fonts/InfinitySansR-Regular.otf');
  }

  @font-face {
    font-family: 'InfinitySansBold';
    src: url('/fonts/InfinitySansWM-Bold.otf');
  }
`;
