import React, { useEffect, useState, VFC } from "react";
import {
  Autocomplete,
  Box,
  TextField,
  createFilterOptions,
} from "@mui/material";
import { GuessPanelProps } from "../types";

const GuessPanel: VFC<GuessPanelProps> = ({ tracklist, song }) => {
  const [guess, setGuess] = useState(("" as string) || null);
  const [guessNumber, setGuessNumber] = useState(-1);
  const [guessList, setGuessList] = useState(Array(6).fill(null) as string[]);

  useEffect(() => {
    if (guess !== "" && guess !== null) {
      setGuess("");
      setGuessNumber(guessNumber + 1);
      const newGuessList = guessList.slice();
      newGuessList[guessNumber + 1] = guess;
      setGuessList(newGuessList);
    }
  }, [guess]);

  console.log(guessNumber, guessList);
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
