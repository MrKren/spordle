import { Dispatch, SetStateAction } from "react";

export type Token = string | null;

export type SelectorProps = {
  token: Token;
  setPlaylist: Dispatch<SetStateAction<Playlist>>;
};

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
