
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import LitaCharacter from '@/components/LitaCharacter';

interface ColorPickGameProps {
  onComplete: (stars: number) => void;
  onBack: () => void;
}

const ColorPickGame: React.FC<ColorPickGameProps> = ({ onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);

  const questions = [
    {
      question: "Pilih warna MERAH",
      correctAnswer: 'red',
      options: [
        { color: 'red', name: 'Merah', bgClass: 'bg-red-500' },
        { color: 'blue', name: 'Biru', bgClass: 'bg-blue-500' },
        { color: 'green', name: 'Hijau', bgClass: 'bg-green-500' },
        { color: 'yellow', name: 'Kuning', bgClass: 'bg-yellow-500' }
      ]
    },
    {
      question: "Warna apel hijau adalah...",
      correctAnswer: 'green',
      options: [
        { color: 'purple', name: 'Ungu', bgClass: 'bg-purple-500' },
        { color: 'green', name: 'Hijau', bgClass: 'bg-green-500' },
        { color: 'orange', name: 'Oranye', bgClass: 'bg-orange-500' },
        { color: 'pink', name: 'Pink', bgClass: 'bg-pink-500' }
      ]
    },
    {
      question: "Pilih warna BIRU",
      correctAnswer: 'blue',
      options: [
        { color: 'red', name: 'Merah', bgClass: 'bg-red-500' },
        { color: 'blue', name: 'Biru', bgClass: 'bg-blue-500' },
        { color: 'brown', name: 'Coklat', bgClass: 'bg-amber-700' },
        { color: 'gray', name: 'Abu-abu', bgClass: 'bg-gray-500' }
      ]
    },
    {
      question: "Warna matahari adalah...",
      correctAnswer: 'yellow',
      options: [
        { color: 'blue', name: 'Biru', bgClass: 'bg-blue-500' },
        { color: 'green', name: 'Hijau', bgClass: 'bg-green-500' },
        { color: 'yellow', name: 'Kuning', bgClass: 'bg-yellow-500' },
        { color: 'purple', name: 'Ungu', bgClass: 'bg-purple-500' }
      ]
    },
    {
      question: "Pilih warna UNGU",
      correctAnswer: 'purple',
      options: [
        { color: 'purple', name: 'Ungu', bgClass: 'bg-purple-500' },
        { color: 'orange', name: 'Oranye', bgClass: 'bg-orange-500' },
        { color: 'pink', name: 'Pink', bgClass: 'bg-pink-500' },
        { color: 'red', name: 'Merah', bgClass: 'bg-red-500' }
      ]
    }
  ];

  const handleAnswer = (selectedColor: string) => {
    const isCorrect = selectedColor === questions[currentQuestion].correctAnswer;
    
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
            {starsEarned === 3 && "Luar biasa! Kamu mengenal warna dengan baik! 🎨"}
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
    const correctOption = questions[currentQuestion].options.find(
      opt => opt.color === questions[currentQuestion].correctAnswer
    );
    
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
        
        {showFeedback === 'correct' ? (
          <p className="text-xl">Hebat! Kamu memilih warna yang tepat!</p>
        ) : (
          <div>
            <p className="text-xl mb-4">Jawaban yang benar adalah:</p>
            <div className={`w-16 h-16 ${correctOption?.bgClass} rounded-full mx-auto mb-2 shadow-lg`}></div>
            <p className="text-lg font-bold">{correctOption?.name}</p>
          </div>
        )}
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
            {questions[currentQuestion].question}
          </h2>
          
          <p className="text-gray-600 text-lg">
            🎨 Pilih warna yang tepat!
          </p>
        </div>

        {/* Color Options */}
        <div className="grid grid-cols-2 gap-4">
          {questions[currentQuestion].options.map((option) => (
            <Button
              key={option.color}
              onClick={() => handleAnswer(option.color)}
              className="h-24 flex flex-col items-center justify-center bg-white border-2 border-gray-200 hover:border-purple-400 hover:scale-105 transition-all shadow-lg"
            >
              <div className={`w-12 h-12 ${option.bgClass} rounded-full mb-2 shadow-md`}></div>
              <span className="text-gray-700 font-bold">{option.name}</span>
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ColorPickGame;
