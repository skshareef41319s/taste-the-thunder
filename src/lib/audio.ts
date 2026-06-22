export type AudioCue =
  | "wind"
  | "thunder"
  | "pressure"
  | "burst"
  | "vortex"
  | "mountain"
  | "pour"
  | "refresh";

type AudioEngine = {
  enable: () => Promise<void>;
  disable: () => void;
  playCue: (cue: AudioCue) => void;
  isEnabled: () => boolean;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

function createNoiseBuffer(context: AudioContext) {
  const buffer = context.createBuffer(
    1,
    context.sampleRate * 2,
    context.sampleRate,
  );
  const output = buffer.getChannelData(0);

  for (let index = 0; index < output.length; index += 1) {
    output[index] = Math.random() * 2 - 1;
  }

  return buffer;
}

function playBurst(context: AudioContext, destination: AudioNode) {
  const noiseSource = context.createBufferSource();
  const noiseFilter = context.createBiquadFilter();
  const noiseGain = context.createGain();
  const noiseBuffer = createNoiseBuffer(context);

  noiseSource.buffer = noiseBuffer;
  noiseFilter.type = "bandpass";
  noiseFilter.frequency.value = 1300;
  noiseFilter.Q.value = 4.5;
  noiseGain.gain.setValueAtTime(0.001, context.currentTime);
  noiseGain.gain.exponentialRampToValueAtTime(0.45, context.currentTime + 0.02);
  noiseGain.gain.exponentialRampToValueAtTime(
    0.001,
    context.currentTime + 0.32,
  );

  noiseSource.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(destination);
  noiseSource.start();
  noiseSource.stop(context.currentTime + 0.4);
}

export function createAudioEngine(): AudioEngine {
  if (
    typeof window === "undefined" ||
    typeof window.AudioContext === "undefined"
  ) {
    return {
      enable: async () => undefined,
      disable: () => undefined,
      playCue: () => undefined,
      isEnabled: () => false,
    };
  }

  let context: AudioContext | null = null;
  let enabled = false;
  let ambienceNodes: Array<() => void> = [];

  const ensureContext = () => {
    if (!context) {
      context = new AudioContext();
    }

    return context;
  };

  const stopAmbience = () => {
    ambienceNodes.forEach((stop) => stop());
    ambienceNodes = [];
  };

  const startAmbience = async () => {
    const currentContext = ensureContext();
    await currentContext.resume();

    if (enabled) {
      return;
    }

    enabled = true;
    stopAmbience();

    const master = currentContext.createGain();
    master.gain.value = 0.05;
    master.connect(currentContext.destination);

    const rumble = currentContext.createOscillator();
    const rumbleGain = currentContext.createGain();
    rumble.type = "sine";
    rumble.frequency.value = 34;
    rumbleGain.gain.value = 0.12;
    rumble.connect(rumbleGain);
    rumbleGain.connect(master);
    rumble.start();

    const shimmer = currentContext.createOscillator();
    const shimmerFilter = currentContext.createBiquadFilter();
    const shimmerGain = currentContext.createGain();
    shimmer.type = "triangle";
    shimmer.frequency.value = 68;
    shimmerFilter.type = "lowpass";
    shimmerFilter.frequency.value = 280;
    shimmerGain.gain.value = 0.04;
    shimmer.connect(shimmerFilter);
    shimmerFilter.connect(shimmerGain);
    shimmerGain.connect(master);
    shimmer.start();

    const noiseSource = currentContext.createBufferSource();
    const noiseFilter = currentContext.createBiquadFilter();
    const noiseGain = currentContext.createGain();
    noiseSource.buffer = createNoiseBuffer(currentContext);
    noiseSource.loop = true;
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 160;
    noiseFilter.Q.value = 0.8;
    noiseGain.gain.value = 0.03;
    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(master);
    noiseSource.start();

    ambienceNodes = [
      () => rumble.stop(),
      () => shimmer.stop(),
      () => noiseSource.stop(),
      () => master.disconnect(),
    ];
  };

  const playCue = (cue: AudioCue) => {
    if (!context || !enabled) {
      return;
    }

    const currentContext = context;
    const master = currentContext.createGain();
    master.gain.value = 0.14;
    master.connect(currentContext.destination);

    if (cue === "thunder") {
      const carrier = currentContext.createOscillator();
      const sub = currentContext.createOscillator();
      const carrierGain = currentContext.createGain();
      const subGain = currentContext.createGain();
      carrier.type = "sine";
      sub.type = "triangle";
      carrier.frequency.setValueAtTime(210, currentContext.currentTime);
      carrier.frequency.exponentialRampToValueAtTime(
        42,
        currentContext.currentTime + 0.35,
      );
      sub.frequency.setValueAtTime(65, currentContext.currentTime);
      sub.frequency.exponentialRampToValueAtTime(
        21,
        currentContext.currentTime + 0.45,
      );
      carrierGain.gain.setValueAtTime(0.001, currentContext.currentTime);
      carrierGain.gain.exponentialRampToValueAtTime(
        0.35,
        currentContext.currentTime + 0.01,
      );
      carrierGain.gain.exponentialRampToValueAtTime(
        0.001,
        currentContext.currentTime + 0.46,
      );
      subGain.gain.setValueAtTime(0.001, currentContext.currentTime);
      subGain.gain.exponentialRampToValueAtTime(
        0.26,
        currentContext.currentTime + 0.015,
      );
      subGain.gain.exponentialRampToValueAtTime(
        0.001,
        currentContext.currentTime + 0.5,
      );
      carrier.connect(carrierGain);
      sub.connect(subGain);
      carrierGain.connect(master);
      subGain.connect(master);
      carrier.start();
      sub.start();
      carrier.stop(currentContext.currentTime + 0.55);
      sub.stop(currentContext.currentTime + 0.6);
      playBurst(currentContext, master);
      return;
    }

    const oscillator = currentContext.createOscillator();
    const gain = currentContext.createGain();
    oscillator.type =
      cue === "pressure" ? "sine" : cue === "refresh" ? "triangle" : "sawtooth";
    oscillator.frequency.value =
      cue === "pressure"
        ? 94
        : cue === "burst"
          ? 720
          : cue === "pour"
            ? 180
            : cue === "vortex"
              ? 128
              : cue === "mountain"
                ? 76
                : cue === "refresh"
                  ? 240
                  : 145;
    gain.gain.setValueAtTime(0.001, currentContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      clamp(cue === "burst" ? 0.3 : 0.14, 0.05, 0.3),
      currentContext.currentTime + 0.01,
    );
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      currentContext.currentTime + (cue === "burst" ? 0.2 : 0.45),
    );
    oscillator.connect(gain);
    gain.connect(master);
    oscillator.start();
    oscillator.stop(
      currentContext.currentTime + (cue === "burst" ? 0.24 : 0.5),
    );

    if (cue === "pour" || cue === "refresh" || cue === "wind") {
      playBurst(currentContext, master);
    }
  };

  return {
    enable: startAmbience,
    disable: () => {
      enabled = false;
      stopAmbience();
      if (context) {
        context.suspend();
      }
    },
    playCue,
    isEnabled: () => enabled,
  };
}
