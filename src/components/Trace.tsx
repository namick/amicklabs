"use client";

import { useEffect, useRef } from "react";

/**
 * A flat amber trace — a scope with no signal. Pointer movement and scrolling
 * inject energy; the line ripples and settles back to flat. Stays still
 * otherwise, and always still under prefers-reduced-motion.
 */
export function Trace({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    let t = 0;
    let energy = 0; // 0 = flat
    let origin = 0.5; // where the disturbance is centred, 0..1
    let lastY = window.scrollY;
    let lastX = -1;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame();
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, w, h);
      const mid = h / 2;
      const amp = energy * h * 0.42;
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255, 176, 0, 0.85)";
      ctx.shadowBlur = energy > 0.02 ? 10 : 0;
      ctx.shadowColor = "rgba(255, 176, 0, 0.6)";
      ctx.beginPath();
      const steps = Math.max(120, Math.floor(w / 4));
      for (let i = 0; i <= steps; i++) {
        const u = i / steps;
        // bump envelope around origin so the ripple is local, not global
        const d = (u - origin) * 3.2;
        const env = Math.exp(-d * d);
        const y =
          mid +
          amp * env * Math.sin(u * 40 - t * 9) +
          amp * 0.35 * env * Math.sin(u * 17 + t * 4);
        if (i === 0) ctx.moveTo(u * w, y);
        else ctx.lineTo(u * w, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    const loop = () => {
      t += 0.016;
      energy *= 0.94;
      drawFrame();
      if (energy < 0.004) {
        energy = 0;
        running = false;
        drawFrame();
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const excite = (amount: number, at?: number) => {
      if (reduce) return;
      if (at !== undefined) origin = Math.min(1, Math.max(0, at));
      energy = Math.min(1, energy + amount);
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const dx = lastX < 0 ? 0 : Math.abs(x - lastX);
      lastX = x;
      excite(Math.min(0.25, dx * 2.5), x);
    };
    const onLeave = () => {
      lastX = -1;
    };
    const onScroll = () => {
      const dy = Math.abs(window.scrollY - lastY);
      lastY = window.scrollY;
      excite(Math.min(0.3, dy / 400));
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    const host = canvas.parentElement ?? canvas;
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
