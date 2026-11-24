export type RibbonSettings = {
  width: number;
  height: number;
  ratio: number;
  accent: string;
  primary: string;
  light: boolean;
  running: boolean;
};

const strands = 48;
const segments = 128;
const verticalSpread = 1.7;

// Shared by the worker and the single-frame compatibility fallback.
export function createRibbonRenderer(canvas: HTMLCanvasElement | OffscreenCanvas) {
  const context = canvas.getContext("2d") as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null;
  if (!context) return null;
  let seed = 72841;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const particles = Array.from({ length: 18000 }, (_, i) => {
    const strand = i % strands;
    const edge = Math.pow(1 - Math.abs(strand / (strands - 1) * 2 - 1), .55);
    return {
      position: random(), strand,
      scatter: (random() * 2 - 1) * .0012,
      size: (.7 + random() * .75) * 1.2,
      alpha: (.35 + random() * .6) * (.4 + edge * .6),
    };
  });
  const surface = new Float32Array(strands * (segments + 1));
  let settings: RibbonSettings;
  let gradient: CanvasGradient;

  function configure(next: RibbonSettings) {
    settings = next;
    const pixelWidth = Math.round(next.width * next.ratio);
    const pixelHeight = Math.round(next.height * next.ratio);
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
    }
    context!.setTransform(next.ratio, 0, 0, next.ratio, 0, 0);
    gradient = context!.createLinearGradient(0, 0, next.width, 0);
    gradient.addColorStop(0, next.accent);
    gradient.addColorStop(.3, next.accent);
    gradient.addColorStop(.5, "#94a3b8");
    gradient.addColorStop(.65, next.primary);
    gradient.addColorStop(1, "#94a3b8");
  }

  function draw(time: number) {
    if (!settings) return;
    const { width, height, light } = settings;
    context!.clearRect(0, 0, width, height);
    const phase = Math.sin(time * .19) * .08;
    // Compute the surface once, then interpolate all particles from this small grid.
    for (let step = 0; step <= segments; step++) {
      const x = step / segments * 1.2 - .1;
      const center = .57 + .29 * Math.cos(x * Math.PI * 1.28 + .08 + phase);
      const thickness = verticalSpread * (.065 + .045 * (1 + Math.sin(x * 7 + time * .21)) / 2);
      for (let strand = 0; strand < strands; strand++) {
        const depth = strand / (strands - 1) * 2 - 1;
        surface[strand * (segments + 1) + step] = center + depth * thickness
          + Math.sin(x * 11 + depth * 3 - time * .55) * .012;
      }
    }
    // Draw an alpha mask, then color it once. Applying a gradient to every tiny
    // particle forces thousands of expensive gradient raster operations.
    context!.strokeStyle = "#fff";
    context!.lineWidth = width < 760 ? .45 : .6;
    for (let strand = 0; strand < strands; strand++) {
      const edge = Math.pow(1 - Math.abs(strand / (strands - 1) * 2 - 1), .55);
      context!.globalAlpha = (.12 + edge * .16) * (light ? .85 : 1);
      context!.beginPath();
      for (let step = 0; step <= segments; step++) {
        const x = (step / segments * 1.2 - .1) * width;
        const y = surface[strand * (segments + 1) + step] * height;
        if (step === 0) context!.moveTo(x, y);
        else context!.lineTo(x, y);
      }
      context!.stroke();
    }
    context!.fillStyle = "#fff";
    const count = width < 760 ? 6500 : particles.length;
    const shimmer = (.88 + .12 * Math.sin(time * .6)) * (light ? .9 : 1);
    for (let i = 0; i < count; i++) {
      const point = particles[i];
      const u = (point.position + time * .009) % 1;
      const sample = u * segments;
      const index = Math.floor(sample);
      const offset = point.strand * (segments + 1) + index;
      const y = surface[offset] + (surface[offset + 1] - surface[offset]) * (sample - index);
      context!.globalAlpha = point.alpha * shimmer;
      context!.fillRect((u * 1.2 - .1) * width, (y + point.scatter) * height, point.size, point.size);
    }
    context!.globalAlpha = 1;
    context!.globalCompositeOperation = "source-in";
    context!.fillStyle = gradient;
    context!.fillRect(0, 0, width, height);
    context!.globalCompositeOperation = "source-over";
  }
  return { configure, draw };
}
