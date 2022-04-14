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
  guessNum,
  success,
  resetFn,
}) => {
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
        </DialogContent>
        <DialogActions>
          <Button>Share</Button>
          <Button
            onClick={() => {
              resetFn();
            }}
          >
            Play Again
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ResultsPanel;
