import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Activities from './components/Activities';
import Certifications from './components/Certifications';
import BeyondCode from './components/BeyondCode';
import Interests from './components/Interests';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { Sparkles, Terminal } from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    // Cinematic initial load sequence
    const interval = setInterval(() => {
      setLoadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + 15;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-[#080A10] flex flex-col items-center justify-center p-4 select-none">
        <div className="relative flex flex-col items-center max-w-xs w-full">
          {/* Futuristic geometric loader */}
          <div className="relative w-16 h-16 mb-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-[#56C8FF]/20 animate-ping" />
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#56C8FF] to-[#9370DB] p-[1.5px] animate-spin">
              <div className="w-full h-full bg-[#080A10] rounded-[10px]" />
            </div>
            <span className="absolute font-mono font-bold text-xs text-[#56C8FF]">
              G
            </span>
          </div>

          <div className="w-full text-center">
            <div className="flex items-center justify-between text-xs font-mono text-[#56C8FF] mb-2">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                INITIALIZING 3D ENGINE
              </span>
              <span>{loadProgress}%</span>
            </div>

            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#56C8FF] via-[#9370DB] to-[#50FA7B] transition-all duration-150 ease-out"
                style={{ width: `${loadProgress}%` }}
              />
            </div>

            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-3">
              S. GOKUL // DEVELOPER DIGITAL UNIVERSE
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#080A10] text-[#C0C6D4] selection:bg-[#56C8FF]/30 selection:text-white cyber-grid">
      {/* Precision Custom Desktop Cursor */}
      <CustomCursor />

      {/* Floating Glass Navigation */}
      <Navbar />

      {/* Main Page Flow */}
      <main>
        {/* 1. Hero Landing */}
        <Hero />

        {/* 2. About Gokul & Statistics */}
        <About />

        {/* 3. Interactive 3D Skill Universe */}
        <Skills />

        {/* 4. Project Showcase */}
        <Projects />

        {/* 5. Hackathons & Activities Telemetry */}
        <Activities />

        {/* 6. Certifications */}
        <Certifications />

        {/* 7. Beyond The Code - Strengths */}
        <BeyondCode />

        {/* 8. Areas of Interest */}
        <Interests />

        {/* 9. Education Timeline */}
        <Education />

        {/* 10. Contact & Verified Socials */}
        <Contact />
      </main>

      {/* Animated Footer */}
      <Footer />
    </div>
  );
}
