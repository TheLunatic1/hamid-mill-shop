// app/components/CustomCursor.tsx
"use client";

import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    // Skip on touch devices
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    // Main cursor element – smaller & brighter
    const cursor = document.createElement("div");
    cursor.className =
      "fixed pointer-events-none z-[999999] w-5 h-5 rounded-full bg-primary shadow-[0_0_35px_rgba(var(--p),1),0_0_15px_rgba(var(--p),0.7)] border-2 border-primary/90 backdrop-blur-sm transition-transform duration-150 -ml-[12px] -mt-[10px]";

    // Hover glow ring
    const ring = document.createElement("div");
    ring.className =
      "fixed pointer-events-none z-[999998] w-16 h-16 rounded-full border-2 border-primary/50 blur-md transition-all duration-200 opacity-0 -ml-[32px] -mt-[32px]";

    document.body.appendChild(cursor);
    document.body.appendChild(ring);

    // Hide default cursor everywhere
    document.body.style.cursor = "none";
    document.documentElement.style.cursor = "none";

    let currentModal: HTMLElement | null = null;

    const updatePosition = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      ring.style.left = `${e.clientX}px`;
      ring.style.top = `${e.clientY}px`;
    };

    const onClick = (e: MouseEvent) => {
      const ripple = document.createElement("div");
      ripple.className =
        "fixed pointer-events-none z-[999997] w-32 h-32 rounded-full border-2 border-primary/40 -translate-x-1/2 -translate-y-1/2 animate-ripple";
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;

      // Append to modal or body
      (currentModal || document.body).appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    };

    const onHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], .card, input, select, .hover-magnet')) {
        ring.style.opacity = "0.45";
        ring.style.transform = "translate(-50%, -50%) scale(1.5)";
        cursor.style.transform = "scale(1.7)";
      }
    };

    const onLeave = () => {
      ring.style.opacity = "0";
      ring.style.transform = "translate(-50%, -50%) scale(1)";
      cursor.style.transform = "scale(1)";
    };

    // Fix cursor visibility inside modals
    const syncCursorToModal = () => {
      const openModal = document.querySelector("dialog[open]");
      if (openModal && openModal !== currentModal) {
        currentModal = openModal;
        openModal.appendChild(cursor);
        openModal.appendChild(ring);
        cursor.style.zIndex = "9999999";
        ring.style.zIndex = "9999998";
        cursor.style.display = "block";
        ring.style.display = "block";
      } else if (!openModal && currentModal) {
        currentModal = null;
        document.body.appendChild(cursor);
        document.body.appendChild(ring);
      }
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("click", onClick);
    window.addEventListener("mouseover", onHover);
    window.addEventListener("mouseout", onLeave);

    // Trigger sync on modal open/close
    document.addEventListener("click", syncCursorToModal);
    document.addEventListener("mousemove", syncCursorToModal);

    // Initial sync
    syncCursorToModal();

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("click", onClick);
      window.removeEventListener("mouseover", onHover);
      window.removeEventListener("mouseout", onLeave);
      document.removeEventListener("click", syncCursorToModal);
      document.removeEventListener("mousemove", syncCursorToModal);
      document.body.style.cursor = "default";
      document.documentElement.style.cursor = "default";
      cursor.remove();
      ring.remove();
    };
  }, []);

  return null;
}