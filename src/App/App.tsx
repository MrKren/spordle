import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Selector from "../Components/Selector";
import { Playlist, Token } from "../Components/types";

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

const clientId = encodeURIComponent("cd8d92cbc0ea42fc8ad3e9b0997b1b8b");
const redirectUri = encodeURIComponent("http://localhost:3000");
let authUrl = `https://accounts.spotify.com/authorize`;
authUrl += "?response_type=token";
authUrl += `&client_id=${clientId}`;
authUrl += `&redirect_uri=${redirectUri}`;

function App() {
  //Authentication
  const [authenticated, setAuthenticated] = useState(false as boolean);
  const [token, setToken] = useState(null as Token);
  const currentUrl = window.location.href;

  useEffect(() => {
    const index = currentUrl.indexOf("#") + 1;
    const searchUrl = `${currentUrl.slice(0, index)}&${currentUrl.slice(
      index
    )}`;
    const tokenSearch = new URLSearchParams(searchUrl);
    const tokenValue = tokenSearch.get("access_token");
    if (tokenValue) {
      setAuthenticated(true);
      setToken(tokenValue);
    }
  }, [currentUrl]);

  //Main app logic
  const [playlist, setPlaylist] = useState({} as Playlist);
  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <h1>Spotify Heardle</h1>
        {!authenticated && <a href={authUrl}>Authenticate</a>}
        {authenticated && <Selector token={token} setPlaylist={setPlaylist} />}
      </Container>
    </ThemeProvider>
  );
}

export default App;
