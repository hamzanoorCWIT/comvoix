import { createRibbonRenderer, type RibbonSettings } from "./particle-wave-renderer";

type Message = { type: "init"; canvas: OffscreenCanvas } | { type: "update"; settings: RibbonSettings };
let renderer: ReturnType<typeof createRibbonRenderer>;
let timer: ReturnType<typeof setTimeout> | undefined;
let elapsed = 0;
let previous = 0;

function tick() {
  const now = performance.now();
  elapsed += previous ? Math.min((now - previous) / 1000, .1) : 0;
  previous = now;
  renderer?.draw(elapsed);
  // Bound background CPU usage even on slower devices; never queue missed frames.
  timer = setTimeout(tick, Math.max(16, 1000 / 24 - (performance.now() - now)));
}

self.onmessage = (event: MessageEvent<Message>) => {
  if (event.data.type === "init") {
    renderer = createRibbonRenderer(event.data.canvas);
    if (!renderer) throw new Error("Particle canvas context unavailable");
    return;
  }
  clearTimeout(timer);
  previous = 0;
  renderer?.configure(event.data.settings);
  if (event.data.settings.running) tick();
  else renderer?.draw(elapsed);
};
