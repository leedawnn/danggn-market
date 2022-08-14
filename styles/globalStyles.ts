import { css } from '@emotion/react';

export const globalStyles = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'InfinitySans';
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
    font-family: 'SSShinb7';
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
  }
  a {
    text-decoration: none;
    color: #000;
  }
  li {
    list-style: none;
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
