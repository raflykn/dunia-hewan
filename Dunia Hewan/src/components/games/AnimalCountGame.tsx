
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import animalsData from '@/data/animals.json';

interface AnimalCountGameProps {
  onComplete: (stars: number) => void;
  onBack: () => void;
}

const AnimalCountGame: React.FC<AnimalCountGameProps> = ({ onComplete, onBack }) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    generateQuestions();
  }, []);

  const generateQuestions = () => {
    const allAnimals = Object.values(animalsData.habitats).flatMap(habitat => habitat.animals);
    
    const newQuestions = Array.from({ length: 5 }, () => {
      const animal = allAnimals[Math.floor(Math.random() * allAnimals.length)];
      const count = Math.floor(Math.random() * 9) + 1; // 1-9 animals
      
      // Generate wrong answers
      const wrongAnswers = [];
      while (wrongAnswers.length < 3) {
        const wrong = Math.floor(Math.random() * 9) + 1;
        if (wrong !== count && !wrongAnswers.includes(wrong)) {
          wrongAnswers.push(wrong);
        }
      }
      
      const options = [count, ...wrongAnswers].sort(() => Math.random() - 0.5);
      
      return {
        animal,
        count,
        options,
        animals: Array(count).fill(animal.emoji)
      };
    });
    
    setQuestions(newQuestions);
  };

  const handleAnswer = (answer: number) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === questions[currentQuestion].count) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
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

  if (questions.length === 0) {
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
            Kamu berhasil menghitung dengan benar {score} dari {questions.length} soal!
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

  const question = questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 text-center">
        <div className="bg-white/90 rounded-xl px-4 py-2 shadow-lg inline-block">
          <span className="text-purple-600 font-bold">
            Soal {currentQuestion + 1} dari {questions.length}
          </span>
        </div>
      </div>

      <Card className="p-8 bg-white shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Berapa banyak {question.animal.nama}?
          </h2>
        </div>

        {/* Animals Display */}
        <div className="mb-8 p-6 bg-blue-50 rounded-xl">
          <div className="flex flex-wrap justify-center gap-4">
            {question.animals.map((emoji: string, index: number) => (
              <div 
                key={index} 
                className="text-4xl animate-bounce-gentle"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {question.options.map((option: number, index: number) => {
            let buttonClass = "p-6 text-2xl font-bold transition-all duration-200 ";
            
            if (showResult) {
              if (option === question.count) {
                buttonClass += "bg-green-500 hover:bg-green-500 text-white";
              } else if (option === selectedAnswer && option !== question.count) {
                buttonClass += "bg-red-500 hover:bg-red-500 text-white";
              } else {
                buttonClass += "bg-gray-300 text-gray-600";
              }
            } else {
              buttonClass += "bg-blue-100 hover:bg-blue-200 text-blue-800";
            }

            return (
              <Button
                key={index}
                onClick={() => !showResult && handleAnswer(option)}
                disabled={showResult}
                className={buttonClass}
              >
                {option}
              </Button>
            );
          })}
        </div>

        {showResult && (
          <div className="text-center">
            <div className={`text-xl font-bold ${
              selectedAnswer === question.count ? 'text-green-600' : 'text-red-600'
            }`}>
              {selectedAnswer === question.count ? '🎉 Benar!' : '❌ Kurang tepat'}
            </div>
            {selectedAnswer !== question.count && (
              <p className="text-gray-600 mt-2">
                Jumlah yang benar: {question.count}
              </p>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default AnimalCountGame;
