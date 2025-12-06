import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Team } from './components/Team';
import { Concierge } from './components/Concierge';
import { LiveVoiceAgent } from './components/LiveVoiceAgent';
import { ChatWidget } from './components/ChatWidget';

const App: React.FC = () => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-x-hidden font-sans selection:bg-neon-lime selection:text-black">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10">
        <Navbar onVoiceActivate={() => setIsVoiceActive(true)} />
        
        <main>
          <Hero />
          <Features />
          <Team />
          <Concierge />
        </main>

        <footer className="py-12 border-t border-white/10 mt-20 bg-black">
          <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
            <p>© 2024 Celestial Smile. The future of cosmetic dentistry.</p>
          </div>
        </footer>
      </div>

      {/* Floating Chat Widget */}
      <ChatWidget />

      {/* Voice Agent Overlay */}
      {isVoiceActive && (
        <LiveVoiceAgent onClose={() => setIsVoiceActive(false)} />
      )}
    </div>
  );
};

export default App;