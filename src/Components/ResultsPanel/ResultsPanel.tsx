import React, { useState, VFC } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";
import { ResultsPanelProps } from "../types";

const ResultsPanel: VFC<ResultsPanelProps> = ({
  song,
  playlist,
  guessNum,
  success,
  resetFn,
  skipList,
}) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const generateEmojis = () => {
    const fail = "🟥";
    const win = "🟩";
    const blank = "⬜";
    const skip = "⬛";

    const failSkipEmojis = (num: number) =>
      Array(num)
        .fill("")
        .map((_, index) => {
          if (skipList[index]) return skip;
          return fail;
        })
        .join("");

    if (success) {
      return failSkipEmojis(guessNum) + win + blank.repeat(5 - guessNum);
    }
    return failSkipEmojis(6);
  };

  const generateShareText = () => {
    const shareText =
      `https://spordle.herokuapp.com/\n\n` +
      `Playlist: ${playlist.name}\n` +
      `Link: ${playlist.external_urls.spotify}\n` +
      `Song: ${song.song}\n\n` +
      `${generateEmojis()}`;
    navigator.clipboard.writeText(shareText);
    setOpenSnackbar(true);
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2500}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="info">Copied to clipboard</Alert>
      </Snackbar>
    </Dialog>
  );
};

export default ResultsPanel;
