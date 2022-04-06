import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import Selector from "../Components/Selector";
import { Playlist, Song, Token, Tracklist } from "../Components/types";
import GuessPanel from "../Components/GuessPanel";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#009608",
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
  const [authenticated, setAuthenticated] = useState(false);
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
  const [tracklist, setTracklist] = useState({} as Tracklist);
  const [song, setSong] = useState({} as Song);
  const [success, setSuccess] = useState(false);
  const [guessNum, setGuessNum] = useState(0);
  const playlistSet = Object.keys(playlist).length !== 0;

  useEffect(() => {
    if (playlistSet) {
      const tracks = playlist.tracks.items;
      const trackNames = tracks.map((val) => {
        const name = val.track.name;
        const artists = val.track.artists.map((artist) => artist.name);
        let artist = "";
        for (let i = 0; i < artists.length; i++) {
          artist += artists[i] + ", ";
        }
        artist = artist.slice(0, -2);
        return {
          song: `${artist} - ${name}`,
          link: val.track.preview_url,
        };
      });
      const rand = Math.floor(Math.random() * playlist.tracks.items.length);
      setSong(trackNames[rand]);
      setTracklist(trackNames as Tracklist);
    }
  }, [playlist, playlistSet]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <h1>Spotify Heardle</h1>
        {!authenticated && <a href={authUrl}>Authenticate</a>}
        {authenticated && <Selector token={token} setPlaylist={setPlaylist} />}
        {authenticated && playlistSet && (
          <GuessPanel
            tracklist={tracklist}
            song={song}
            success={success}
            setSuccess={setSuccess}
            setGuessNum={setGuessNum}
          />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
