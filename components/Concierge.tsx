import React from 'react';

export const Concierge: React.FC = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
        {/* Light / Marble Side */}
        <div className="bg-white text-black p-16 flex flex-col justify-center bg-marble bg-cover bg-center">
            <div className="max-w-md bg-white/80 p-8 backdrop-blur-md rounded-xl">
                <h2 className="text-4xl font-bold mb-6 font-serif">Liquid Metal</h2>
                <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                    Luminosity radiates from within. Our liquid metal infusion technology strengthens enamel while providing an ethereal glow that captures light from every angle.
                </p>
                <button className="bg-black text-white px-8 py-3 rounded-full text-xs font-bold uppercase hover:bg-gray-800 transition-colors">
                    Expect More
                </button>
            </div>
        </div>

        {/* Dark Side */}
        <div className="bg-[#0f0f0f] text-white p-16 flex flex-col justify-center border-t border-white/10 md:border-t-0">
             <div className="max-w-md ml-auto">
                <h2 className="text-4xl font-bold mb-6 text-white">Luxury Concierge</h2>
                <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                    From your arrival to your final reveal, our dedicated concierge team ensures your journey is as seamless as your new smile. Private transport, accommodation, and aftercare.
                </p>
                <button className="bg-neon-lime text-black px-8 py-3 rounded-full text-xs font-bold uppercase hover:bg-neon-lime-hover transition-colors">
                    Start Living
                </button>
            </div>
        </div>
    </section>
  );
};