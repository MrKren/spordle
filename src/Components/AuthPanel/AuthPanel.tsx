import React, { VFC, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { AuthPanelProps } from "../types";

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
  }, [currentUrl]);

  return (
    <Box
      sx={{
        height: "100%",
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
    </Box>
  );
};

export default AuthPanel;
