import { fireEvent, render, screen } from "@testing-library/react";
import AudioControls from "./AudioControls";

describe("AudioControls", () => {
  const song = {
    link: "https://p.scdn.co/mp3-preview/3f03206b8e26f5e0f4ec3ff1fe70a8a9248db487?cid=cd8d92cbc0ea42fc8ad3e9b0997b1b8b",
  };
  const skipCallback = jest.fn();
  const component = (guessNum) => (
    <AudioControls
      song={song}
      guessNum={guessNum}
      skipCallback={skipCallback}
    />
  );

  let userAgent;
  beforeEach(() => {
    userAgent = jest.spyOn(window.navigator, "userAgent", "get");
  });

  it("calls skip callback when skip button is pressed", async () => {
    render(component(-1));
    const skipButton = await screen.findByText("Skip");
    fireEvent.click(skipButton);

    expect(skipCallback.mock.calls.length).toBe(1);
  });

  it("shows correct playback length", () => {
    const { rerender } = render(component(-1));
    expect(screen.queryByTestId("playback-text")).toHaveTextContent(`${1}s`);

    rerender(component(0));
    expect(screen.queryByTestId("playback-text")).toHaveTextContent(`${2}s`);

    rerender(component(1));
    expect(screen.queryByTestId("playback-text")).toHaveTextContent(`${4}s`);

    rerender(component(2));
    expect(screen.queryByTestId("playback-text")).toHaveTextContent(`${7}s`);

    rerender(component(3));
    expect(screen.queryByTestId("playback-text")).toHaveTextContent(`${11}s`);

    rerender(component(4));
    expect(screen.queryByTestId("playback-text")).toHaveTextContent(`${16}s`);
  });

  it("shows download button on mobile", () => {
    userAgent.mockReturnValue("iPhone");
    render(component(-1));
    const audioElement = screen.queryByTestId("audio-element");
    fireEvent.loadStart(audioElement);
    expect(screen.getByTestId("DownloadingIcon")).toBeTruthy();

    fireEvent.click(screen.getByTestId("DownloadingIcon"));
    expect(screen.queryByTestId("DownloadingIcon")).toBeFalsy();
    expect(screen.getByTestId("CircularProgress")).toBeTruthy();
  });

  it("does not show download button on mobile", () => {
    render(component(-1));
    const audioElement = screen.queryByTestId("audio-element");
    fireEvent.loadStart(audioElement);
    expect(screen.queryByTestId("DownloadingIcon")).toBeFalsy();
    expect(screen.getByTestId("CircularProgress")).toBeTruthy();

    fireEvent.canPlayThrough(audioElement);
    expect(screen.getByTestId("PlayArrowIcon")).toBeTruthy();
  });
});
