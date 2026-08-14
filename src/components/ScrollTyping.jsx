import { useEffect, useRef, useState } from "react";

export default function ScrollTyping({ text, speed = 30, className = "" }) {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const [output, setOutput] = useState(prefersReduced ? text : "");

  useEffect(() => {
    if (prefersReduced) return;
    const target = ref.current?.parentElement ?? ref.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [prefersReduced]);

  useEffect(() => {
    if (!started || prefersReduced) return;
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setOutput(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed, prefersReduced]);

  return (
    <span ref={ref} className={className}>
      {output}
      {started && <span className="caret">&nbsp;</span>}
    </span>
  );
}
