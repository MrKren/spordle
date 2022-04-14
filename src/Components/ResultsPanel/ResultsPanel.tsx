import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { VFC } from "react";
import { ResultsPanelProps } from "../types";

const ResultsPanel: VFC<ResultsPanelProps> = ({ song, guessNum, success }) => {
  return (
    <Dialog open={true}>
      <Box sx={{ textAlign: "center" }}>
        <DialogTitle>{success ? "Victory" : "Defeat"}</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button>Share</Button>
          <Button>Play Again</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ResultsPanel;
