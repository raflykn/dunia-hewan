
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import animalsData from '@/data/animals.json';

interface AnimalWordGameProps {
  onComplete: (stars: number) => void;
  onBack: () => void;
}

const AnimalWordGame: React.FC<AnimalWordGameProps> = ({ onComplete, onBack }) => {
  const [words, setWords] = useState<any[]>([]);
  const [currentWord, setCurrentWord] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [shuffledLetters, setShuffledLetters] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    generateWords();
  }, []);

  const generateWords = () => {
    const allAnimals = Object.values(animalsData.habitats).flatMap(habitat => habitat.animals);
    const selectedAnimals = allAnimals
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    
    setWords(selectedAnimals);
    if (selectedAnimals.length > 0) {
      shuffleCurrentWord(selectedAnimals[0]);
    }
  };

  const shuffleCurrentWord = (animal: any) => {
    const letters = animal.nama.toUpperCase().split('');
    const shuffled = [...letters].sort(() => Math.random() - 0.5);
    setShuffledLetters(shuffled);
    setUserAnswer('');
  };

  const addLetter = (letter: string, index: number) => {
    setUserAnswer(prev => prev + letter);
    setShuffledLetters(prev => prev.filter((_, i) => i !== index));
  };

  const removeLetter = (index: number) => {
    const removedLetter = userAnswer[index];
    setUserAnswer(prev => prev.slice(0, index) + prev.slice(index + 1));
    setShuffledLetters(prev => [...prev, removedLetter]);
  };

  const checkAnswer = () => {
    const correct = userAnswer.toUpperCase() === words[currentWord].nama.toUpperCase();
    setShowResult(true);
    
    if (correct) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentWord < words.length - 1) {
        setCurrentWord(currentWord + 1);
        shuffleCurrentWord(words[currentWord + 1]);
        setShowResult(false);
      } else {
        setGameComplete(true);
      }
    }, 2000);
  };

  const getStars = () => {
    if (score === 5) return 3;
    if (score >= 3) return 2;
    if (score >= 1) return 1;
    return 0;
  };

  const handleComplete = () => {
    onComplete(getStars());
  };

  if (words.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Mempersiapkan permainan...</div>
      </div>
    );
  }

  if (gameComplete) {
    const stars = getStars();
    
    return (
      <Card className="max-w-2xl mx-auto p-8 bg-white shadow-2xl">
        <div className="text-center">
          <div className="text-6xl mb-4">
            {stars === 3 ? '🏆' : stars === 2 ? '🥈' : stars === 1 ? '🥉' : '😊'}
          </div>
          
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Permainan Selesai!
          </h2>
          
          <p className="text-xl mb-6 text-gray-600">
            Kamu berhasil menyusun {score} dari {words.length} kata!
          </p>
          
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3].map(star => (
              <Star 
                key={star}
                className={`w-8 h-8 ${star <= stars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
          
          <div className="flex gap-4 justify-center">
            <Button onClick={handleComplete} className="bg-green-500 hover:bg-green-600">
              Ambil Bintang
            </Button>
            <Button onClick={onBack} variant="outline">
              Kembali
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  const word = words[currentWord];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 text-center">
        <div className="bg-white/90 rounded-xl px-4 py-2 shadow-lg inline-block">
          <span className="text-purple-600 font-bold">
            Kata {currentWord + 1} dari {words.length}
          </span>
        </div>
      </div>

      <Card className="p-8 bg-white shadow-2xl">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{word.emoji}</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Susun huruf menjadi nama hewan!
          </h2>
          <p className="text-gray-600">{word.latin}</p>
        </div>

        {/* User Answer Area */}
        <div className="mb-6">
          <h3 className="text-center text-lg font-semibold mb-4 text-gray-700">Jawabanmu:</h3>
          <div className="flex justify-center gap-2 min-h-[60px] items-center">
            {userAnswer.split('').map((letter, index) => (
              <Button
                key={index}
                onClick={() => removeLetter(index)}
                className="w-12 h-12 text-xl font-bold bg-blue-500 hover:bg-blue-600 text-white"
              >
                {letter}
              </Button>
            ))}
          </div>
        </div>

        {/* Available Letters */}
        <div className="mb-6">
          <h3 className="text-center text-lg font-semibold mb-4 text-gray-700">Huruf yang tersedia:</h3>
          <div className="flex justify-center gap-2 flex-wrap">
            {shuffledLetters.map((letter, index) => (
              <Button
                key={index}
                onClick={() => addLetter(letter, index)}
                className="w-12 h-12 text-xl font-bold bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                {letter}
              </Button>
            ))}
          </div>
        </div>

        {/* Check Answer Button */}
        <div className="text-center">
          <Button
            onClick={checkAnswer}
            disabled={userAnswer.length === 0 || showResult}
            className="px-8 py-3 text-lg font-semibold bg-green-500 hover:bg-green-600"
          >
            Periksa Jawaban
          </Button>
        </div>

        {showResult && (
          <div className="mt-6 text-center">
            <div className={`text-xl font-bold ${
              userAnswer.toUpperCase() === word.nama.toUpperCase() ? 'text-green-600' : 'text-red-600'
            }`}>
              {userAnswer.toUpperCase() === word.nama.toUpperCase() ? '🎉 Benar!' : '❌ Coba lagi!'}
            </div>
            {userAnswer.toUpperCase() !== word.nama.toUpperCase() && (
              <p className="text-gray-600 mt-2">
                Jawaban yang benar: {word.nama.toUpperCase()}
              </p>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default AnimalWordGame;
