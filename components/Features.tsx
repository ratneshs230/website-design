import React from 'react';
import { ArrowRight } from 'lucide-react';

export const Features: React.FC = () => {
  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-24">
                {/* Feature 1 */}
                <div className="space-y-6">
                    <h2 className="text-4xl font-bold text-white">Pioneering Technology</h2>
                    <p className="text-gray-500 max-w-sm leading-relaxed">
                        Cutting-edge robotics meet organic aesthetics. Our proprietary scanning algorithms ensure the perfect fit for your unique physiology.
                    </p>
                    <button className="flex items-center gap-2 bg-neon-lime/90 hover:bg-neon-lime text-black text-xs font-bold px-6 py-2 rounded-full uppercase tracking-wider transition-colors">
                        Learn More <ArrowRight className="w-3 h-3" />
                    </button>
                </div>

                {/* Feature 2 */}
                <div className="space-y-6">
                    <h2 className="text-4xl font-bold text-white">Meet the Artists</h2>
                    <p className="text-gray-500 max-w-sm leading-relaxed">
                        Curated soft materials, density control, and master ceramists working in unison to craft perfection.
                    </p>
                    <button className="flex items-center gap-2 bg-neon-lime/90 hover:bg-neon-lime text-black text-xs font-bold px-6 py-2 rounded-full uppercase tracking-wider transition-colors">
                        Know Team <ArrowRight className="w-3 h-3" />
                    </button>
                </div>
            </div>

            {/* Abstract Liquid Metal Art */}
            <div className="relative h-[600px] w-full flex items-center justify-center">
                <div className="absolute right-0 top-0 text-[10vw] font-black text-stroke-lime opacity-10 rotate-90 origin-top-right translate-x-full">
                    SENSES
                </div>
                <img 
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" 
                    alt="Liquid Metal Art" 
                    className="w-full h-full object-cover rounded-2xl grayscale contrast-125 hover:grayscale-0 transition-all duration-700 ease-in-out mix-blend-lighten"
                />
            </div>
        </div>
    </section>
  );
};