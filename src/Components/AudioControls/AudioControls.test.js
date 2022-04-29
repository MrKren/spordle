import { fireEvent, render, screen } from "@testing-library/react";
import AudioControls from "./AudioControls";

describe("AudioControls", () => {
  const song = {
    link: "data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA==",
  };
  const skipCallback = jest.fn();
  const component = (guessNum) => (
    <AudioControls
      song={song}
      guessNum={guessNum}
      skipCallback={skipCallback}
    />
  );

  beforeEach(() => {
    Object.defineProperty(window.navigator, "userAgent", { value: "Chrome" });
  });

  it("calls skip callback when skip button is pressed", async () => {
    render(component(-1));
    const skipButton = await screen.findByText("Skip");
    fireEvent.click(skipButton);

    expect(skipCallback.mock.calls.length).toBe(1);
  });

  it("shows correct playback length", async () => {
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
});
