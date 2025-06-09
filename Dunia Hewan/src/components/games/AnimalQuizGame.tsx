
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import animalsData from '@/data/animals.json';

interface AnimalQuizGameProps {
  onComplete: (stars: number) => void;
  onBack: () => void;
}

const AnimalQuizGame: React.FC<AnimalQuizGameProps> = ({ onComplete, onBack }) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    generateQuestions();
  }, []);

  const generateQuestions = () => {
    const allAnimals = Object.values(animalsData.habitats).flatMap(habitat => habitat.animals);
    const shuffled = [...allAnimals].sort(() => Math.random() - 0.5);
    
    const newQuestions = shuffled.slice(0, 5).map((animal, index) => {
      const questionTypes = [
        {
          question: `Hewan apa yang hidup di ${animal.habitat}?`,
          correct: animal.nama,
          type: 'habitat'
        },
        {
          question: `Hewan apa yang termasuk ${animal.jenis_makanan}?`,
          correct: animal.nama,
          type: 'diet'
        },
        {
          question: `Hewan apa yang makanannya ${animal.makanan}?`,
          correct: animal.nama,
          type: 'food'
        }
      ];
      
      const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      
      // Generate wrong answers
      const wrongAnimals = allAnimals
        .filter(a => a.id !== animal.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      
      const options = [animal, ...wrongAnimals]
        .sort(() => Math.random() - 0.5)
        .map(a => a.nama);
      
      return {
        ...questionType,
        animal: animal,
        options: options
      };
    });
    
    setQuestions(newQuestions);
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
        <div className="text-white text-xl">Mempersiapkan kuis...</div>
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
            {stars === 3 ? 'Luar Biasa!' : stars === 2 ? 'Hebat!' : stars === 1 ? 'Bagus!' : 'Tetap Semangat!'}
          </h2>
          
          <p className="text-xl mb-6 text-gray-600">
            Kamu berhasil menjawab {score} dari {questions.length} pertanyaan!
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
          <div className="text-6xl mb-4">{question.animal.emoji}</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {question.question}
          </h2>
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

export default AnimalQuizGame;
