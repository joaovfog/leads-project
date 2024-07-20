import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Source Sans Pro', sans-serif;
    background-color: #F5F6FA;
    margin: 10px 70px;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: #f4f5f7;
    border-radius: 2px;
  }

  ::-webkit-scrollbar-thumb {
    background: #b6b2b2;
    border-radius: 2px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`