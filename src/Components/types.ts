import { Dispatch, SetStateAction } from "react";

// Misc

export type Token = string | null;

export type Song = {
  song: string;
  link: string;
  albumArt: string;
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

export type ResultsPanelProps = {
  song: Song;
  playlist: Playlist;
  guessNum: number;
  success: boolean;
  resetFn: () => void;
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
    album: {
      images: { url: string }[];
    };
  };
};

export type Playlist = {
  description: string;
  id: string;
  name: string;
  tracks: {
    items: Track[];
  };
  external_urls: {
    spotify: string;
  };
};
