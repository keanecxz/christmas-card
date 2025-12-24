import { useEffect, useRef, useState } from "react";

export function useAudio(src) {
  const audioRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const a = new Audio(src);
    a.loop = true;
    a.preload = "auto";
    a.volume = 0.75;
    audioRef.current = a;

    const onCanPlay = () => setIsReady(true);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    a.addEventListener("canplaythrough", onCanPlay);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);

    return () => {
      a.pause();
      a.removeEventListener("canplaythrough", onCanPlay);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      audioRef.current = null;
    };
  }, [src]);

  const start = async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
    } catch {
      // autoplay blocked until a user gesture; button click should fix it
    }
  };

  const toggle = async () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      await start();
    } else {
      audioRef.current.pause();
    }
  };

  return { isReady, isPlaying, start, toggle };
}
