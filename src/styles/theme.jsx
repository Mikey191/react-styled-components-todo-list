import { ThemeProvider, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  body{
    background-color: #ddd;
  }
`;

const theme = {
  colors: {
    title: "green",
    task: "#555",
  },
};

const brightTheme = {
  colors: {
    title: "red",
    task: "orange",
  },
};

const Theme = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
