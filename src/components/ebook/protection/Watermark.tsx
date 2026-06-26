'use client';

import { useEffect, useRef } from 'react';
import { useEbook } from '../providers/EbookContext';

/**
 * Canvas-based watermark overlay for gated ebook content.
 * Renders the user's email, hashed session ID, and timestamp
 * in a low-opacity diagonal repeating pattern.
 * Shifts position every 15 seconds to break screenshot stitching.
 */
export default function Watermark() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isUnlocked, userEmail, sessionId } = useEbook();

  useEffect(() => {
    if (!isUnlocked) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let offset = 0;
    let animationId: number;

    function draw() {
      if (!canvas || !ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      const watermarkText = `${userEmail || 'user'} | ${sessionId} | ${timeStr}`;

      ctx.save();
      ctx.globalAlpha = 0.035;
      ctx.font = '14px "Geist Mono", monospace';
      ctx.fillStyle = '#ffffff';

      const textWidth = ctx.measureText(watermarkText).width;
      const spacing = textWidth + 100;
      const lineHeight = 60;

      ctx.translate(offset, offset * 0.5);
      ctx.rotate(-0.35);

      for (let y = -canvas.height; y < canvas.height * 2; y += lineHeight) {
        for (let x = -canvas.width; x < canvas.width * 2; x += spacing) {
          ctx.fillText(watermarkText, x, y);
        }
      }

      ctx.restore();
    }

    draw();

    /* Shift watermark every 15 seconds */
    const shiftInterval = setInterval(() => {
      offset = (offset + 8) % 40;
      draw();
    }, 15000);

    /* Redraw on resize */
    const handleResize = () => {
      cancelAnimationFrame(animationId);
      animationId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      clearInterval(shiftInterval);
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isUnlocked, userEmail, sessionId]);

  if (!isUnlocked) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    />
  );
}
