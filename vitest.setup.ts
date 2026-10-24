import '@testing-library/jest-dom/vitest'

// jsdom has no canvas. The story engine already does nothing when the canvas
// has no 2D context; this stub keeps jsdom's "not implemented" error out of
// the test output.
HTMLCanvasElement.prototype.getContext = (() =>
  null) as unknown as HTMLCanvasElement['getContext']
