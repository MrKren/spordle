import React, { useEffect, useState, VFC } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { SelectorProps } from "../types";
import axios from "axios";

const Selector: VFC<SelectorProps> = ({ token }) => {
  const [textfieldValue, setTextfieldValue] = useState("" as string);
  const [playlistId, setPlaylistId] = useState("" as string);
  const apiUrl = "https://api.spotify.com/v1/playlists/";

  useEffect(() => {
    // Process url
    const returnUrl = "https://open.spotify.com/playlist/";
    let id = playlistId;
    if (id.startsWith(returnUrl)) {
      id = id.replace(returnUrl, "");
      id = id.slice(0, id.indexOf("?"));
    }

    if (id.length > 0) {
      const playlistObj = axios.get(`${apiUrl}${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    }
  }, [playlistId, token]);

  return (
    <Box sx={{ display: "flex", gap: "10px" }}>
      <TextField
        label="Playlist ID"
        onChange={(e) => setTextfieldValue(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            setPlaylistId(textfieldValue);
          }
        }}
      />
      <Button variant="contained" onClick={() => setPlaylistId(textfieldValue)}>
        GO
      </Button>
    </Box>
  );
};

export default Selector;
