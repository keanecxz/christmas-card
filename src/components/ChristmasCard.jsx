import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChristmasCard({ open, onClose }) {
  const message = "Dear Mabel, \n Merry Christmas! I'm so happy to be celebrating the best time of the year with you ❤️ I hope u like the snow and the little heart animations. One day we'll be in europe experiencing the real thing and when we kiss there will be hearts flying around too 🥰🥰🥰 \n I Love you so much, \n Keane";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (open) {
      setDisplayText("");
      let i = 0;
      const interval = setInterval(() => {
        setDisplayText(message.slice(0, i + 1));
        i++;
        if (i >= message.length) clearInterval(interval);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && open && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
          style={{
            zIndex: 1000,
            display: "grid",
            placeItems: "center",
            background: "rgba(0,0,0,0.8)",
            position: "fixed",
            inset: 0,
          }}
        >
          <motion.div
            onMouseDown={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            style={{
              position: "absolute",
              width: "min(700px, 90vw)",
              aspectRatio: "1/1.4",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundImage: `url('${import.meta.env.BASE_URL}big-card.png')`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              borderRadius: 20,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "32%",
                left: "12%",
                right: "12%",
                bottom: "10%",
                textAlign: "center",
                color: "#2c1810",
                fontSize: "clamp(16px, 3.2vw, 22px)",
                fontFamily: "'Georgia', serif",
                fontWeight: "bold",
                lineHeight: 1.5,
                whiteSpace: "pre-line",
                padding: "20px",
                overflowY: "auto",
                scrollbarWidth: "none",
              }}
            >
              {displayText}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                style={{ marginLeft: 2 }}
              >
                |
              </motion.span>
            </div>

            <button
              onClick={onClose}
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                background: "rgba(0,0,0,0.5)",
                border: "none",
                color: "white",
                borderRadius: "50%",
                width: 32,
                height: 32,
                cursor: "pointer",
                display: "grid",
                placeItems: "center",
                zIndex: 10,
              }}
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
