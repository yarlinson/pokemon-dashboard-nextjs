'use client';

import { useState } from 'react';
import PokemonList from '../components/pokemon/PokemonList';
import AnimatedHeader from '../components/ui/AnimatedHeader';
import AnimatedBackground from '../components/ui/AnimatedBackground';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fondo animado */}
      <AnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <AnimatedHeader
          onToggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />

        <main>
          <PokemonList 
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={toggleSidebar}
          />
        </main>
      </div>
    </div>
  );
}
