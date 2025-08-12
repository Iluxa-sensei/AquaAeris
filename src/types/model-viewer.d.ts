// Ambient declaration so TS accepts the <model-viewer> custom element in JSX
// Placed under src/ so it's picked up by tsconfig include: ["src", ...]
declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': any; // minimal typing to satisfy CI; attributes validated at runtime
  }
}


