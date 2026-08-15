import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef(null);
  const pos = useRef({ x: -600, y: -600 });
  const cur = useRef({ x: -600, y: -600 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    let raf;
    const tick = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.09;
      cur.current.y += (pos.current.y - cur.current.y) * 0.09;
      if (ref.current) {
        ref.current.style.left = `${cur.current.x}px`;
        ref.current.style.top = `${cur.current.y}px`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed z-0"
      style={{
        width: "700px",
        height: "700px",
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
        background:
          "radial-gradient(circle, rgba(94,234,212,0.16) 0%, rgba(94,234,212,0.06) 38%, transparent 70%)",
        filter: "blur(24px)",
      }}
    />
  );
}
