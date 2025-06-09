
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Trophy, Heart } from 'lucide-react';
import AnimalCharacter from '@/components/AnimalCharacter';
import HabitatHub from '@/components/HabitatHub';
import AnimalGamesHub from '@/components/AnimalGamesHub';
import CollectionHub from '@/components/CollectionHub';

const Index: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'habitat' | 'games' | 'collection'>('home');
  const [playerData, setPlayerData] = useState({
    name: '',
    age: 0,
    stars: 0,
    completedGames: [] as string[],
    discoveredAnimals: [] as string[],
    achievements: [] as string[]
  });

  // Load player data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('animalApp_playerData');
    if (savedData) {
      setPlayerData(JSON.parse(savedData));
    } else {
      // First time setup
      const defaultData = {
        name: 'Penjelajah Kecil',
        age: 7,
        stars: 0,
        completedGames: [],
        discoveredAnimals: [],
        achievements: []
      };
      setPlayerData(defaultData);
      localStorage.setItem('animalApp_playerData', JSON.stringify(defaultData));
    }
  }, []);

  // Save player data to localStorage
  const updatePlayerData = (newData: any) => {
    const updatedData = { ...playerData, ...newData };
    setPlayerData(updatedData);
    localStorage.setItem('animalApp_playerData', JSON.stringify(updatedData));
  };

  const addStars = (amount: number) => {
    updatePlayerData({ stars: playerData.stars + amount });
  };

  const addDiscoveredAnimal = (animalId: string) => {
    if (!playerData.discoveredAnimals.includes(animalId)) {
      updatePlayerData({ 
        discoveredAnimals: [...playerData.discoveredAnimals, animalId],
        stars: playerData.stars + 1
      });
    }
  };

  if (currentView === 'habitat') {
    return (
      <HabitatHub 
        playerData={playerData}
        onDiscoverAnimal={addDiscoveredAnimal}
        onBack={() => setCurrentView('home')}
      />
    );
  }

  if (currentView === 'games') {
    return (
      <AnimalGamesHub 
        playerData={playerData}
        updatePlayerData={updatePlayerData}
        addStars={addStars}
        onBack={() => setCurrentView('home')}
      />
    );
  }

  if (currentView === 'collection') {
    return (
      <CollectionHub 
        playerData={playerData}
        onBack={() => setCurrentView('home')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-green-200 to-green-400 relative overflow-hidden">
      {/* Background decorative elements - game-like environment */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl animate-float">🌳</div>
        <div className="absolute top-20 right-20 text-3xl animate-bounce delay-1000">🦋</div>
        <div className="absolute bottom-20 left-20 text-3xl animate-pulse delay-2000">🌸</div>
        <div className="absolute bottom-10 right-10 text-4xl animate-float delay-3000">🌿</div>
        <div className="absolute top-1/2 left-5 text-2xl animate-bounce delay-500">☁️</div>
        <div className="absolute top-1/3 right-5 text-2xl animate-float delay-1500">☁️</div>
      </div>

      <div className="relative z-10 p-4 max-w-4xl mx-auto">
        {/* Game-style header with inventory bar */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl p-4 mb-6 shadow-2xl border-4 border-amber-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <AnimalCharacter size="medium" mood="happy" className="animate-bounce-gentle" />
              <div>
                <h1 className="text-2xl font-bold text-white drop-shadow-lg font-['Comic_Neue']">
                  🌍 Dunia Hewan
                </h1>
                <p className="text-amber-100 text-sm">Petualangan Kak Safari</p>
              </div>
            </div>
            
            {/* Game-style stats bar */}
            <div className="flex items-center gap-3">
              <div className="bg-red-500 rounded-lg px-3 py-2 flex items-center gap-2 shadow-lg">
                <Heart className="w-4 h-4 text-white fill-current" />
                <span className="text-white font-bold text-sm">100</span>
              </div>
              <div className="bg-yellow-500 rounded-lg px-3 py-2 flex items-center gap-2 shadow-lg">
                <Star className="w-4 h-4 text-white fill-current" />
                <span className="text-white font-bold text-sm">{playerData.stars}</span>
              </div>
              <div className="bg-purple-500 rounded-lg px-3 py-2 flex items-center gap-2 shadow-lg">
                <Trophy className="w-4 h-4 text-white fill-current" />
                <span className="text-white font-bold text-sm">{playerData.discoveredAnimals.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main menu cards - Minecraft/FarmVille style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Jelajah Habitat Card */}
          <div 
            className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
            onClick={() => setCurrentView('habitat')}
          >
            <Card className="relative overflow-hidden border-4 border-green-600 bg-gradient-to-br from-green-300 to-green-500 shadow-2xl">
              {/* Pixelated border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              
              <div className="relative p-6 text-center">
                <div className="bg-green-700 rounded-lg p-4 mb-4 mx-auto w-fit shadow-lg">
                  <div className="text-4xl animate-float">🌿</div>
                </div>
                
                <h3 className="text-xl font-bold text-green-900 mb-2 drop-shadow">
                  Jelajah Habitat
                </h3>
                <p className="text-green-800 text-sm mb-4">
                  Temukan hewan di berbagai habitat
                </p>
                
                <div className="bg-green-800/20 rounded-lg p-2 mb-3">
                  <span className="text-green-900 text-xs font-semibold">
                    🐾 {playerData.discoveredAnimals.length} Hewan Ditemukan
                  </span>
                </div>
                
                <Button className="w-full bg-green-700 hover:bg-green-800 text-white font-bold border-2 border-green-900 shadow-lg">
                  🚀 Mulai Eksplorasi
                </Button>
              </div>
            </Card>
          </div>

          {/* Mini Games Card */}
          <div 
            className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
            onClick={() => setCurrentView('games')}
          >
            <Card className="relative overflow-hidden border-4 border-purple-600 bg-gradient-to-br from-purple-300 to-purple-500 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              
              <div className="relative p-6 text-center">
                <div className="bg-purple-700 rounded-lg p-4 mb-4 mx-auto w-fit shadow-lg">
                  <div className="text-4xl animate-bounce">🎮</div>
                </div>
                
                <h3 className="text-xl font-bold text-purple-900 mb-2 drop-shadow">
                  Main & Belajar
                </h3>
                <p className="text-purple-800 text-sm mb-4">
                  Games seru sambil belajar
                </p>
                
                <div className="bg-purple-800/20 rounded-lg p-2 mb-3">
                  <span className="text-purple-900 text-xs font-semibold">
                    🏆 {playerData.completedGames.length}/4 Game Selesai
                  </span>
                </div>
                
                <Button className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold border-2 border-purple-900 shadow-lg">
                  🎯 Ayo Main
                </Button>
              </div>
            </Card>
          </div>

          {/* Collection Card */}
          <div 
            className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
            onClick={() => setCurrentView('collection')}
          >
            <Card className="relative overflow-hidden border-4 border-yellow-600 bg-gradient-to-br from-yellow-300 to-orange-400 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              
              <div className="relative p-6 text-center">
                <div className="bg-yellow-700 rounded-lg p-4 mb-4 mx-auto w-fit shadow-lg">
                  <div className="text-4xl animate-sparkle">⭐</div>
                </div>
                
                <h3 className="text-xl font-bold text-yellow-900 mb-2 drop-shadow">
                  Koleksi Bintang
                </h3>
                <p className="text-yellow-800 text-sm mb-4">
                  Lihat pencapaian kamu
                </p>
                
                <div className="bg-yellow-800/20 rounded-lg p-2 mb-3">
                  <span className="text-yellow-900 text-xs font-semibold">
                    ⭐ {playerData.stars} Total Bintang
                  </span>
                </div>
                
                <Button className="w-full bg-yellow-700 hover:bg-yellow-800 text-white font-bold border-2 border-yellow-900 shadow-lg">
                  💎 Lihat Koleksi
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Game-style info panel */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 shadow-2xl border-4 border-blue-800">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-800 rounded-full p-3 shadow-lg">
                <span className="text-3xl">🤔</span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 drop-shadow">
              💡 Tahukah Kamu?
            </h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Ada lebih dari 8 juta spesies hewan di Bumi! Mari kita kenali beberapa di antaranya dan jadi ahli hewan sejati! 🌟
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
