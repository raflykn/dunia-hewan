
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star } from 'lucide-react';
import animalsData from '@/data/animals.json';

interface CollectionHubProps {
  playerData: any;
  onBack: () => void;
}

const CollectionHub: React.FC<CollectionHubProps> = ({ playerData, onBack }) => {
  const allAnimals = Object.values(animalsData.habitats).flatMap(habitat => habitat.animals);
  const totalAnimals = allAnimals.length;
  const discoveredCount = playerData.discoveredAnimals.length;
  const completedGames = playerData.completedGames.length;
  
  const achievements = [
    {
      id: 'first_animal',
      title: 'Penjelajah Pemula',
      description: 'Temukan hewan pertama',
      icon: '🌟',
      unlocked: discoveredCount >= 1
    },
    {
      id: 'five_animals',
      title: 'Pengamat Hewan',
      description: 'Temukan 5 hewan',
      icon: '🔍',
      unlocked: discoveredCount >= 5
    },
    {
      id: 'all_animals',
      title: 'Master Zoologi',
      description: 'Temukan semua hewan',
      icon: '🏆',
      unlocked: discoveredCount >= totalAnimals
    },
    {
      id: 'first_game',
      title: 'Pemain Hebat',
      description: 'Selesaikan game pertama',
      icon: '🎮',
      unlocked: completedGames >= 1
    },
    {
      id: 'all_games',
      title: 'Ahli Permainan',
      description: 'Selesaikan semua game',
      icon: '🎯',
      unlocked: completedGames >= 4
    },
    {
      id: 'star_collector',
      title: 'Kolektor Bintang',
      description: 'Kumpulkan 50 bintang',
      icon: '⭐',
      unlocked: playerData.stars >= 50
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-orange-300 to-red-300 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            onClick={onBack}
            className="bg-white/90 text-orange-600 hover:bg-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Beranda
          </Button>
          
          <div className="bg-white/90 rounded-xl px-4 py-2 shadow-lg">
            <div className="flex items-center gap-2 text-orange-500">
              <Star className="w-5 h-5 fill-current" />
              <span className="font-bold">{playerData.stars} Bintang</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
            ⭐ Koleksi Bintang
          </h1>
          <p className="text-white/90 text-lg">Lihat pencapaian dan koleksi kamu!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-blue-400 to-blue-600 border-0 shadow-xl">
            <div className="text-center text-white">
              <div className="text-3xl mb-2">🐾</div>
              <h3 className="text-lg font-bold">Hewan Ditemukan</h3>
              <p className="text-2xl font-bold">{discoveredCount}/{totalAnimals}</p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-400 to-green-600 border-0 shadow-xl">
            <div className="text-center text-white">
              <div className="text-3xl mb-2">🎮</div>
              <h3 className="text-lg font-bold">Game Selesai</h3>
              <p className="text-2xl font-bold">{completedGames}/4</p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-yellow-400 to-orange-500 border-0 shadow-xl">
            <div className="text-center text-white">
              <div className="text-3xl mb-2">⭐</div>
              <h3 className="text-lg font-bold">Total Bintang</h3>
              <p className="text-2xl font-bold">{playerData.stars}</p>
            </div>
          </Card>
        </div>

        {/* Discovered Animals */}
        <Card className="p-6 bg-white/90 shadow-xl mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            🐾 Hewan yang Sudah Ditemukan
          </h3>
          
          {discoveredCount === 0 ? (
            <div className="text-center text-gray-600 py-8">
              <p className="text-lg">Belum ada hewan yang ditemukan.</p>
              <p className="text-sm">Mari jelajahi habitat untuk menemukan hewan!</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {allAnimals
                .filter(animal => playerData.discoveredAnimals.includes(animal.id))
                .map(animal => (
                  <div key={animal.id} className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-3xl mb-2">{animal.emoji}</div>
                    <p className="text-xs font-semibold text-gray-700">{animal.nama}</p>
                  </div>
                ))
              }
            </div>
          )}
        </Card>

        {/* Achievements */}
        <Card className="p-6 bg-white/90 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            🏆 Pencapaian
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map(achievement => (
              <div 
                key={achievement.id}
                className={`p-4 rounded-lg border-2 ${
                  achievement.unlocked 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`text-2xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-bold ${
                      achievement.unlocked ? 'text-green-700' : 'text-gray-500'
                    }`}>
                      {achievement.title}
                    </h4>
                    <p className={`text-sm ${
                      achievement.unlocked ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.unlocked && (
                    <div className="text-green-500">
                      ✓
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Progress Summary */}
        <div className="mt-8 text-center">
          <div className="bg-white/90 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Ringkasan Progress</h3>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Hewan Ditemukan</span>
                  <span>{discoveredCount}/{totalAnimals}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(discoveredCount / totalAnimals) * 100}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Game Selesai</span>
                  <span>{completedGames}/4</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(completedGames / 4) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionHub;
