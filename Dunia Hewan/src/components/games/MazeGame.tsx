
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ArrowRight } from 'lucide-react';
import LitaCharacter from '@/components/LitaCharacter';

interface MazeGameProps {
  onComplete: (stars: number) => void;
  onBack: () => void;
}

const MazeGame: React.FC<MazeGameProps> = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [playerPosition, setPlayerPosition] = useState(0);

  const mazeSteps = [
    {
      question: "Berapa hasil 2 + 3?",
      options: ["4", "5", "6", "7"],
      correctAnswer: "5",
      description: "Lita menemukan pintu dengan teka-teki matematika!"
    },
    {
      question: "Huruf pertama dari kata 'BUKU' adalah?",
      options: ["A", "B", "C", "D"],
      correctAnswer: "B",
      description: "Ada jembatan dengan pertanyaan huruf!"
    },
    {
      question: "Warna daun biasanya adalah?",
      options: ["Merah", "Biru", "Hijau", "Ungu"],
      correctAnswer: "Hijau",
      description: "Lita harus menjawab tentang alam!"
    },
    {
      question: "Berapa kaki yang dimiliki kucing?",
      options: ["2", "3", "4", "5"],
      correctAnswer: "4",
      description: "Pertanyaan tentang hewan di tengah labirin!"
    },
    {
      question: "Bentuk yang memiliki 3 sisi adalah?",
      options: ["Lingkaran", "Persegi", "Segitiga", "Bintang"],
      correctAnswer: "Segitiga",
      description: "Gerbang terakhir dengan teka-teki bentuk!"
    }
  ];

  const handleAnswer = (selectedAnswer: string) => {
    const isCorrect = selectedAnswer === mazeSteps[currentStep].correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
      setPlayerPosition(playerPosition + 1);
      setShowFeedback('correct');
    } else {
      setShowFeedback('wrong');
    }

    setTimeout(() => {
      setShowFeedback(null);
      
      if (currentStep + 1 < mazeSteps.length) {
        setCurrentStep(currentStep + 1);
      } else {
        setGameCompleted(true);
      }
    }, 1500);
  };

  const getStarsEarned = () => {
    if (score === mazeSteps.length) return 3;
    if (score >= mazeSteps.length * 0.7) return 2;
    if (score >= mazeSteps.length * 0.4) return 1;
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
        
        <h2 className="text-3xl font-bold mb-4">🎉 Lita Berhasil Keluar!</h2>
        <p className="text-xl mb-4">Skor: {score}/{mazeSteps.length}</p>
        
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
            {starsEarned === 3 && "Luar biasa! Lita melewati labirin dengan sempurna! 🌟"}
            {starsEarned === 2 && "Bagus sekali! Petualangan yang hebat! 👏"}
            {starsEarned === 1 && "Good job! Lita sampai di ujung labirin! 💪"}
            {starsEarned === 0 && "Lita butuh bantuan lebih! Coba lagi ya! 🤗"}
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
          {showFeedback === 'correct' ? '🎉 Benar! Lita Maju!' : '😅 Oops! Coba Lagi!'}
        </h2>
        
        <p className="text-xl">
          {showFeedback === 'correct' 
            ? 'Hebat! Lita berhasil melewati rintangan!' 
            : `Jawaban yang benar adalah "${mazeSteps[currentStep].correctAnswer}"`}
        </p>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-8 bg-white shadow-xl">
        {/* Progress & Maze Visual */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-purple-600 font-semibold">
              Langkah {currentStep + 1} dari {mazeSteps.length}
            </span>
            <div className="flex items-center gap-2 text-orange-500">
              <Star className="w-5 h-5 fill-current" />
              <span className="font-bold">Skor: {score}</span>
            </div>
          </div>

          {/* Simple Maze Visualization */}
          <div className="bg-gray-100 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-center gap-2">
              {[...Array(mazeSteps.length + 1)].map((_, index) => (
                <React.Fragment key={index}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= playerPosition 
                      ? 'bg-green-500 text-white' 
                      : index === playerPosition + 1 
                      ? 'bg-yellow-400 text-white animate-pulse'
                      : 'bg-gray-300'
                  }`}>
                    {index === playerPosition && '👤'}
                    {index === mazeSteps.length && '🏆'}
                    {index < playerPosition && '✓'}
                  </div>
                  {index < mazeSteps.length && (
                    <ArrowRight className={`w-4 h-4 ${
                      index < playerPosition ? 'text-green-500' : 'text-gray-400'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
            <p className="text-center text-sm text-gray-600 mt-2">
              Jalur Petualangan Lita
            </p>
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <LitaCharacter mood="thinking" size="medium" className="mx-auto mb-4" />
          
          <div className="bg-blue-50 rounded-xl p-4 mb-4">
            <p className="text-blue-600 font-semibold mb-2">
              {mazeSteps[currentStep].description}
            </p>
          </div>
          
          <h2 className="text-2xl font-bold text-purple-600 mb-6">
            {mazeSteps[currentStep].question}
          </h2>
          
          <p className="text-gray-600 text-lg">
            🧭 Bantu Lita memilih jalan yang benar!
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4">
          {mazeSteps[currentStep].options.map((option, index) => (
            <Button
              key={option}
              onClick={() => handleAnswer(option)}
              className="h-16 text-lg font-bold bg-gradient-to-br from-indigo-400 to-purple-500 hover:from-indigo-500 hover:to-purple-600 text-white border-0 shadow-lg hover:scale-105 transition-transform"
            >
              {option}
            </Button>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            💡 Tip: Pikir baik-baik sebelum memilih jalur!
          </p>
        </div>
      </Card>
    </div>
  );
};

export default MazeGame;
