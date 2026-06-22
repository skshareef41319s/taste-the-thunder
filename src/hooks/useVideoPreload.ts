import { useEffect, useState } from "react";

export function useVideoPreload(source: string) {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let disposed = false;
    const video = document.createElement("video");

    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;
    video.src = source;

    const updateProgress = () => {
      if (!video.duration || !video.buffered.length) {
        return;
      }

      const bufferedEnd = video.buffered.end(video.buffered.length - 1);
      const ratio = Math.min(1, bufferedEnd / video.duration);

      if (!disposed) {
        setProgress(ratio);
      }
    };

    const markReady = () => {
      if (disposed) {
        return;
      }

      setProgress(1);
      setReady(true);
    };

    video.addEventListener("progress", updateProgress);
    video.addEventListener("loadedmetadata", updateProgress);
    video.addEventListener("loadeddata", markReady, { once: true });
    video.addEventListener("canplaythrough", markReady, { once: true });
    video.addEventListener("error", () => {
      if (!disposed) {
        setReady(true);
        setProgress(1);
      }
    });

    video.load();

    return () => {
      disposed = true;
      video.removeEventListener("progress", updateProgress);
      video.removeEventListener("loadedmetadata", updateProgress);
    };
  }, [source]);

  return { progress, ready };
}
