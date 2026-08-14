import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

export default function TiltCard({ children, intensity = 12 }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-intensity, intensity]);
  const scale = useMotionValue(1);

  const springRotX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotY = useSpring(rotateY, { stiffness: 200, damping: 20 });
  const springScale = useSpring(scale, { stiffness: 200, damping: 20 });

  return (
    <div style={{ perspective: "1000px" }}>
      <motion.div
        style={{ rotateX: springRotX, rotateY: springRotY, scale: springScale }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          x.set((e.clientX - r.left) / r.width - 0.5);
          y.set((e.clientY - r.top) / r.height - 0.5);
          scale.set(1.03);
        }}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
          scale.set(1);
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
