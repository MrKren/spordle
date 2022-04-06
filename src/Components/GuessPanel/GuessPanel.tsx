import React, { useEffect, useState, VFC } from "react";
import {
  Autocomplete,
  Box,
  TextField,
  createFilterOptions,
  Paper,
} from "@mui/material";
import { GuessPanelProps } from "../types";

const GuessPanel: VFC<GuessPanelProps> = ({ tracklist, song }) => {
  const [guess, setGuess] = useState(("" as string) || null);
  const [guessNumber, setGuessNumber] = useState(-1);
  const [guessedList, setGuessedList] = useState(
    Array(6).fill(null) as string[]
  );

  useEffect(() => {
    if (guess !== "" && guess !== null) {
      setGuess("");
      setGuessNumber(guessNumber + 1);
      const newGuessedList = guessedList.slice();
      newGuessedList[guessNumber + 1] = guess;
      setGuessedList(newGuessedList);
    }
  }, [guess]);

  if (Object.keys(tracklist).length > 0) {
    const guessList = tracklist.map((track) => track.song);
    const randomSong = song.song;

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginTop: "10px",
        }}
      >
        {guessedList.map((val, index) => (
          <Box key={index} sx={{ padding: "10px" }}>
            <Paper
              sx={{
                textAlign: "center",
                padding: "5px",
                height: "30px",
                color: randomSong === val ? "green" : "red",
              }}
            >
              {val}
            </Paper>
          </Box>
        ))}
        {guessNumber < 5 && (
          <Autocomplete
            key={guess}
            fullWidth
            size="small"
            filterOptions={createFilterOptions({
              limit: 4,
            })}
            options={guessList}
            renderInput={(params) => <TextField {...params} label="Guess" />}
            onChange={(e, value) => {
              setGuess(value);
            }}
          />
        )}
      </Box>
    );
  }
  return <></>;
};

export default GuessPanel;
