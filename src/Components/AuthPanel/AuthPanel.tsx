import React, { VFC, useEffect } from "react";
import { Box } from "@mui/material";
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
    <Box>
      <a href={authUrl}>Authenticate</a>
    </Box>
  );
};

export default AuthPanel;
