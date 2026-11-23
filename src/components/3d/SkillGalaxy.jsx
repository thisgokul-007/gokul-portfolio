import React, { useEffect, useRef, useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { sound } from '../../utils/audio';
import { Sparkles, Layers, Info, Filter } from 'lucide-react';

export default function SkillGalaxy({ selectedCategory, onSelectCategory }) {
  const canvasRef = useRef(null);
  const [activeNode, setActiveNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  // Flatten skills with category metadata
  const allNodes = React.useMemo(() => {
    const list = [];
    portfolioData.skills.categories.forEach((cat, cIdx) => {
      cat.skills.forEach((skill, sIdx) => {
        list.push({
          id: `${cat.id}-${sIdx}`,
          name: skill.name,
          category: cat.name,
          categoryId: cat.id,
          color: cat.color,
          level: skill.level,
          desc: skill.desc,
          cIdx,
          sIdx
        });
      });
    });
    return list;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight || 520);

    // Generate 3D sphere/torus distributed coordinates
    const nodes = allNodes.map((item, idx) => {
      // Golden ratio spiral distribution on a 3D sphere
      const phi = Math.acos(-1 + (2 * idx) / allNodes.length);
      const theta = Math.sqrt(allNodes.length * Math.PI) * phi;
      const radius = Math.min(width, height) * 0.36;

      return {
        ...item,
        x3d: radius * Math.cos(theta) * Math.sin(phi),
        y3d: radius * Math.sin(theta) * Math.sin(phi),
        z3d: radius * Math.cos(phi),
        x2d: 0,
        y2d: 0,
        scale: 1,
        alpha: 1,
        radius: 18
      };
    });

    let angleX = 0.002;
    let angleY = 0.003;
    let mouseX = 0;
    let mouseY = 0;
    let isMouseDown = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 520;
    };

    window.addEventListener('resize', handleResize);

    const onMouseDown = (e) => {
      isMouseDown = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      if (isMouseDown) {
        const deltaX = e.clientX - lastMouseX;
        const deltaY = e.clientY - lastMouseY;
        angleY = deltaX * 0.004;
        angleX = -deltaY * 0.004;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      } else {
        // Find hovered node
        let found = null;
        for (let i = nodes.length - 1; i >= 0; i--) {
          const n = nodes[i];
          const dist = Math.hypot(n.x2d - currentX, n.y2d - currentY);
          if (dist < (n.radius * n.scale) + 8) {
            found = n;
            break;
          }
        }
        if (found !== hoveredNode) {
          if (found) sound.playHover();
          setHoveredNode(found);
        }
      }
    };

    const onMouseUp = () => {
      isMouseDown = false;
    };

    const onClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i];
        const dist = Math.hypot(n.x2d - clickX, n.y2d - clickY);
        if (dist < (n.radius * n.scale) + 8) {
          sound.playClick();
          setActiveNode(n);
          return;
        }
      }
      setActiveNode(null);
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('click', onClick);

    // Touch support for mobile
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isMouseDown = true;
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e) => {
      if (e.touches.length === 1 && isMouseDown) {
        const deltaX = e.touches[0].clientX - lastMouseX;
        const deltaY = e.touches[0].clientY - lastMouseY;
        angleY = deltaX * 0.005;
        angleX = -deltaY * 0.005;
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
      }
    };

    const onTouchEnd = () => {
      isMouseDown = false;
    };

    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Rotation matrices
    const rotateX = (node, angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const y = node.y3d * cos - node.z3d * sin;
      const z = node.z3d * cos + node.y3d * sin;
      node.y3d = y;
      node.z3d = z;
    };

    const rotateY = (node, angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const x = node.x3d * cos + node.z3d * sin;
      const z = node.z3d * cos - node.x3d * sin;
      node.x3d = x;
      node.z3d = z;
    };

    // Render loop
    const fov = 340;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Dampen rotation when not dragging
      if (!isMouseDown) {
        angleX *= 0.96;
        angleY *= 0.96;
        if (Math.abs(angleX) < 0.001) angleX = 0.0012;
        if (Math.abs(angleY) < 0.001) angleY = 0.0018;
      }

      // Project 3D nodes
      nodes.forEach((node) => {
        rotateX(node, angleX);
        rotateY(node, angleY);

        const perspective = fov / (fov + node.z3d);
        node.x2d = width / 2 + node.x3d * perspective;
        node.y2d = height / 2 + node.y3d * perspective;
        node.scale = Math.max(0.5, perspective);
        node.alpha = Math.max(0.2, (node.z3d + 200) / 400);

        // Highlight matching filter category
        const isMatched = !selectedCategory || selectedCategory === 'all' || node.categoryId === selectedCategory;
        if (!isMatched) {
          node.alpha *= 0.25;
        }
      });

      // Sort by depth (back to front)
      nodes.sort((a, b) => a.z3d - b.z3d);

      // 1. Draw glowing constellation synaptic connection lines
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];

          // Connect if same category or close in 3D distance
          const isSameCat = a.categoryId === b.categoryId;
          const dist3D = Math.hypot(a.x3d - b.x3d, a.y3d - b.y3d, a.z3d - b.z3d);

          if ((isSameCat && dist3D < 190) || dist3D < 90) {
            const lineAlpha = (1 - dist3D / (isSameCat ? 190 : 90)) * Math.min(a.alpha, b.alpha) * 0.35;
            if (lineAlpha > 0.02) {
              ctx.strokeStyle = isSameCat ? a.color : 'rgba(255, 255, 255, 0.15)';
              ctx.globalAlpha = lineAlpha;
              ctx.beginPath();
              ctx.moveTo(a.x2d, a.y2d);
              ctx.lineTo(b.x2d, b.y2d);
              ctx.stroke();
            }
          }
        }
      }

      // 2. Draw Nodes
      nodes.forEach((node) => {
        const isHovered = (hoveredNode && hoveredNode.id === node.id) || (activeNode && activeNode.id === node.id);
        const nodeRadius = (isHovered ? 26 : node.radius) * node.scale;

        ctx.globalAlpha = isHovered ? 1.0 : node.alpha;

        // Outer glow
        const gradient = ctx.createRadialGradient(
          node.x2d,
          node.y2d,
          nodeRadius * 0.2,
          node.x2d,
          node.y2d,
          nodeRadius * 2.2
        );
        gradient.addColorStop(0, node.color);
        gradient.addColorStop(0.4, `${node.color}44`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x2d, node.y2d, nodeRadius * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Node core circle
        ctx.fillStyle = isHovered ? '#FFFFFF' : '#151923';
        ctx.strokeStyle = node.color;
        ctx.lineWidth = isHovered ? 3 : 1.5;
        ctx.beginPath();
        ctx.arc(node.x2d, node.y2d, nodeRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Node label
        const fontSize = Math.round(Math.max(9, 12 * node.scale));
        ctx.font = `${isHovered ? '600' : '500'} ${fontSize}px 'Space Grotesk', sans-serif`;
        ctx.fillStyle = isHovered ? '#56C8FF' : '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.name, node.x2d, node.y2d + nodeRadius + fontSize + 2);
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('click', onClick);
      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [allNodes, selectedCategory, hoveredNode, activeNode]);

  const targetNode = activeNode || hoveredNode;

  return (
    <div className="relative w-full h-[520px] sm:h-[600px] glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col">
      {/* Top Header / HUD */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 font-mono text-xs text-[#56C8FF]">
          <Sparkles className="w-3.5 h-3.5 text-[#56C8FF]" />
          <span>3D SKILL CONSTELLATION // {allNodes.length} NODES</span>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          <span className="text-[11px] font-mono text-white/50 hidden md:inline">
            Rotate with cursor • Click node to pin details
          </span>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="relative flex-1 w-full h-full cursor-grab active:cursor-grabbing">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Active / Hovered Skill Card Overlay */}
      {targetNode && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-30 p-4 rounded-xl bg-[#080A10]/90 backdrop-blur-xl border border-white/20 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full animate-pulse"
                  style={{ backgroundColor: targetNode.color }}
                />
                <span className="font-mono text-[10px] tracking-wider uppercase text-white/60">
                  {targetNode.category}
                </span>
              </div>
              <h4 className="text-lg font-bold text-white mt-1 flex items-center gap-2">
                {targetNode.name}
                <span
                  className="text-xs px-2 py-0.5 rounded-md font-mono font-normal border"
                  style={{
                    color: targetNode.color,
                    borderColor: `${targetNode.color}40`,
                    backgroundColor: `${targetNode.color}15`
                  }}
                >
                  {targetNode.level}
                </span>
              </h4>
            </div>
            {activeNode && (
              <button
                onClick={() => setActiveNode(null)}
                className="text-xs text-white/40 hover:text-white p-1"
                aria-label="Close"
              >
                ✕
              </button>
            )}
          </div>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            {targetNode.desc}
          </p>
        </div>
      )}

      {/* Bottom Category Legend */}
      <div className="relative z-10 px-4 py-3 bg-black/40 backdrop-blur-md border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
          <button
            onClick={() => {
              sound.playClick();
              onSelectCategory('all');
            }}
            className={`px-2.5 py-1 rounded-md transition-all ${
              selectedCategory === 'all' || !selectedCategory
                ? 'bg-white/20 text-white font-semibold'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            All Categories
          </button>
          {portfolioData.skills.categories.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                sound.playClick();
                onSelectCategory(c.id);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
                selectedCategory === c.id
                  ? 'bg-white/20 text-white font-semibold'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
