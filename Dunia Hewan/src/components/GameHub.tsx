
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star } from 'lucide-react';
import LetterGuessGame from '@/components/games/LetterGuessGame';
import FruitCountGame from '@/components/games/FruitCountGame';
import ColorPickGame from '@/components/games/ColorPickGame';
import WordPuzzleGame from '@/components/games/WordPuzzleGame';
import MazeGame from '@/components/games/MazeGame';

interface GameHubProps {
  playerData: any;
  updatePlayerData: (data: any) => void;
  addStars: (amount: number) => void;
  onBack: () => void;
}

const GameHub: React.FC<GameHubProps> = ({ playerData, updatePlayerData, addStars, onBack }) => {
  const [currentGame, setCurrentGame] = useState<string | null>(null);

  const games = [
    {
      id: 'letter-guess',
      title: 'Tebak Huruf',
      description: 'Tebak huruf dari gambar',
      icon: '🔤',
      color: 'from-red-400 to-red-600',
      component: LetterGuessGame
    },
    {
      id: 'fruit-count',
      title: 'Hitung Buah',
      description: 'Hitung jumlah buah',
      icon: '🍎',
      color: 'from-green-400 to-green-600',
      component: FruitCountGame
    },
    {
      id: 'color-pick',
      title: 'Pilih Warna',
      description: 'Cocokkan warna dengan nama',
      icon: '🎨',
      color: 'from-blue-400 to-blue-600',
      component: ColorPickGame
    },
    {
      id: 'word-puzzle',
      title: 'Puzzle Kata',
      description: 'Susun huruf jadi kata',
      icon: '🧩',
      color: 'from-purple-400 to-purple-600',
      component: WordPuzzleGame
    },
    {
      id: 'maze',
      title: 'Labirin Edukatif',
      description: 'Jawab soal untuk melewati jalur',
      icon: '🌟',
      color: 'from-yellow-400 to-orange-500',
      component: MazeGame
    }
  ];

  const handleGameComplete = (gameId: string, starsEarned: number) => {
    addStars(starsEarned);
    
    // Tambahkan game ke daftar yang sudah diselesaikan
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
        {/* Header */}
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
            🎮 Mini Games
          </h1>
          <p className="text-white/90 text-lg">Pilih permainan dan mari belajar bersama!</p>
        </div>

        {/* Grid Games */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => {
            const isCompleted = playerData.completedGames.includes(game.id);
            
            return (
              <Card 
                key={game.id}
                className={`p-6 bg-gradient-to-br ${game.color} border-0 shadow-xl hover:scale-105 transition-transform cursor-pointer relative overflow-hidden`}
                onClick={() => setCurrentGame(game.id)}
              >
                {/* Badge untuk game yang sudah diselesaikan */}
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

        {/* Progress info */}
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

export default GameHub;
