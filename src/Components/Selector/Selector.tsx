import React, { useEffect, useState, VFC } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Playlist, SelectorProps } from "../types";
import axios, { AxiosResponse } from "axios";
import { FormHelperText } from "@mui/material";

const Selector: VFC<SelectorProps> = ({ token, setPlaylist }) => {
  const [textfieldValue, setTextfieldValue] = useState("" as string);
  const [playlistId, setPlaylistId] = useState("" as string);
  const [apiResponse, setApiResponse] = useState({
    status: 200,
  } as AxiosResponse);
  const apiUrl = "https://api.spotify.com/v1/playlists/";

  useEffect(() => {
    // Process url
    const returnUrl = "https://open.spotify.com/playlist/";
    let id = playlistId;
    if (id.startsWith(returnUrl)) {
      id = id.replace(returnUrl, "");
      id = id.slice(0, id.indexOf("?"));
    }

    // Request playlist data
    if (id.length > 0) {
      axios
        .get(`${apiUrl}${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setApiResponse(response);
          setPlaylist({ ...response.data } as Playlist);
        })
        .catch((error) => {
          setApiResponse(error.response);
        });
    }
  }, [playlistId, token, setPlaylist]);

  const errorCode = () => {
    if (apiResponse.status === 401) {
      return "Session Expired";
    }
    if (apiResponse.status === 404) {
      return "Playlist not found";
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", gap: "10px" }}>
        <TextField
          error={apiResponse.status !== 200}
          label="Playlist ID/Link"
          onChange={(e) => setTextfieldValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              setPlaylistId(textfieldValue);
            }
          }}
        />
        <Button
          variant="contained"
          onClick={() => setPlaylistId(textfieldValue)}
        >
          GO
        </Button>
      </Box>
      <Box sx={{ marginLeft: "10px" }}>
        <FormHelperText error>{errorCode()}</FormHelperText>
      </Box>
    </Box>
  );
};

export default Selector;
