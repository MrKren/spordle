import { Box, CircularProgress, Fab, LinearProgress } from "@mui/material";
import React, { useEffect, useRef, useState, VFC } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import DownloadingIcon from "@mui/icons-material/Downloading";
import FastForwardIcon from "@mui/icons-material/FastForward";
import { AudioControlsProps } from "../types";

const AudioControls: VFC<AudioControlsProps> = ({
  song,
  guessNum,
  skipCallback,
}) => {
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
            console.log("aa");
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
        data-testid="audio-element"
      />
      <Box
        sx={{
          width: "90%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Fab variant="extended" color="primary" onClick={skipCallback}>
          <FastForwardIcon />
          <Box sx={{ marginLeft: "10px" }}>Skip</Box>
        </Fab>
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
            {initialClick ? (
              <CircularProgress data-testid="CircularProgress" />
            ) : (
              <DownloadingIcon />
            )}
          </Fab>
        )}
        <Box
          sx={{
            minWidth: "65px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <span data-testid="playback-text">
            {playbackTime}/{time}s
          </span>
        </Box>
      </Box>
      <Box sx={{ width: "100%" }}>
        <LinearProgress
          sx={{ height: "7px", margin: "20px 10px" }}
          variant="buffer"
          value={(playbackTime / 16) * 100}
          valueBuffer={(time / 16) * 100}
        />
      </Box>
    </Box>
  );
};

export default AudioControls;
