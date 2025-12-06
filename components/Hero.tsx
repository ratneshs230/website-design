import React from 'react';

export const Hero: React.FC = () => {
  const ModelViewer = 'model-viewer' as any;

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center pt-24 px-6 overflow-hidden">
      
      {/* Background Giant Text */}
      <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none select-none z-0 opacity-20">
        <div className="text-[15vw] leading-none font-black text-stroke uppercase tracking-tighter">
          Monument
        </div>
        <div className="text-[15vw] leading-none font-black text-stroke uppercase tracking-tighter translate-x-20">
          Movement
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10 h-full">
        
        {/* Left: 3D Model */}
        <div className="flex justify-center items-center relative h-[500px] lg:h-[600px]">
          <div className="relative w-full h-full">
            {/* Subtle backlight for the realistic model */}
            <div className="absolute inset-0 bg-white/5 rounded-full blur-[100px] z-0"></div>
            
            <ModelViewer
              src="https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/models/gltf/RobotExpressive/RobotExpressive.glb"
              alt="Cute Dancing Robot"
              animation-name="Dance"
              autoplay
              camera-controls
              auto-rotate
              disable-zoom
              shadow-intensity="1.5"
              shadow-softness="1"
              exposure="1"
              environment-image="neutral"
              interaction-prompt="auto"
              camera-orbit="0deg 75deg 90%"
              min-camera-orbit="auto auto auto"
              max-camera-orbit="auto auto auto"
              style={{
                width: '100%',
                height: '100%',
                zIndex: 10,
              }}
            >
            </ModelViewer>

            {/* Hint text */}
            <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none">
                <span className="text-xs text-gray-500 uppercase tracking-widest bg-black/50 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                    Your Joyful Companion
                </span>
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex flex-col justify-center text-left lg:pl-10 pointer-events-none">
          <div className="pointer-events-auto">
            <h1 className="text-6xl lg:text-8xl font-black uppercase leading-[0.9] mb-8">
              <span className="block">Navigate Your</span>
              <span className="block text-white">Celestial Journey</span>
            </h1>
            
            <p className="text-gray-400 text-lg lg:text-xl max-w-md mb-10 leading-relaxed">
              Find your true north in cosmetic dentistry. Precision guidance, implants, and transformations beyond compare.
            </p>

            <button className="self-start bg-neon-lime hover:bg-neon-lime-hover text-black px-8 py-4 rounded-full text-base font-bold uppercase tracking-wide transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(204,255,0,0.4)]">
              Explore Options
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};