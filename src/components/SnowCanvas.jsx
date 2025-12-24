import { useEffect, useRef } from "react";

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

export default function SnowCanvas({ intensity = 140 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const flakesRef = useRef([]);
  const sizeRef = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });

    const resize = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const w = window.innerWidth;
      const h = window.innerHeight;

      sizeRef.current = { w, h };
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      const { w, h } = sizeRef.current;
      flakesRef.current = Array.from({ length: intensity }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        r: rand(0.8, 3.2),
        vy: rand(0.6, 2.2),
        vx: rand(-0.35, 0.35),
        drift: rand(0, Math.PI * 2),
        opacity: rand(0.25, 0.9),
      }));
    };

    const step = (t) => {
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);

      const flakes = flakesRef.current;

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        // gentle side-to-side wobble
        f.drift += 0.008;
        f.x += f.vx + Math.sin(f.drift) * 0.25;
        f.y += f.vy;

        // wrap
        if (f.y > h + 10) {
          f.y = -10;
          f.x = rand(0, w);
        }
        if (f.x < -20) f.x = w + 20;
        if (f.x > w + 20) f.x = -20;

        ctx.beginPath();
        ctx.globalAlpha = f.opacity;
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      rafRef.current = requestAnimationFrame(step);
    };

    resize();
    init();
    rafRef.current = requestAnimationFrame(step);

    window.addEventListener("resize", () => {
      resize();
      init();
    });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}
