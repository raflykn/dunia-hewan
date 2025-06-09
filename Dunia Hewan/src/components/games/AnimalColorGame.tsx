
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

interface AnimalColorGameProps {
  onComplete: (stars: number) => void;
  onBack: () => void;
}

const AnimalColorGame: React.FC<AnimalColorGameProps> = ({ onComplete, onBack }) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    generateQuestions();
  }, []);

  const generateQuestions = () => {
    const colorQuestions = [
      {
        animal: 'Zebra',
        emoji: '🦓',
        question: 'Apa warna khas zebra?',
        correct: 'Hitam Putih',
        options: ['Hitam Putih', 'Coklat', 'Kuning', 'Abu-abu']
      },
      {
        animal: 'Singa',
        emoji: '🦁',
        question: 'Apa warna khas singa?',
        correct: 'Kuning Keemasan',
        options: ['Kuning Keemasan', 'Hitam', 'Putih', 'Merah']
      },
      {
        animal: 'Harimau',
        emoji: '🐅',
        question: 'Apa warna khas harimau?',
        correct: 'Orange Hitam',
        options: ['Orange Hitam', 'Putih', 'Coklat', 'Kuning']
      },
      {
        animal: 'Beruang Kutub',
        emoji: '🐻‍❄️',
        question: 'Apa warna khas beruang kutub?',
        correct: 'Putih',
        options: ['Putih', 'Hitam', 'Coklat', 'Abu-abu']
      },
      {
        animal: 'Pinguin',
        emoji: '🐧',
        question: 'Apa warna khas pinguin?',
        correct: 'Hitam Putih',
        options: ['Hitam Putih', 'Biru', 'Kuning', 'Merah']
      }
    ];

    const shuffled = [...colorQuestions].sort(() => Math.random() - 0.5).slice(0, 5);
    setQuestions(shuffled);
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === questions[currentQuestion].correct) {
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
            Kamu berhasil mengenali warna {score} dari {questions.length} hewan!
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
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 text-center">
        <div className="bg-white/90 rounded-xl px-4 py-2 shadow-lg inline-block">
          <span className="text-purple-600 font-bold">
            Pertanyaan {currentQuestion + 1} dari {questions.length}
          </span>
        </div>
      </div>

      <Card className="p-8 bg-white shadow-2xl">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce-gentle">{question.emoji}</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {question.question}
          </h2>
          <p className="text-lg text-gray-600">{question.animal}</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {question.options.map((option: string, index: number) => {
            let buttonClass = "p-4 text-lg font-semibold transition-all duration-200 ";
            
            if (showResult) {
              if (option === question.correct) {
                buttonClass += "bg-green-500 hover:bg-green-500 text-white";
              } else if (option === selectedAnswer && option !== question.correct) {
                buttonClass += "bg-red-500 hover:bg-red-500 text-white";
              } else {
                buttonClass += "bg-gray-300 text-gray-600";
              }
            } else {
              buttonClass += "bg-purple-100 hover:bg-purple-200 text-purple-800";
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
          <div className="mt-6 text-center">
            <div className={`text-xl font-bold ${
              selectedAnswer === question.correct ? 'text-green-600' : 'text-red-600'
            }`}>
              {selectedAnswer === question.correct ? '🎉 Benar!' : '❌ Kurang tepat'}
            </div>
            {selectedAnswer !== question.correct && (
              <p className="text-gray-600 mt-2">
                Jawaban yang benar: {question.correct}
              </p>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default AnimalColorGame;
