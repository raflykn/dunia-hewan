
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star } from 'lucide-react';
import AnimalQuizGame from '@/components/games/AnimalQuizGame';
import AnimalWordGame from '@/components/games/AnimalWordGame';
import AnimalCountGame from '@/components/games/AnimalCountGame';
import AnimalColorGame from '@/components/games/AnimalColorGame';

interface AnimalGamesHubProps {
  playerData: any;
  updatePlayerData: (data: any) => void;
  addStars: (amount: number) => void;
  onBack: () => void;
}

const AnimalGamesHub: React.FC<AnimalGamesHubProps> = ({ 
  playerData, 
  updatePlayerData, 
  addStars, 
  onBack 
}) => {
  const [currentGame, setCurrentGame] = useState<string | null>(null);

  const games = [
    {
      id: 'animal-quiz',
      title: 'Kuis Hewan',
      description: 'Tebak hewan dari pertanyaan',
      icon: '🤔',
      color: 'from-blue-400 to-blue-600',
      component: AnimalQuizGame
    },
    {
      id: 'animal-word',
      title: 'Tebak Kata',
      description: 'Susun huruf jadi nama hewan',
      icon: '🔤',
      color: 'from-green-400 to-green-600',
      component: AnimalWordGame
    },
    {
      id: 'animal-count',
      title: 'Hitung Hewan',
      description: 'Hitung jumlah hewan',
      icon: '🔢',
      color: 'from-purple-400 to-purple-600',
      component: AnimalCountGame
    },
    {
      id: 'animal-color',
      title: 'Warna Hewan',
      description: 'Pilih warna yang tepat',
      icon: '🎨',
      color: 'from-orange-400 to-red-500',
      component: AnimalColorGame
    }
  ];

  const handleGameComplete = (gameId: string, starsEarned: number) => {
    addStars(starsEarned);
    
    const completedGames = [...playerData.completedGames];
    if (!completedGames.includes(gameId)) {
      completedGames.push(gameId);
      updatePlayerData({ completedGames });
    }
    
    setCurrentGame(null);
  };

  if (currentGame) {
    const game = games.find(g => g.id === currentGame);
    const GameComponent = game?.component;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 p-4">
        <div className="max-w-4xl mx-auto">
          <Button 
            onClick={() => setCurrentGame(null)}
            className="mb-4 bg-white/90 text-purple-600 hover:bg-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Games
          </Button>
          
          {GameComponent && (
            <GameComponent 
              onComplete={(starsEarned: number) => handleGameComplete(currentGame, starsEarned)}
              onBack={() => setCurrentGame(null)}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button 
            onClick={onBack}
            className="bg-white/90 text-purple-600 hover:bg-white"
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
            🎮 Main & Belajar
          </h1>
          <p className="text-white/90 text-lg">Pilih permainan dan mari belajar tentang hewan!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {games.map((game) => {
            const isCompleted = playerData.completedGames.includes(game.id);
            
            return (
              <Card 
                key={game.id}
                className={`p-6 bg-gradient-to-br ${game.color} border-0 shadow-xl hover:scale-105 transition-transform cursor-pointer relative overflow-hidden`}
                onClick={() => setCurrentGame(game.id)}
              >
                {isCompleted && (
                  <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-800 px-2 py-1 rounded-full text-xs font-bold">
                    ✓ Selesai
                  </div>
                )}
                
                <div className="text-center text-white">
                  <div className="text-4xl mb-3">{game.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                  <p className="text-white/90 text-sm">{game.description}</p>
                  
                  <div className="mt-4">
                    <div className="bg-white/20 px-3 py-1 rounded-full text-sm inline-block">
                      {isCompleted ? '🌟 Dapat bintang!' : '🎯 Belum dimainkan'}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <div className="bg-white/90 rounded-xl p-4 shadow-lg inline-block">
            <p className="text-purple-600 font-semibold">
              📊 Progress: {playerData.completedGames.length}/{games.length} Game Selesai
            </p>
            <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(playerData.completedGames.length / games.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalGamesHub;
