
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, RotateCcw } from 'lucide-react';
import LitaCharacter from '@/components/LitaCharacter';

interface WordPuzzleGameProps {
  onComplete: (stars: number) => void;
  onBack: () => void;
}

const WordPuzzleGame: React.FC<WordPuzzleGameProps> = ({ onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);

  const questions = [
    {
      word: 'KUCING',
      shuffledLetters: ['G', 'U', 'C', 'I', 'N', 'K'],
      hint: '🐱 Hewan yang suka minum susu',
      image: '🐱'
    },
    {
      word: 'RUMAH',
      shuffledLetters: ['H', 'R', 'A', 'U', 'M'],
      hint: '🏠 Tempat tinggal kita',
      image: '🏠'
    },
    {
      word: 'BUNGA',
      shuffledLetters: ['A', 'B', 'N', 'U', 'G'],
      hint: '🌸 Indah dan harum baunya',
      image: '🌸'
    },
    {
      word: 'MOBIL',
      shuffledLetters: ['L', 'M', 'I', 'O', 'B'],
      hint: '🚗 Kendaraan beroda empat',
      image: '🚗'
    },
    {
      word: 'BUKU',
      shuffledLetters: ['K', 'U', 'B', 'U'],
      hint: '📚 Untuk membaca dan belajar',
      image: '📚'
    }
  ];

  const handleLetterClick = (letter: string, index: number) => {
    setSelectedLetters([...selectedLetters, letter]);
  };

  const handleRemoveLetter = (index: number) => {
    const newSelected = selectedLetters.filter((_, i) => i !== index);
    setSelectedLetters(newSelected);
  };

  const handleReset = () => {
    setSelectedLetters([]);
  };

  const handleSubmit = () => {
    const formedWord = selectedLetters.join('');
    const isCorrect = formedWord === questions[currentQuestion].word;
    
    if (isCorrect) {
      setScore(score + 1);
      setShowFeedback('correct');
    } else {
      setShowFeedback('wrong');
    }

    setTimeout(() => {
      setShowFeedback(null);
      setSelectedLetters([]);
      
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
            {starsEarned === 3 && "Luar biasa! Kamu jago menyusun kata! 📝"}
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
            ? 'Hebat! Kamu berhasil menyusun kata!' 
            : `Kata yang benar adalah "${questions[currentQuestion].word}"`}
        </p>
      </Card>
    );
  }

  const currentQuestionData = questions[currentQuestion];
  const remainingLetters = currentQuestionData.shuffledLetters.filter(
    (letter, index) => !selectedLetters.includes(letter) || 
    selectedLetters.filter(l => l === letter).length < currentQuestionData.shuffledLetters.filter(l => l === letter).length
  );

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
          
          <h2 className="text-2xl font-bold text-purple-600 mb-4">
            Susun huruf menjadi kata!
          </h2>
          
          <div className="text-6xl mb-4">{currentQuestionData.image}</div>
          
          <p className="text-gray-600 text-lg mb-6">
            💡 {currentQuestionData.hint}
          </p>

          {/* Selected Letters Area */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 min-h-[80px] flex items-center justify-center">
            <div className="flex gap-2 flex-wrap justify-center">
              {selectedLetters.length === 0 ? (
                <span className="text-gray-400 text-lg">Pilih huruf di bawah...</span>
              ) : (
                selectedLetters.map((letter, index) => (
                  <Button
                    key={index}
                    onClick={() => handleRemoveLetter(index)}
                    className="w-12 h-12 text-xl font-bold bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    {letter}
                  </Button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Available Letters */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {remainingLetters.map((letter, index) => (
            <Button
              key={`${letter}-${index}`}
              onClick={() => handleLetterClick(letter, index)}
              className="h-12 text-xl font-bold bg-gradient-to-br from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white border-0 shadow-lg hover:scale-105 transition-transform"
            >
              {letter}
            </Button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={handleReset}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
          
          <Button
            onClick={handleSubmit}
            disabled={selectedLetters.length === 0}
            className="bg-green-500 hover:bg-green-600 text-white px-8"
          >
            Kirim Jawaban
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default WordPuzzleGame;
