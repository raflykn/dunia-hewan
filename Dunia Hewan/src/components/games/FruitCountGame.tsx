
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import LitaCharacter from '@/components/LitaCharacter';

interface FruitCountGameProps {
  onComplete: (stars: number) => void;
  onBack: () => void;
}

const FruitCountGame: React.FC<FruitCountGameProps> = ({ onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);

  const generateFruits = (count: number, fruit: string) => {
    return Array(count).fill(fruit);
  };

  const questions = [
    {
      fruits: generateFruits(3, '🍎'),
      correctAnswer: 3,
      options: [2, 3, 4, 5]
    },
    {
      fruits: generateFruits(7, '🍌'),
      correctAnswer: 7,
      options: [6, 7, 8, 9]
    },
    {
      fruits: generateFruits(5, '🍊'),
      correctAnswer: 5,
      options: [4, 5, 6, 7]
    },
    {
      fruits: generateFruits(9, '🍇'),
      correctAnswer: 9,
      options: [8, 9, 10, 11]
    },
    {
      fruits: generateFruits(6, '🍓'),
      correctAnswer: 6,
      options: [5, 6, 7, 8]
    }
  ];

  const handleAnswer = (selectedAnswer: number) => {
    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
      setShowFeedback('correct');
    } else {
      setShowFeedback('wrong');
    }

    setTimeout(() => {
      setShowFeedback(null);
      
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setGameCompleted(true);
      }
    }, 1500);
  };

  const getStarsEarned = () => {
    if (score === questions.length) return 3;
    if (score >= questions.length * 0.7) return 2;
    if (score >= questions.length * 0.4) return 1;
    return 0;
  };

  const handleComplete = () => {
    const stars = getStarsEarned();
    onComplete(stars);
  };

  if (gameCompleted) {
    const starsEarned = getStarsEarned();
    
    return (
      <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-green-400 to-blue-500 text-white text-center">
        <LitaCharacter mood="celebrating" size="large" className="mx-auto mb-6" />
        
        <h2 className="text-3xl font-bold mb-4">🎉 Permainan Selesai!</h2>
        <p className="text-xl mb-4">Skor: {score}/{questions.length}</p>
        
        <div className="flex justify-center gap-2 mb-6">
          {[...Array(3)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-8 h-8 ${i < starsEarned ? 'fill-yellow-400 text-yellow-400' : 'text-white/50'}`} 
            />
          ))}
        </div>
        
        <div className="space-y-4">
          <p className="text-lg">
            {starsEarned === 3 && "Luar biasa! Kamu jago menghitung! 🧮"}
            {starsEarned === 2 && "Bagus sekali! Terus berlatih! 👏"}
            {starsEarned === 1 && "Good job! Kamu bisa lebih baik lagi! 💪"}
            {starsEarned === 0 && "Jangan menyerah! Coba lagi ya! 🤗"}
          </p>
          
          <Button 
            onClick={handleComplete}
            className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-3"
          >
            Kembali ke Games
          </Button>
        </div>
      </Card>
    );
  }

  if (showFeedback) {
    return (
      <Card className={`max-w-2xl mx-auto p-8 text-center ${
        showFeedback === 'correct' 
          ? 'bg-gradient-to-br from-green-400 to-green-600 text-white' 
          : 'bg-gradient-to-br from-red-400 to-red-600 text-white'
      }`}>
        <LitaCharacter 
          mood={showFeedback === 'correct' ? 'celebrating' : 'thinking'} 
          size="large" 
          className="mx-auto mb-6" 
        />
        
        <h2 className="text-3xl font-bold mb-4">
          {showFeedback === 'correct' ? '🎉 Benar!' : '😅 Coba Lagi!'}
        </h2>
        
        <p className="text-xl">
          {showFeedback === 'correct' 
            ? 'Hebat! Kamu pandai menghitung!' 
            : `Jawaban yang benar adalah ${questions[currentQuestion].correctAnswer}`}
        </p>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-8 bg-white shadow-xl">
        {/* Progress */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-purple-600 font-semibold">
            Soal {currentQuestion + 1} dari {questions.length}
          </span>
          <div className="flex items-center gap-2 text-orange-500">
            <Star className="w-5 h-5 fill-current" />
            <span className="font-bold">Skor: {score}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div 
            className="bg-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <LitaCharacter mood="thinking" size="medium" className="mx-auto mb-4" />
          
          <h2 className="text-2xl font-bold text-purple-600 mb-6">
            Berapa banyak buah ini?
          </h2>
          
          {/* Fruits display */}
          <div className="grid grid-cols-5 gap-2 justify-items-center max-w-md mx-auto mb-6 p-4 bg-gray-50 rounded-xl">
            {questions[currentQuestion].fruits.map((fruit, index) => (
              <div key={index} className="text-4xl animate-bounce" style={{ animationDelay: `${index * 0.1}s` }}>
                {fruit}
              </div>
            ))}
          </div>
          
          <p className="text-gray-600 text-lg">
            🔢 Hitung dengan teliti ya!
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4">
          {questions[currentQuestion].options.map((option) => (
            <Button
              key={option}
              onClick={() => handleAnswer(option)}
              className="h-16 text-2xl font-bold bg-gradient-to-br from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white border-0 shadow-lg hover:scale-105 transition-transform"
            >
              {option}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default FruitCountGame;
