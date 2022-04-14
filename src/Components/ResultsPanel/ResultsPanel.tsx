import React, { useState, VFC } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { ResultsPanelProps } from "../types";

const ResultsPanel: VFC<ResultsPanelProps> = ({
  song,
  guessNum,
  success,
  resetFn,
}) => {
  const [open, setOpen] = useState(true);

  return (
    <Dialog open={open}>
      <Box sx={{ textAlign: "center" }}>
        <DialogTitle>{success ? "Victory" : "Defeat"}</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button>Share</Button>
          <Button
            onClick={() => {
              setOpen(false);
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
