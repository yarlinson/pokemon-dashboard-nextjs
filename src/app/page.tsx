'use client';

import PokemonList from '../components/pokemon/PokemonList';
import AnimatedHeader from '../components/ui/AnimatedHeader';
import AnimatedBackground from '../components/ui/AnimatedBackground';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fondo animado */}
      <AnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <AnimatedHeader
          onToggleSidebar={() => {}}
          isSidebarOpen={false}
        />

        <main>
          <PokemonList />
        </main>
      </div>
    </div>
  );
}
