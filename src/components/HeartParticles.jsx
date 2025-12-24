import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeartParticles({ clicks }) {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        if (clicks.length === 0) return;

        const count = 12; // Number of hearts per click
        const newParticles = [];

        const lastClick = clicks[clicks.length - 1];

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = 40 + Math.random() * 100;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            newParticles.push({
                id: Math.random(),
                startX: lastClick.x,
                startY: lastClick.y,
                destX: lastClick.x + x,
                destY: lastClick.y + y,
                rotate: Math.random() * 360,
                scale: 0.5 + Math.random() * 1,
            });
        }

        setParticles((prev) => [...prev, ...newParticles]);

        // Cleanup particles after animation
        const timeout = setTimeout(() => {
            setParticles((prev) => prev.filter(p => !newParticles.find(np => np.id === p.id)));
        }, 1500);

        return () => clearTimeout(timeout);
    }, [clicks]);

    return (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 100 }}>
            <AnimatePresence>
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        initial={{
                            opacity: 1,
                            scale: 0,
                            x: p.startX,
                            y: p.startY
                        }}
                        animate={{
                            opacity: 0,
                            scale: p.scale,
                            x: p.destX,
                            y: p.destY,
                            rotate: p.rotate
                        }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        style={{
                            position: "absolute",
                            fontSize: "24px",
                            color: "#ff4d4d",
                            textShadow: "0 0 10px rgba(255, 77, 77, 0.5)"
                        }}
                    >
                        ❤️
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
