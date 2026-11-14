import React from "react"
import { motion } from "framer-motion"
import butterflyImg from "../../assets/butterfly-3d.webp"

/**
 * The hero's 3D butterfly. The render itself is a 3D asset; the motion sells
 * the depth: the wings rock around Y and X inside a perspective container
 * while the body floats, so it reads as a living insect rather than a flat
 * sticker. Interaction (pointer drift + click to spin) lives in <Interactive3D>,
 * which wraps this component — keeping the two transform channels separate.
 */
const Butterfly3D = ({ className = "", size = 260 }) => (
  <div
    className={`relative ${className}`}
    style={{ width: size, height: size, perspective: "900px" }}
    aria-hidden="true"
  >
    {/* Soft shadow that breathes with the flap */}
    <motion.div
      className="absolute left-1/2 top-[86%] h-4 w-24 -translate-x-1/2 rounded-[50%] bg-black/10 blur-md"
      animate={{ scaleX: [1, 0.78, 1], opacity: [0.55, 0.28, 0.55] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
    />

    <motion.div
      style={{ transformStyle: "preserve-3d" }}
      animate={{
        rotateY: [-26, 22, -26],
        rotateX: [5, -4, 5],
        rotateZ: [-4, 4, -4],
        y: [0, -16, 0],
      }}
      transition={{
        rotateY: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
        rotateX: { duration: 4.3, repeat: Infinity, ease: "easeInOut" },
        rotateZ: { duration: 5.6, repeat: Infinity, ease: "easeInOut" },
        y: { duration: 6.4, repeat: Infinity, ease: "easeInOut" },
      }}
      className="h-full w-full"
    >
      <img
        src={butterflyImg}
        alt=""
        width={size}
        height={size}
        className="h-full w-full object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.14)]"
        draggable="false"
      />
    </motion.div>
  </div>
)

export default Butterfly3D
