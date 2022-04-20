import { Box, CircularProgress, Fab, LinearProgress } from "@mui/material";
import React, { useEffect, useRef, useState, VFC } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import DownloadingIcon from "@mui/icons-material/Downloading";
import { AudioControlsProps } from "../types";

const AudioControls: VFC<AudioControlsProps> = ({ song, guessNum }) => {
  const [loaded, setLoaded] = useState(false);
  const [initialClick, setInitialClick] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(1);
  const [playbackTime, setPlaybackTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    setTime((t) => t + guessNum + 1);
  }, [guessNum]);

  useEffect(() => {
    if (audioRef.current !== null) {
      if (playing) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing]);

  return (
    <Box
      sx={{
        margin: "20px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <audio
        ref={audioRef}
        src={song.link}
        onLoadStart={() => {
          if (!isMobile) {
            setInitialClick(true);
          }
        }}
        onCanPlayThrough={() => setLoaded(true)}
        onTimeUpdate={() => {
          setPlaybackTime(
            Math.round((audioRef.current?.currentTime || 0) * 10) / 10
          );
          if (audioRef.current && audioRef.current.currentTime >= time) {
            audioRef.current.currentTime = 0;
            setPlaying(false);
          }
        }}
      />
      {loaded && (
        <Fab onClick={() => setPlaying(!playing)}>
          {playing ? <PauseIcon /> : <PlayArrowIcon />}
        </Fab>
      )}
      {!loaded && (
        <Fab
          onClick={() => {
            setInitialClick(true);
            audioRef.current?.load();
          }}
        >
          {initialClick ? <CircularProgress /> : <DownloadingIcon />}
        </Fab>
      )}
      <Box
        sx={{
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box sx={{ width: "80%", margin: "10px" }}>
          <LinearProgress
            // sx={{ height: "10px" }}
            variant="buffer"
            value={(playbackTime / 16) * 100}
            valueBuffer={(time / 16) * 100}
          />
        </Box>
        <Box sx={{ marginLeft: "10px" }}>
          <span>
            {playbackTime}/{time}s
          </span>
        </Box>
      </Box>
    </Box>
  );
};

export default AudioControls;
