import { useEffect, useState } from "react";

/**
 * Efeito de "boot sequence": digita o texto informado e mantém
 * um cursor piscando ao final. Respeita prefers-reduced-motion.
 */
export default function TerminalLine({ text, speed = 28, startDelay = 0, className = "" }) {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const [output, setOutput] = useState(prefersReduced ? text : "");

  useEffect(() => {
    if (prefersReduced) return;
    let i = 0;
    let interval;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setOutput(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, startDelay, prefersReduced]);

  return (
    <span className={className}>
      {output}
      <span className="caret">&nbsp;</span>
    </span>
  );
}
