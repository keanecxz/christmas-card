import { useLayoutEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";

import SnowCanvas from "./components/SnowCanvas.jsx";
import ChristmasCard from "./components/ChristmasCard.jsx";
import HeartParticles from "./components/HeartParticles.jsx";
import { useAudio } from "./components/useAudio.js";
import FloatingSf from "./components/FloatingSf.jsx";

export default function App() {
  const [cardOpen, setCardOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);
  const [clicks, setClicks] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { isReady, isPlaying, start, toggle } = useAudio(`${import.meta.env.BASE_URL}music.mp3`);

  const panelRef = useRef(null);
  const containerRef = useRef(null);
  const images = ["/img1.jpg", "/img2.jpg"];

  // GSAP intro timeline
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "elastic.out(1, 0.8)" }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleImageClick = (e) => {
    // Record click for hearts
    const newClick = { x: e.clientX, y: e.clientY, id: Date.now() };
    setClicks((prev) => [...prev, newClick]);

    // Toggle image
    setCurrentImg((v) => (v === 0 ? 1 : 0));
  };

  useLayoutEffect(() => {
    const handleGlobalMouseMove = (e) => {
      setMousePos({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, []);

  return (
    <div className="app">
      <div className="bg" />
      <SnowCanvas intensity={170} />
      <FloatingSf />
      <HeartParticles clicks={clicks} />

      <div className="content">
        {/* Oscillating Mt */}
        <motion.img
          src={`${import.meta.env.BASE_URL}mt.png`}
          alt="Mt"
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: "1%",
            left: "50%",
            translateX: "-50%",
            width: 300,
            zIndex: 5,
            pointerEvents: "none",
          }}
        />

        <div ref={panelRef} className="main-layer">
          {/* Image Container */}
          <div
            ref={containerRef}
            className="image-container"
            onClick={handleImageClick}
          >
            <img
              src={`${import.meta.env.BASE_URL}${images[currentImg]}`}
              alt="Christmas Scene"
              className="main-image"
            />
          </div>

          {!isReady && (
            <div className="loading-hint">Loading magic...</div>
          )}
        </div>
      </div>

      {/* Overlay Buttons - Now global and fixed */}
      <motion.div
        className="icon-buttons"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
        }}
        transition={{
          type: "spring",
          damping: 100,
          stiffness: 120,
          mass: 0.5
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "auto",
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 100,
        }}
      >
        <motion.img
          src={`${import.meta.env.BASE_URL}santa.png`}
          alt="Play Music"
          className={`icon-btn ${isPlaying ? 'playing' : ''}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={async (e) => {
            e.stopPropagation();
            if (!isPlaying) await start();
            else await toggle();
          }}
        />
        <motion.img
          src={`${import.meta.env.BASE_URL}card.png`}
          alt="Open Card"
          className="icon-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            setCardOpen(true);
          }}
        />
      </motion.div>

      <ChristmasCard open={cardOpen} onClose={() => setCardOpen(false)} />
    </div>
  );
}
