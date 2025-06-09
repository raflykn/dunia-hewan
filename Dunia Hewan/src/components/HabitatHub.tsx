
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, Map, Compass } from 'lucide-react';
import animalsData from '@/data/animals.json';
import AnimalDetailModal from '@/components/AnimalDetailModal';

interface HabitatHubProps {
  playerData: any;
  onDiscoverAnimal: (animalId: string) => void;
  onBack: () => void;
}

const HabitatHub: React.FC<HabitatHubProps> = ({ 
  playerData, 
  onDiscoverAnimal, 
  onBack 
}) => {
  const [selectedHabitat, setSelectedHabitat] = useState<string | null>(null);
  const [selectedAnimal, setSelectedAnimal] = useState<any>(null);

  const habitats = Object.entries(animalsData.habitats);

  const handleAnimalClick = (animal: any) => {
    setSelectedAnimal(animal);
    if (!playerData.discoveredAnimals.includes(animal.id)) {
      onDiscoverAnimal(animal.id);
    }
  };

  if (selectedHabitat) {
    const habitat = animalsData.habitats[selectedHabitat as keyof typeof animalsData.habitats];
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-300 via-green-300 to-green-500 relative overflow-hidden">
        {/* Game-style background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-5 left-5 text-2xl animate-float delay-1000">☁️</div>
          <div className="absolute top-10 right-10 text-3xl animate-bounce delay-2000">🌤️</div>
          <div className="absolute bottom-10 left-10 text-2xl animate-float delay-3000">🌸</div>
        </div>

        <div className="relative z-10 p-4 max-w-4xl mx-auto">
          {/* Game-style header bar */}
          <div className="bg-gradient-to-r from-green-700 to-green-800 rounded-xl p-4 mb-6 shadow-2xl border-4 border-green-900">
            <div className="flex items-center justify-between">
              <Button 
                onClick={() => setSelectedHabitat(null)}
                className="bg-green-900 hover:bg-green-950 text-white border-2 border-green-950"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
              
              <div className="flex items-center gap-3">
                <div className="bg-yellow-500 rounded-lg px-3 py-2 flex items-center gap-2 shadow-lg">
                  <Star className="w-4 h-4 text-white fill-current" />
                  <span className="text-white font-bold">{playerData.stars}</span>
                </div>
                <div className="bg-blue-500 rounded-lg px-3 py-2 flex items-center gap-2 shadow-lg">
                  <Map className="w-4 h-4 text-white" />
                  <span className="text-white font-bold">{habitat.name}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Habitat title with game-style design */}
          <div className="text-center mb-8">
            <div className="bg-amber-600 rounded-2xl p-6 shadow-2xl border-4 border-amber-800 mb-4">
              <div className="text-6xl mb-2 animate-float">{habitat.icon}</div>
              <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                {habitat.name}
              </h1>
              <p className="text-amber-100 mt-2">Temukan hewan-hewan yang tinggal di sini!</p>
            </div>
          </div>

          {/* Animals grid with Minecraft-style cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {habitat.animals.map((animal) => {
              const isDiscovered = playerData.discoveredAnimals.includes(animal.id);
              
              return (
                <div
                  key={animal.id}
                  className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                  onClick={() => handleAnimalClick(animal)}
                >
                  <Card className={`relative overflow-hidden border-4 shadow-2xl ${
                    isDiscovered 
                      ? 'border-emerald-600 bg-gradient-to-br from-emerald-200 to-emerald-400' 
                      : 'border-gray-600 bg-gradient-to-br from-gray-300 to-gray-500'
                  }`}>
                    {/* Discovery badge */}
                    {isDiscovered && (
                      <div className="absolute top-2 right-2 bg-yellow-500 rounded-full p-2 shadow-lg animate-sparkle">
                        <Star className="w-4 h-4 text-white fill-current" />
                      </div>
                    )}
                    
                    {/* Mystery overlay for undiscovered animals */}
                    {!isDiscovered && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10">
                        <div className="text-center">
                          <div className="text-4xl mb-2">❓</div>
                          <span className="text-white font-bold text-sm bg-black/50 px-2 py-1 rounded">
                            Klik untuk Temukan!
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <div className="p-6 text-center">
                      <div className={`text-6xl mb-4 ${isDiscovered ? 'animate-bounce-gentle' : 'opacity-30'}`}>
                        {isDiscovered ? animal.emoji : '❓'}
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2 text-gray-800">
                        {isDiscovered ? animal.nama : '???'}
                      </h3>
                      
                      {isDiscovered && (
                        <>
                          <p className="text-sm text-gray-600 italic mb-3">
                            {animal.latin}
                          </p>
                          
                          <div className="flex justify-center mb-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${
                              animal.jenis_makanan === 'Herbivora' 
                                ? 'bg-green-200 text-green-800 border-green-400' :
                              animal.jenis_makanan === 'Karnivora' 
                                ? 'bg-red-200 text-red-800 border-red-400' :
                                'bg-yellow-200 text-yellow-800 border-yellow-400'
                            }`}>
                              {animal.jenis_makanan}
                            </span>
                          </div>
                          
                          <div className="bg-white/50 rounded-lg p-2 text-sm text-gray-700">
                            🍽️ {animal.makanan}
                          </div>
                        </>
                      )}
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="mt-8">
            <div className="bg-amber-600 rounded-xl p-4 shadow-xl border-4 border-amber-800">
              <div className="text-center mb-3">
                <span className="text-white font-bold">
                  🏆 Progress: {playerData.discoveredAnimals.filter((id: string) => 
                    habitat.animals.some(animal => animal.id === id)
                  ).length}/{habitat.animals.length} Hewan Ditemukan
                </span>
              </div>
              <div className="w-full bg-amber-800 rounded-full h-4 border-2 border-amber-900">
                <div 
                  className="progress-game h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${(playerData.discoveredAnimals.filter((id: string) => 
                      habitat.animals.some(animal => animal.id === id)
                    ).length / habitat.animals.length) * 100}%` 
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {selectedAnimal && (
          <AnimalDetailModal 
            animal={selectedAnimal}
            onClose={() => setSelectedAnimal(null)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-green-300 to-green-500 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-3xl animate-float">🗺️</div>
        <div className="absolute top-20 right-20 text-2xl animate-bounce delay-1000">🧭</div>
        <div className="absolute bottom-20 left-20 text-3xl animate-float delay-2000">🌍</div>
      </div>

      <div className="relative z-10 p-4 max-w-4xl mx-auto">
        {/* Header with inventory-style stats */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl p-4 mb-6 shadow-2xl border-4 border-blue-900">
          <div className="flex items-center justify-between">
            <Button 
              onClick={onBack}
              className="bg-blue-900 hover:bg-blue-950 text-white border-2 border-blue-950"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Beranda
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="bg-yellow-500 rounded-lg px-3 py-2 flex items-center gap-2 shadow-lg">
                <Star className="w-4 h-4 text-white fill-current" />
                <span className="text-white font-bold">{playerData.stars}</span>
              </div>
              <div className="bg-green-500 rounded-lg px-3 py-2 flex items-center gap-2 shadow-lg">
                <Compass className="w-4 h-4 text-white" />
                <span className="text-white font-bold">Penjelajah</span>
              </div>
            </div>
          </div>
        </div>

        {/* Title section */}
        <div className="text-center mb-8">
          <div className="bg-emerald-600 rounded-2xl p-6 shadow-2xl border-4 border-emerald-800">
            <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
              🌍 Peta Habitat
            </h1>
            <p className="text-emerald-100 text-lg">Pilih habitat untuk memulai petualangan!</p>
          </div>
        </div>

        {/* Habitat selection grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {habitats.map(([key, habitat]) => {
            const discoveredCount = playerData.discoveredAnimals.filter((id: string) => 
              habitat.animals.some(animal => animal.id === id)
            ).length;
            
            return (
              <div
                key={key}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                onClick={() => setSelectedHabitat(key)}
              >
                <Card className={`relative overflow-hidden border-4 shadow-2xl bg-gradient-to-br ${habitat.color} border-opacity-80`}>
                  {/* Achievement indicator */}
                  {discoveredCount === habitat.animals.length && (
                    <div className="absolute top-3 right-3 bg-yellow-500 rounded-full p-2 animate-sparkle">
                      <span className="text-white text-sm font-bold">👑</span>
                    </div>
                  )}
                  
                  <div className="p-6 text-center text-white">
                    <div className="bg-white/20 rounded-full p-4 mb-4 mx-auto w-fit shadow-lg">
                      <div className="text-5xl animate-float">{habitat.icon}</div>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3 drop-shadow">{habitat.name}</h3>
                    
                    <div className="bg-black/20 rounded-lg p-3 mb-4">
                      <p className="text-sm mb-2">
                        🐾 {habitat.animals.length} hewan menunggu
                      </p>
                      <div className="text-xs">
                        Ditemukan: {discoveredCount}/{habitat.animals.length}
                      </div>
                      
                      {/* Progress bar */}
                      <div className="w-full bg-black/30 rounded-full h-2 mt-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(discoveredCount / habitat.animals.length) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 font-bold">
                      🚀 Jelajahi Sekarang
                    </Button>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HabitatHub;
