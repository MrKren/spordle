import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Selector from "../Components/Selector";

const theme = createTheme({
  palette: {
    primary: {
      main: "#009688",
    },
    secondary: {
      main: "#7cb342",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <h1>Spotify Heardle</h1>
        <Selector />
      </Container>
    </ThemeProvider>
  );
}

export default App;
