import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageToggle() {
  const [which, setWhich] = useState(0);
  const images = ["img1.jpg", "img2.jpg"];

  return (
    <div
      style={{
        borderRadius: 18,
        padding: 12,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.05)",
        overflow: "hidden",
        minHeight: 320,
        position: "relative",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
        <div style={{ fontWeight: 700, opacity: 0.9 }}>Scene</div>
        <button onClick={() => setWhich((v) => (v === 0 ? 1 : 0))}>
          Toggle Image
        </button>
      </div>

      <div style={{ height: 14 }} />

      <div style={{ position: "relative", height: 260 }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={which}
            src={`${import.meta.env.BASE_URL}${images[which]}`}
            alt="toggle"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 14,
              position: "absolute",
              inset: 0,
              border: "1px solid rgba(255,255,255,0.10)",
            }}
            initial={{ opacity: 0, scale: 1.02, x: 18 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.99, x: -18 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
