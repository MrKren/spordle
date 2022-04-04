import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect } from "react";

const Selector = () => {
  const [playlistId, setPlaylistId] = useState("" as string);
  const apiUrl = "https://api.spotify.com/v1/playlists/";

  const collectPlaylist = () => {
    console.log(playlistId);
  };

  return (
    <Box sx={{ display: "flex", gap: "10px" }}>
      <TextField
        label="Playlist ID"
        onChange={(URI) => setPlaylistId(URI.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            collectPlaylist();
          }
        }}
      />
      <Button variant="contained" onClick={collectPlaylist}>
        GO
      </Button>
    </Box>
  );
};

export default Selector;
