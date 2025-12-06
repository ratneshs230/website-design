import React from 'react';

const members = [
    {
        name: "Pegorie Dsiit",
        role: "Head of Esthetics",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop"
    },
    {
        name: "Hooh Denik",
        role: "Aesthetics Director",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop"
    },
    {
        name: "Med Totto",
        role: "Technician Cosmos",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop"
    }
];

export const Team: React.FC = () => {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12">The Art of the Smile</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {members.map((member, idx) => (
                <div key={idx} className="group relative cursor-pointer">
                    <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-4 bg-zinc-900">
                        <img 
                            src={member.image} 
                            alt={member.name} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 opacity-80 group-hover:opacity-100 group-hover:scale-105"
                        />
                        {/* Glitch Overlay Effect */}
                        <div className="absolute top-[40%] left-0 right-0 h-10 bg-neon-lime/20 backdrop-blur-sm mix-blend-color-dodge opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <div className="w-full h-[1px] bg-white/50"></div>
                        </div>
                        <div className="absolute top-[45%] left-2 w-10 h-1 bg-cyan-400 opacity-0 group-hover:opacity-100 animate-pulse"></div>
                        <div className="absolute top-[38%] right-4 w-6 h-1 bg-red-500 opacity-0 group-hover:opacity-100 animate-pulse"></div>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-neon-lime transition-colors">{member.name}</h3>
                    <p className="text-gray-500 text-sm uppercase tracking-wider">{member.role}</p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};