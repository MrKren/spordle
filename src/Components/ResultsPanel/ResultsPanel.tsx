import React, { VFC } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ResultsPanelProps } from "../types";

const ResultsPanel: VFC<ResultsPanelProps> = ({
  song,
  playlist,
  guessNum,
  success,
  resetFn,
}) => {
  const generateEmojis = () => {
    const fail = "🟥";
    const win = "🟩";
    const blank = "⬜";

    if (success) {
      return fail.repeat(guessNum) + win + blank.repeat(5 - guessNum);
    }
    return fail.repeat(6);
  };

  const generateShareText = () => {
    const shareText =
      `https://spordle.herokuapp.com/\n\n` +
      `Playlist: ${playlist.name}\n` +
      `Link: ${playlist.external_urls.spotify}\n` +
      `Song: ${song.song}\n\n` +
      `${generateEmojis()}`;
    console.log(shareText);
    navigator.clipboard.writeText(shareText);
  };

  return (
    <Dialog open={true}>
      <Box sx={{ textAlign: "center" }}>
        <DialogTitle>{success ? "Victory" : "Defeat"}</DialogTitle>
        <DialogContent>
          <p>
            {success
              ? "Well done you guessed correctly!"
              : "Better luck next time!"}
          </p>
          <img src={song.albumArt} alt="Album Cover Art" width="100%" />
          <h5>{song.song}</h5>
          <p>{generateEmojis()}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={generateShareText}>Share</Button>
          <Button onClick={resetFn}>Play Again</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ResultsPanel;
