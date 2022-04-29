import { fireEvent, render, screen } from "@testing-library/react";
import AudioControls from "./AudioControls";

describe("AudioControls", () => {
  const song = {
    link: "data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA==",
  };
  const skipCallback = jest.fn();
  const view = () => {
    render(
      <AudioControls song={song} guessNum={-1} skipCallback={skipCallback} />
    );
  };

  beforeEach(() => {
    Object.defineProperty(window.navigator, "userAgent", { value: "Chrome" });
  });

  it("calls skip callback when skip button is pressed", async () => {
    view();
    const skipButton = await screen.findByText("Skip");
    fireEvent.click(skipButton);

    expect(skipCallback.mock.calls.length).toBe(1);
  });
});
