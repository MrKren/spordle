import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import Selector from "../Components/Selector";
import { Playlist, Song, Token, Tracklist } from "../Components/types";
import GuessPanel from "../Components/GuessPanel";
import AudioControls from "../Components/AudioControls";
import ResultsPanel from "../Components/ResultsPanel";

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

theme.components = {
  MuiLinearProgress: {
    styleOverrides: {
      dashed: {
        animation: "none",
        backgroundImage: "none",
        backgroundColor: theme.palette.secondary.main,
      },
    },
  },
};

const clientId = encodeURIComponent("cd8d92cbc0ea42fc8ad3e9b0997b1b8b");
const redirectUri = encodeURIComponent(window.location.href);
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
  const [guessNum, setGuessNum] = useState(-1);
  const [randomNum, setRandomNum] = useState(-1);
  const playlistSet = Object.keys(playlist).length !== 0;
  const gameOver = guessNum === 5 || success;

  const generateRandomNum = (size: number) => {
    return Math.floor(Math.random() * size);
  };

  const reset = (): void => {
    let rand = randomNum;
    while (rand === randomNum) {
      rand = generateRandomNum(playlist.tracks.items.length);
    }
    setRandomNum(rand);
    setSong(tracklist[rand]);
    setSuccess(false);
    setGuessNum(-1);
  };

  useEffect(() => {
    if (playlistSet) {
      const tracks = playlist.tracks.items;
      let deadTracks = 0;
      let trackNames = tracks
        .filter((val) => {
          const preview = val.track.preview_url !== null;
          if (!preview) {
            deadTracks += 1;
          }
          return preview;
        })
        .map((val) => {
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
            albumArt: val.track.album.images[0].url,
          };
        });
      console.log(`There are ${deadTracks} tracks with no preview`);
      const rand = generateRandomNum(trackNames.length);
      setRandomNum(rand);
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
        <h1>Spordle</h1>
        {!authenticated && <a href={authUrl}>Authenticate</a>}
        {authenticated && <Selector token={token} setPlaylist={setPlaylist} />}
        {authenticated && playlistSet && (
          <GuessPanel
            key={randomNum + "-GuessPanel"}
            tracklist={tracklist}
            song={song}
            success={success}
            setSuccess={setSuccess}
            setGuessNum={setGuessNum}
          />
        )}
        {authenticated && playlistSet && (
          <AudioControls
            key={randomNum + "-AudioControl"}
            song={song}
            guessNum={guessNum}
          />
        )}
        {gameOver && (
          <ResultsPanel
            key={randomNum + "-ResultsPanel"}
            song={song}
            playlist={playlist}
            guessNum={guessNum}
            success={success}
            resetFn={reset}
          />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
