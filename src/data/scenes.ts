export type SceneAudioCue =
  | "wind"
  | "thunder"
  | "pressure"
  | "burst"
  | "vortex"
  | "mountain"
  | "pour"
  | "refresh";

export interface Scene {
  id: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  body: string;
  source: string;
  accent: string;
  glow: string;
  tone: string;
  objectPosition: string;
  parallax: number;
  audioCue: SceneAudioCue;
}

const videoSource = "/thums-up-cinematic.mp4";

export const scenes: Scene[] = [
  {
    id: "home",
    navLabel: "Home",
    eyebrow: "Hero Reveal",
    title: "Taste The Thunder",
    subtitle: "A cinematic bottle reveal built like a luxury product launch.",
    body: "Lightning cuts through mist as the bottle emerges from the dark like a headline moment.",
    source: videoSource,
    accent: "from-thunder-400/80 via-thunder-300/20 to-transparent",
    glow: "rgba(84,151,255,0.52)",
    tone: "hero",
    objectPosition: "50% 48%",
    parallax: 0.08,
    audioCue: "wind",
  },
  {
    id: "experience",
    navLabel: "Experience",
    eyebrow: "Energy Awakens",
    title: "Energy Builds",
    subtitle: "The camera pushes in as pressure gathers under the surface.",
    body: "Electric blue edges intensify while the bottle feels closer, heavier, and more charged.",
    source: videoSource,
    accent: "from-cyan-400/80 via-blue-400/20 to-transparent",
    glow: "rgba(101,182,255,0.54)",
    tone: "awakening",
    objectPosition: "50% 42%",
    parallax: 0.12,
    audioCue: "pressure",
  },
  {
    id: "story",
    navLabel: "Story",
    eyebrow: "Pressure Rising",
    title: "Feel The Pressure",
    subtitle:
      "The cap and bottle neck become the visual focus as the build reaches its limit.",
    body: "Tension lives in the frame: shadow, metallic highlight, and a controlled sense of force.",
    source: videoSource,
    accent: "from-sky-400/80 via-thunder-500/20 to-transparent",
    glow: "rgba(116,180,255,0.6)",
    tone: "pressure",
    objectPosition: "50% 39%",
    parallax: 0.16,
    audioCue: "pressure",
  },
  {
    id: "product",
    navLabel: "Product",
    eyebrow: "Cap Explosion",
    title: "Unleash The Thunder",
    subtitle: "The first full power moment lands like a trailer drop.",
    body: "A lightning burst and screen shake turn the opening into a dramatic reveal.",
    source: videoSource,
    accent: "from-white/70 via-blue-300/20 to-transparent",
    glow: "rgba(210,233,255,0.7)",
    tone: "burst",
    objectPosition: "50% 36%",
    parallax: 0.2,
    audioCue: "burst",
  },
  {
    id: "vortex",
    navLabel: "Vortex",
    eyebrow: "Thunder Vortex",
    title: "Ride The Storm",
    subtitle: "The bottle drifts through a spiral of storm energy and depth.",
    body: "Rotating motion, floating debris, and layered haze create a sense of velocity.",
    source: videoSource,
    accent: "from-blue-500/80 via-cyan-300/20 to-transparent",
    glow: "rgba(63,159,255,0.5)",
    tone: "vortex",
    objectPosition: "50% 50%",
    parallax: 0.14,
    audioCue: "vortex",
  },
  {
    id: "mountain",
    navLabel: "Story Peak",
    eyebrow: "Mountain Of Thunder",
    title: "Power Beyond Limits",
    subtitle: "The storm scales into a broader, more epic landscape.",
    body: "Atmospheric layers and cold fog make the scene feel immense and untouchable.",
    source: videoSource,
    accent: "from-white/40 via-blue-500/20 to-transparent",
    glow: "rgba(171,214,255,0.45)",
    tone: "mountain",
    objectPosition: "50% 45%",
    parallax: 0.1,
    audioCue: "mountain",
  },
  {
    id: "pour",
    navLabel: "Pour",
    eyebrow: "Perfect Pour",
    title: "Crafted For The Bold",
    subtitle: "The liquid becomes the hero as light traces the surface.",
    body: "The pour feels precise, glossy, and tactile with premium reflection cues.",
    source: videoSource,
    accent: "from-cyan-300/70 via-sky-300/20 to-transparent",
    glow: "rgba(121,216,255,0.54)",
    tone: "pour",
    objectPosition: "50% 47%",
    parallax: 0.11,
    audioCue: "pour",
  },
  {
    id: "refreshment",
    navLabel: "Refreshment",
    eyebrow: "Cold Release",
    title: "Feel The Refreshment",
    subtitle:
      "The tone softens, but the energy stays alive in the mist and bubbles.",
    body: "Cold vapor and bright micro-particles cool the frame without killing the adrenaline.",
    source: videoSource,
    accent: "from-slate-200/60 via-blue-300/20 to-transparent",
    glow: "rgba(220,240,255,0.52)",
    tone: "refresh",
    objectPosition: "50% 43%",
    parallax: 0.09,
    audioCue: "refresh",
  },
  {
    id: "final",
    navLabel: "Final Hero",
    eyebrow: "Grand Finale",
    title: "Taste The Thunder",
    subtitle: "Not Just A Drink. An Attitude.",
    body: "The camera settles on the hero bottle as lightning and reflection resolve into a final signature.",
    source: videoSource,
    accent: "from-white/80 via-thunder-300/25 to-transparent",
    glow: "rgba(255,255,255,0.78)",
    tone: "final",
    objectPosition: "50% 44%",
    parallax: 0.06,
    audioCue: "thunder",
  },
];
