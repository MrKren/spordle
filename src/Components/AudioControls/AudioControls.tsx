import { Box, Fab } from "@mui/material";
import React, { useEffect, useRef, useState, VFC } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { AudioControlsProps } from "../types";

const AudioControls: VFC<AudioControlsProps> = ({ song, guessNum }) => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

  return (
    <Box sx={{ margin: "20px" }}>
      <audio ref={audioRef} src={song.link} />
      <Fab onClick={() => setPlaying(!playing)}>
        {playing ? <PauseIcon /> : <PlayArrowIcon />}
      </Fab>
    </Box>
  );
};

export default AudioControls;
