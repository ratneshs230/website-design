import React from 'react';
import { Search, Mic } from 'lucide-react';

interface NavbarProps {
  onVoiceActivate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onVoiceActivate }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-6 px-8 flex justify-between items-center backdrop-blur-sm bg-black/20">
      <div className="flex items-center gap-2">
        <div className="text-neon-lime text-2xl font-bold tracking-tight flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-neon-lime inline-block"></span>
          CELESTIAL SMILE
        </div>
      </div>

      <div className="hidden md:flex items-center gap-10 font-medium text-sm text-gray-300">
        <a href="#courts" className="hover:text-neon-lime transition-colors">Courts</a>
        <a href="#maurcatos" className="hover:text-neon-lime transition-colors">Maurcatos</a>
        <a href="#philosophy" className="hover:text-neon-lime transition-colors">Philosophy</a>
      </div>

      <div className="flex items-center gap-6">
        <Search className="w-5 h-5 text-gray-300 cursor-pointer hover:text-neon-lime transition-colors" />
        <button className="text-sm font-medium hover:text-neon-lime transition-colors hidden sm:block">
          Book Date
        </button>
        <button className="text-sm font-medium hover:text-neon-lime transition-colors hidden sm:block">
          Experience
        </button>
        
        {/* Voice Assistant Button */}
        <button 
          onClick={onVoiceActivate}
          className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white px-4 py-2 rounded-full transition-all duration-300 group"
        >
          <Mic className="w-4 h-4 text-neon-lime group-hover:animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider">Live Agent</span>
        </button>

        <button className="bg-neon-lime hover:bg-neon-lime-hover text-black px-6 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105">
          Consult Today
        </button>
      </div>
    </nav>
  );
};