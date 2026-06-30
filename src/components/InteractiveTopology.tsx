'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulse: number;
  pulseDir: number;
}

interface Wave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  active: boolean;
}

export default function InteractiveTopology() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize nodes
    const nodeCount = 18;
    const nodes: Node[] = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1.5,
      pulse: Math.random() * 4,
      pulseDir: Math.random() > 0.5 ? 0.05 : -0.05,
    }));

    // Shockwaves on click
    let waves: Wave[] = [];

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      waves.push({
        x: clickX,
        y: clickY,
        radius: 0,
        maxRadius: 180,
        active: true,
      });
    };

    canvas.addEventListener('click', handleCanvasClick);

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Styles based on theme
      const isDark = theme === 'dark';
      const nodeColor = isDark ? 'rgba(245, 245, 245, 0.8)' : 'rgba(27, 28, 28, 0.8)';
      const lineColor = isDark ? 'rgba(245, 245, 245, 0.08)' : 'rgba(27, 28, 28, 0.08)';
      const activeLineColor = isDark ? 'rgba(245, 245, 245, 0.4)' : 'rgba(27, 28, 28, 0.4)';
      const waveColor = isDark ? 'rgba(245, 245, 245, 0.15)' : 'rgba(27, 28, 28, 0.15)';

      // Update and draw waves
      waves = waves.filter((w) => w.active);
      waves.forEach((w) => {
        w.radius += 3;
        if (w.radius >= w.maxRadius) {
          w.active = false;
        } else {
          ctx.beginPath();
          ctx.arc(w.x, w.y, w.radius, 0, Math.PI * 2);
          ctx.strokeStyle = waveColor;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Update nodes positions
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Boundaries check
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Pulse logic
        node.pulse += node.pulseDir;
        if (node.pulse > 6 || node.pulse < 2) {
          node.pulseDir *= -1;
        }
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);

            // Highlight connections touched by waves
            let isHighlighted = false;
            waves.forEach((w) => {
              const node1Dist = Math.sqrt(Math.pow(nodes[i].x - w.x, 2) + Math.pow(nodes[i].y - w.y, 2));
              if (Math.abs(node1Dist - w.radius) < 15) {
                isHighlighted = true;
              }
            });

            ctx.strokeStyle = isHighlighted ? activeLineColor : lineColor;
            ctx.lineWidth = isHighlighted ? 1.5 : 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        // Subtle glow or ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + node.pulse, 0, Math.PI * 2);
        ctx.strokeStyle = isDark ? 'rgba(245, 245, 245, 0.15)' : 'rgba(27, 28, 28, 0.15)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, [theme]);

  return (
    <div className="absolute inset-0 w-full h-full cursor-crosshair">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute bottom-4 left-4 pointer-events-none select-none">
        <span className="font-label-caps text-[9px] bg-background border border-outline-variant/30 text-secondary px-2 py-[3px] uppercase tracking-wider">
          Click Canvas to Send Signal Shockwaves
        </span>
      </div>
    </div>
  );
}
