import React, { useEffect, useRef } from 'react';

export default function ProjectVisual3D({ visualType, themeColor, secondaryColor }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight || 260);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 260;
    };
    window.addEventListener('resize', handleResize);

    let time = 0;

    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, width, height);

      // Cyber background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 24;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const cx = width / 2;
      const cy = height / 2;

      if (visualType === 'parenting-ai') {
        // LittleAura: Futuristic Pediatric Care & AI Growth Waveform
        // Pulsing growth concentric rings
        for (let r = 1; r <= 3; r++) {
          const ringRad = 40 + r * 28 + Math.sin(time + r) * 6;
          ctx.beginPath();
          ctx.arc(cx, cy, ringRad, 0, Math.PI * 2);
          ctx.strokeStyle = r === 2 ? themeColor : 'rgba(86, 200, 255, 0.25)';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 8]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Heartbeat / Infant Growth Vital Waveform
        ctx.beginPath();
        ctx.strokeStyle = '#56C8FF';
        ctx.lineWidth = 2.5;
        for (let x = 20; x < width - 20; x += 3) {
          const normX = (x - cx) / 70;
          let y = cy + Math.sin(normX * 3 + time * 2) * 12;
          if (Math.abs(normX) < 1.2) {
            y += Math.sin(normX * 9 + time * 4) * 28 * Math.exp(-normX * normX);
          }
          if (x === 20) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Glowing Core Health Orb
        const orbGlow = ctx.createRadialGradient(cx, cy, 5, cx, cy, 35);
        orbGlow.addColorStop(0, '#56C8FF');
        orbGlow.addColorStop(0.5, 'rgba(147, 112, 219, 0.5)');
        orbGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = orbGlow;
        ctx.beginPath();
        ctx.arc(cx, cy, 35, 0, Math.PI * 2);
        ctx.fill();

        // Milestone floating data tags
        const milestones = ['Growth: 98th %ile', 'Vaccine: 6M Due', 'Sleep: 8.5h'];
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        milestones.forEach((m, idx) => {
          const angle = time * 0.4 + (idx * Math.PI * 2) / 3;
          const mx = cx + Math.cos(angle) * 78;
          const my = cy + Math.sin(angle) * 68;
          ctx.fillStyle = 'rgba(8, 10, 16, 0.85)';
          ctx.fillRect(mx - 35, my - 9, 70, 18);
          ctx.strokeStyle = 'rgba(86, 200, 255, 0.4)';
          ctx.strokeRect(mx - 35, my - 9, 70, 18);
          ctx.fillStyle = '#C0C6D4';
          ctx.textAlign = 'center';
          ctx.fillText(m, mx, my + 3);
        });

      } else if (visualType === 'shopping-ai') {
        // PurchaseWise AI: BUY/CONSIDER/AVOID Decision Matrix Gauge
        const gaugeRad = Math.min(width, height) * 0.35;
        
        // Circular arc gauge
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        
        // Red avoid section
        ctx.strokeStyle = 'rgba(255, 85, 85, 0.3)';
        ctx.beginPath();
        ctx.arc(cx, cy, gaugeRad, Math.PI * 0.75, Math.PI * 1.15);
        ctx.stroke();

        // Yellow consider section
        ctx.strokeStyle = 'rgba(255, 184, 108, 0.3)';
        ctx.beginPath();
        ctx.arc(cx, cy, gaugeRad, Math.PI * 1.2, Math.PI * 1.6);
        ctx.stroke();

        // Green BUY section (glowing)
        ctx.strokeStyle = '#50FA7B';
        ctx.beginPath();
        ctx.arc(cx, cy, gaugeRad, Math.PI * 1.65, Math.PI * 2.25);
        ctx.stroke();

        // Animated oscillating decision needle
        const needleAngle = Math.PI * 1.65 + Math.sin(time * 1.5) * 0.35;
        const nx = cx + Math.cos(needleAngle) * (gaugeRad - 8);
        const ny = cy + Math.sin(needleAngle) * (gaugeRad - 8);

        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        // Central hub
        ctx.fillStyle = '#50FA7B';
        ctx.beginPath();
        ctx.arc(cx, cy, 6, 0, Math.PI * 2);
        ctx.fill();

        // Floating holographic verdict tag
        ctx.font = 'bold 12px "Space Grotesk", sans-serif';
        ctx.fillStyle = '#50FA7B';
        ctx.textAlign = 'center';
        ctx.fillText('VERDICT: HIGH CONFIDENCE BUY (94%)', cx, cy + gaugeRad + 22);

      } else if (visualType === 'edtech-ai') {
        // Intelligent Skill Mapping: Bipartite Graph of Skills & Jobs
        const studentNodes = [-50, -15, 20, 55];
        const industryNodes = [-60, -20, 20, 60];

        // Draw links
        studentNodes.forEach((sy, i) => {
          industryNodes.forEach((iy, j) => {
            const activeLink = (Math.floor(time * 2) % 4 === i) && (j === i || j === i + 1);
            ctx.strokeStyle = activeLink ? '#FFB86C' : 'rgba(255, 184, 108, 0.15)';
            ctx.lineWidth = activeLink ? 2 : 1;
            ctx.beginPath();
            ctx.moveTo(cx - 90, cy + sy);
            ctx.bezierCurveTo(cx - 30, cy + sy, cx + 30, cy + iy, cx + 90, cy + iy);
            ctx.stroke();
          });
        });

        // Student skill side nodes
        studentNodes.forEach((sy, i) => {
          ctx.fillStyle = '#56C8FF';
          ctx.beginPath();
          ctx.arc(cx - 90, cy + sy, 6, 0, Math.PI * 2);
          ctx.fill();
        });

        // Industry role side nodes
        industryNodes.forEach((iy, j) => {
          ctx.fillStyle = '#FF79C6';
          ctx.beginPath();
          ctx.arc(cx + 90, cy + iy, 6, 0, Math.PI * 2);
          ctx.fill();
        });

        // Dynamic center gap-analysis indicator
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = '#FFB86C';
        ctx.textAlign = 'center';
        ctx.fillText('SYNAPTIC SKILL-MATCH: 91.4%', cx, cy - 75);

      } else if (visualType === 'govtech-ai') {
        // Intelligent AICTE Workflow Automation: State Machine Stepper
        const steps = ['Submission', 'Scrutiny', 'EVC Inspection', 'SAC / SHC', 'Approval'];
        const stepWidth = (width - 60) / (steps.length - 1);

        // Progress line
        ctx.strokeStyle = 'rgba(189, 147, 249, 0.25)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(30, cy);
        ctx.lineTo(width - 30, cy);
        ctx.stroke();

        const activeStep = Math.floor((time * 0.8) % 5);
        ctx.strokeStyle = '#BD93F9';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(30, cy);
        ctx.lineTo(30 + activeStep * stepWidth, cy);
        ctx.stroke();

        steps.forEach((name, idx) => {
          const sx = 30 + idx * stepWidth;
          const isPassed = idx <= activeStep;
          ctx.fillStyle = isPassed ? '#BD93F9' : '#151923';
          ctx.strokeStyle = isPassed ? '#FFFFFF' : 'rgba(189, 147, 249, 0.4)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(sx, cy, isPassed ? 9 : 7, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          ctx.font = '9px "JetBrains Mono", monospace';
          ctx.fillStyle = isPassed ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)';
          ctx.textAlign = 'center';
          ctx.fillText(name, sx, cy + 24);
        });

        // Verification stamp hologram
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = '#50FA7B';
        ctx.fillText('AUDIT TRAIL // COMPLIANCE VERIFIED', cx, cy - 40);

      } else if (visualType === 'sustainability-ai') {
        // E-Waste Recycling: Computer Vision Scanning Box & Circular Loop
        const boxSize = 90;
        ctx.strokeStyle = '#50FA7B';
        ctx.lineWidth = 2;
        ctx.strokeRect(cx - boxSize / 2, cy - boxSize / 2, boxSize, boxSize);

        // Corner reticles
        const len = 14;
        ctx.lineWidth = 3;
        // TL
        ctx.beginPath(); ctx.moveTo(cx - boxSize/2, cy - boxSize/2 + len); ctx.lineTo(cx - boxSize/2, cy - boxSize/2); ctx.lineTo(cx - boxSize/2 + len, cy - boxSize/2); ctx.stroke();
        // TR
        ctx.beginPath(); ctx.moveTo(cx + boxSize/2 - len, cy - boxSize/2); ctx.lineTo(cx + boxSize/2, cy - boxSize/2); ctx.lineTo(cx + boxSize/2, cy - boxSize/2 + len); ctx.stroke();
        // BL
        ctx.beginPath(); ctx.moveTo(cx - boxSize/2, cy + boxSize/2 - len); ctx.lineTo(cx - boxSize/2, cy + boxSize/2); ctx.lineTo(cx - boxSize/2 + len, cy + boxSize/2); ctx.stroke();
        // BR
        ctx.beginPath(); ctx.moveTo(cx + boxSize/2 - len, cy + boxSize/2); ctx.lineTo(cx + boxSize/2, cy + boxSize/2); ctx.lineTo(cx + boxSize/2, cy + boxSize/2 - len); ctx.stroke();

        // Laser scan line
        const scanY = cy - boxSize/2 + ((Math.sin(time * 3) + 1) / 2) * boxSize;
        ctx.strokeStyle = 'rgba(80, 250, 123, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx - boxSize/2, scanY);
        ctx.lineTo(cx + boxSize/2, scanY);
        ctx.stroke();

        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = '#50FA7B';
        ctx.textAlign = 'center';
        ctx.fillText('AI DETECT: PCB / BATTERY / 96.8% GOLD RECOVERY', cx, cy + boxSize/2 + 22);

      } else if (visualType === 'iot-manufacturing') {
        // Adaptive Manufacturing: Vibration & Thermal Oscilloscope
        ctx.strokeStyle = '#FF5555';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 20; x < width - 20; x += 3) {
          const normX = (x - 20) / (width - 40);
          const y = cy + Math.sin(normX * 18 + time * 6) * 16 + Math.cos(normX * 8 - time * 2) * 10;
          if (x === 20) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Critical status HUD
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = '#FF79C6';
        ctx.textAlign = 'left';
        ctx.fillText('ESP32: LIVE // 4,800 RPM // 64.2°C // VIB: NORMAL', 30, cy - 45);

        // Warning threshold line
        ctx.strokeStyle = 'rgba(255, 85, 85, 0.4)';
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.moveTo(20, cy - 25);
        ctx.lineTo(width - 20, cy - 25);
        ctx.stroke();
        ctx.setLineDash([]);

      } else {
        // RoadSafe: Radar Sweep & Road Grid
        const radarRad = 65;
        ctx.strokeStyle = 'rgba(86, 200, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, radarRad, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx, cy, radarRad * 0.5, 0, Math.PI * 2);
        ctx.stroke();

        // Rotating radar beam
        const sweepAngle = time * 2;
        const sx = cx + Math.cos(sweepAngle) * radarRad;
        const sy = cy + Math.sin(sweepAngle) * radarRad;
        ctx.strokeStyle = '#56C8FF';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(sx, sy);
        ctx.stroke();

        // Pulsing incident blips
        ctx.fillStyle = '#F1FA8C';
        ctx.beginPath();
        ctx.arc(cx + 25, cy - 20, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = '#56C8FF';
        ctx.textAlign = 'center';
        ctx.fillText('ROAD HAZARDS RADAR // SOS READY', cx, cy + radarRad + 22);
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [visualType, themeColor, secondaryColor]);

  return (
    <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden bg-[#0A0D16] border border-white/5 flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute top-2 left-3 font-mono text-[9px] uppercase tracking-wider text-white/40 pointer-events-none">
        SIMULATED TELEMETRY // 3D HUD
      </div>
    </div>
  );
}
