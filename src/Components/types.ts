import { Dispatch, SetStateAction } from "react";

// Misc

export type Token = string | null;

export type Song = {
  song: string;
  link: string;
};

export type Tracklist = Song[];

// Props

export type SelectorProps = {
  token: Token;
  setPlaylist: Dispatch<SetStateAction<Playlist>>;
};

export type GuessPanelProps = {
  tracklist: Tracklist;
  song: Song;
  success: boolean;
  setSuccess: Dispatch<SetStateAction<boolean>>;
  setGuessNum: Dispatch<SetStateAction<number>>;
};

export type AudioControlsProps = {
  song: Song;
  guessNum: number;
};

// Playlist Object

export type Artists = {
  name: string;
  id: string;
};

export type Track = {
  track: {
    name: string;
    preview_url: string;
    artists: Artists[];
  };
};

export type Playlist = {
  description: string;
  id: string;
  name: string;
  tracks: {
    items: Track[];
  };
};
