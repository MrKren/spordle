import { Box, Fab } from "@mui/material";
import React, { useRef, useState, VFC } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { AudioControlsProps } from "../types";

const AudioControls: VFC<AudioControlsProps> = ({ song, guessNum }) => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(new Audio());

  const playFunc = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <Box sx={{ margin: "20px" }}>
      <audio ref={audioRef} src={song.link} />
      <Fab onClick={() => playFunc()}>
        {playing ? <PauseIcon /> : <PlayArrowIcon />}
      </Fab>
    </Box>
  );
};

export default AudioControls;
