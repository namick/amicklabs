"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient oscilloscope trace. A slowly evolving Lissajous-ish waveform drawn
 * in amber phosphor with a fading persistence trail. Pauses under
 * prefers-reduced-motion and when the tab is hidden.
 */
export function Scope({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let t = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#0b0a08";
      ctx.fillRect(0, 0, w, h);
    };

    const draw = () => {
      // persistence: fade the previous frame rather than clearing it
      ctx.fillStyle = "rgba(11, 10, 8, 0.22)";
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const ax = w * 0.42;
      const ay = h * 0.34;
      const a = 3;
      const b = 2;
      const phase = t * 0.35;
      const wobble = 0.55 + 0.45 * Math.sin(t * 0.11);

      ctx.lineWidth = 1.25;
      ctx.lineCap = "round";
      ctx.shadowBlur = 14;
      ctx.shadowColor = "rgba(255, 176, 0, 0.55)";
      ctx.strokeStyle = "rgba(255, 176, 0, 0.9)";
      ctx.beginPath();
      const steps = 720;
      for (let i = 0; i <= steps; i++) {
        const u = (i / steps) * Math.PI * 2;
        const x = cx + ax * Math.sin(a * u + phase) * (0.85 + 0.15 * Math.sin(u * 7 + t));
        const y =
          cy +
          ay * Math.sin(b * u) * wobble +
          ay * 0.12 * Math.sin(u * 19 + t * 2.3);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;


      t += 0.012;
      raf = requestAnimationFrame(draw);
    };

    resize();
    if (reduce) {
      // draw a single static frame
      t = 1.7;
      draw();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }

    const onVis = () => {
      if (reduce) return;
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(draw);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
