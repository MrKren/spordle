import React, { VFC, useEffect } from "react";
import { Box, Button, Grid } from "@mui/material";
import { AuthPanelProps } from "../types";
import MuiLogo from "../../Assets/MUI-logo.svg";
import TsLogo from "../../Assets/ts-logo.svg";
import SpotifyLogo from "../../Assets/spotify-logo.svg";
import ReactLogo from "../../Assets/react-logo.svg";
import GithubLogo from "../../Assets/github-logo.svg";
import HerokuLogo from "../../Assets/heroku-logo.svg";

const AuthPanel: VFC<AuthPanelProps> = ({ setToken }) => {
  const clientId = encodeURIComponent("cd8d92cbc0ea42fc8ad3e9b0997b1b8b");
  const redirectUri = encodeURIComponent(window.location.href);
  let authUrl = `https://accounts.spotify.com/authorize`;
  authUrl += "?response_type=token";
  authUrl += `&client_id=${clientId}`;
  authUrl += `&redirect_uri=${redirectUri}`;

  const currentUrl = window.location.href;

  useEffect(() => {
    const index = currentUrl.indexOf("#") + 1;
    const searchUrl = `${currentUrl.slice(0, index)}&${currentUrl.slice(
      index
    )}`;
    const tokenSearch = new URLSearchParams(searchUrl);
    const tokenValue = tokenSearch.get("access_token");
    if (tokenValue) setToken(tokenValue);
  }, [currentUrl, setToken]);

  const logos = [
    {
      name: "Typescript",
      src: TsLogo,
      link: "https://www.typescriptlang.org/",
      width: "50px",
    },
    {
      name: "ReactJS",
      src: ReactLogo,
      link: "https://reactjs.org/",
      width: "60px",
    },
    {
      name: "Spotify",
      src: SpotifyLogo,
      link: "https://developer.spotify.com/",
      width: "100px",
    },
    {
      name: "MUI",
      src: MuiLogo,
      link: "https://mui.com/",
      width: "50px",
    },
    {
      name: "Github",
      src: GithubLogo,
      link: "https://github.com/MrKren/spordle",
      width: "60px",
    },
    {
      name: "Heroku",
      src: HerokuLogo,
      link: "https://www.heroku.com/",
      width: "50px",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Box>
        <p>How well do you know your playlists?</p>
        <p>
          Spordle is a music guessing game based off{" "}
          <a href="https://www.heardle.app/">Heardle</a> using the Spotify API
        </p>
      </Box>
      <a href={authUrl} style={{ textDecoration: "unset" }}>
        <Button variant="contained" sx={{ marginTop: "20px" }}>
          Log in with Spotify
        </Button>
      </a>
      <Button
        variant="contained"
        sx={{ marginTop: "20px" }}
        onClick={() => setToken("AppDemo")}
      >
        Demo the app
      </Button>
      <h4>Created using:</h4>
      <Grid container width="300px" spacing={2}>
        {logos.map(({ name, src, link, width }) => (
          <Grid key={src} item xs={6}>
            <a href={link}>
              <img src={src} width={width} alt={`${name} logo`} />
            </a>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AuthPanel;
