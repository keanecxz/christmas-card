import { motion } from "framer-motion";
import { useMemo } from "react";

const ICON_COUNT = 10;

export default function FloatingSf() {
    const icons = useMemo(() => {
        return Array.from({ length: ICON_COUNT }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 90}%`,
            duration: 5 + Math.random() * 5,
            delay: Math.random() * 2,
            size: 40 + Math.random() * 40,
        }));
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                pointerEvents: "none",
                zIndex: 999,
                overflow: "hidden",
            }}
        >
            {icons.map((icon) => (
                <motion.img
                    key={icon.id}
                    src="/sf.png"
                    alt="Floating Icon"
                    initial={{ opacity: 1, rotateY: 0 }}
                    animate={{
                        rotateY: 360,
                        y: [0, -20, 0],
                    }}
                    transition={{
                        duration: icon.duration,
                        repeat: Infinity,
                        delay: icon.delay,
                        ease: "linear",
                    }}
                    style={{
                        position: "absolute",
                        left: icon.left,
                        top: icon.top,
                        width: 100,
                        height: "auto",
                        filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))",
                    }}
                />
            ))}
        </div>
    );
}
