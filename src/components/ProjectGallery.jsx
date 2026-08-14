import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
  enter: (dir) => ({ x: dir > 0 ? "60%" : "-60%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? "-60%" : "60%", opacity: 0 }),
};

export default function ProjectGallery({ screenshots = [], tag = "" }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  if (!screenshots.length) return null;

  const go = (to) => {
    setDirection(to > index ? 1 : -1);
    setIndex(to);
  };

  const goPrev = () => go((index - 1 + screenshots.length) % screenshots.length);
  const goNext = () => go((index + 1) % screenshots.length);

  const item = screenshots[index] ?? {};
  const src = item.src ?? null;
  const caption = item.caption ?? "";

  return (
    <div className="mt-10">
      {/* Image — sem setas sobrepostas */}
      <div
        className="relative overflow-hidden border border-line bg-surface"
        style={{ aspectRatio: "16 / 9" }}
      >
        <span className="absolute right-3 top-3 z-10 font-mono text-[10px] tracking-widest text-line">
          {String(index + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(screenshots.length).padStart(2, "0")}
        </span>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {src ? (
              <img
                src={src}
                alt={`${tag} · SCR.${String(index + 1).padStart(2, "0")}`}
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="hud-grid flex h-full flex-col items-center justify-center gap-2">
                <span className="font-mono text-xs uppercase tracking-widest text-line">
                  {tag} · SCR.{String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[10px] text-line/50">imagem pendente</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controles abaixo da imagem */}
      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={goPrev}
          aria-label="Screenshot anterior"
          className="shrink-0 border border-line px-4 py-2 font-mono text-sm text-muted transition-colors hover:border-signal hover:text-signal"
        >
          ←
        </button>

        <div className="flex flex-1 gap-1.5">
          {screenshots.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Screenshot ${i + 1}`}
              className={`h-0.5 flex-1 transition-colors ${
                i === index ? "bg-signal" : "bg-line hover:bg-muted"
              }`}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          aria-label="Próxima screenshot"
          className="shrink-0 border border-line px-4 py-2 font-mono text-sm text-muted transition-colors hover:border-signal hover:text-signal"
        >
          →
        </button>
      </div>

      {/* Legenda da tela */}
      {caption && (
        <p className="mt-4 border-l-2 border-signal/30 pl-4 font-mono text-xs leading-relaxed text-muted">
          {caption}
        </p>
      )}
    </div>
  );
}
