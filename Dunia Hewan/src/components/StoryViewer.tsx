
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Star } from 'lucide-react';
import LitaCharacter from '@/components/LitaCharacter';

interface StoryViewerProps {
  storyId: string;
  onComplete: (stars: number) => void;
  onBack: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ storyId, onComplete, onBack }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [missionCompleted, setMissionCompleted] = useState(false);
  const [showMission, setShowMission] = useState(false);

  const stories = {
    forest: {
      title: 'Petualangan di Hutan Ajaib',
      pages: [
        {
          image: '🌲',
          text: 'Suatu hari, Lita berjalan-jalan ke hutan dekat rumahnya. Pohon-pohon tinggi menjulang ke langit.',
          background: 'from-green-300 to-green-500'
        },
        {
          image: '🐰',
          text: 'Di dalam hutan, Lita bertemu seekor kelinci putih yang lucu. "Halo!" sapa Lita ramah.',
          background: 'from-green-400 to-blue-400'
        },
        {
          image: '🦋',
          text: 'Kelinci itu menunjukkan jalan ke taman kupu-kupu yang indah. Warna-warni kupu-kupu beterbangan.',
          background: 'from-blue-300 to-purple-400'
        },
        {
          image: '🌸',
          text: 'Lita belajar nama-nama bunga dari kelinci. Ada mawar, melati, dan tulip yang cantik.',
          background: 'from-pink-300 to-purple-400'
        }
      ],
      mission: {
        question: 'Hewan apa yang ditemui Lita di hutan?',
        options: ['Kucing', 'Kelinci', 'Anjing', 'Burung'],
        correctAnswer: 'Kelinci'
      }
    },
    ocean: {
      title: 'Petualangan di Lautan Biru',
      pages: [
        {
          image: '🌊',
          text: 'Lita naik perahu kecil dan berlayar ke tengah lautan yang biru jernih.',
          background: 'from-blue-300 to-blue-500'
        },
        {
          image: '🐠',
          text: 'Di bawah air, Lita melihat ikan-ikan warna-warni berenang dengan gembira.',
          background: 'from-blue-400 to-teal-400'
        },
        {
          image: '🐙',
          text: 'Gurita ramah mengajak Lita bermain petak umpet di antara karang laut.',
          background: 'from-teal-300 to-cyan-400'
        },
        {
          image: '🏝️',
          text: 'Lita menemukan pulau kecil dengan pantai berpasir putih dan kelapa segar.',
          background: 'from-cyan-300 to-yellow-400'
        }
      ],
      mission: {
        question: 'Berapa banyak kaki yang dimiliki gurita?',
        options: ['6', '8', '10', '12'],
        correctAnswer: '8'
      }
    },
    space: {
      title: 'Petualangan di Luar Angkasa',
      pages: [
        {
          image: '🚀',
          text: 'Lita naik roket dan terbang ke luar angkasa untuk melihat bintang-bintang.',
          background: 'from-purple-500 to-black'
        },
        {
          image: '🌙',
          text: 'Di bulan, Lita bertemu alien kecil yang sangat ramah dan lucu.',
          background: 'from-gray-400 to-purple-500'
        },
        {
          image: '⭐',
          text: 'Alien mengajak Lita berkeliling dan melihat planet-planet yang indah.',
          background: 'from-purple-400 to-pink-500'
        },
        {
          image: '🌍',
          text: 'Dari luar angkasa, Lita bisa melihat Bumi yang hijau dan biru.',
          background: 'from-blue-500 to-green-500'
        }
      ],
      mission: {
        question: 'Planet mana yang kita tinggali?',
        options: ['Mars', 'Venus', 'Bumi', 'Jupiter'],
        correctAnswer: 'Bumi'
      }
    },
    city: {
      title: 'Petualangan di Kota Modern',
      pages: [
        {
          image: '🏙️',
          text: 'Lita pergi ke kota besar dan melihat gedung-gedung tinggi menjulang.',
          background: 'from-gray-300 to-blue-400'
        },
        {
          image: '🚌',
          text: 'Lita naik bus kota dan bertemu banyak orang dari berbagai profesi.',
          background: 'from-yellow-300 to-orange-400'
        },
        {
          image: '🏥',
          text: 'Di rumah sakit, Lita bertemu dokter yang baik hati dan perawat yang ramah.',
          background: 'from-white to-blue-300'
        },
        {
          image: '📚',
          text: 'Di perpustakaan, Lita membaca banyak buku dan belajar hal-hal baru.',
          background: 'from-brown-300 to-yellow-300'
        }
      ],
      mission: {
        question: 'Siapa yang bekerja di rumah sakit untuk merawat orang sakit?',
        options: ['Guru', 'Dokter', 'Pilot', 'Chef'],
        correctAnswer: 'Dokter'
      }
    }
  };

  const currentStory = stories[storyId];
  
  if (!currentStory) {
    return <div>Cerita tidak ditemukan</div>;
  }

  const handleMissionAnswer = (answer: string) => {
    if (answer === currentStory.mission.correctAnswer) {
      setMissionCompleted(true);
      setTimeout(() => {
        onComplete(2); // Berikan 2 bintang untuk menyelesaikan cerita
      }, 2000);
    } else {
      // Jika salah, masih bisa lanjut tapi dapat 1 bintang saja
      setTimeout(() => {
        onComplete(1);
      }, 1500);
    }
  };

  if (missionCompleted) {
    return (
      <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-yellow-400 to-orange-500 text-white text-center">
        <LitaCharacter mood="celebrating" size="large" className="mx-auto mb-6" />
        
        <h2 className="text-3xl font-bold mb-4">🎉 Misi Selesai!</h2>
        <p className="text-xl mb-4">Lita berhasil menyelesaikan petualangannya!</p>
        
        <div className="flex justify-center gap-2 mb-6">
          <Star className="w-8 h-8 fill-yellow-300 text-yellow-300" />
          <Star className="w-8 h-8 fill-yellow-300 text-yellow-300" />
        </div>
        
        <p className="text-lg">Kamu mendapat 2 bintang! ⭐⭐</p>
      </Card>
    );
  }

  if (showMission) {
    return (
      <Card className="max-w-2xl mx-auto p-8 bg-white shadow-xl">
        <div className="text-center mb-6">
          <LitaCharacter mood="thinking" size="large" className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-purple-600 mb-4">🎯 Misi Edukatif</h2>
          <p className="text-gray-600 mb-6">Bantu Lita menjawab pertanyaan ini!</p>
        </div>

        <div className="bg-purple-50 rounded-xl p-6 mb-6 text-center">
          <h3 className="text-xl font-bold text-purple-700 mb-4">
            {currentStory.mission.question}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {currentStory.mission.options.map((option) => (
            <Button
              key={option}
              onClick={() => handleMissionAnswer(option)}
              className="h-16 text-lg font-bold bg-gradient-to-br from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white border-0 shadow-lg hover:scale-105 transition-transform"
            >
              {option}
            </Button>
          ))}
        </div>
      </Card>
    );
  }

  const currentPageData = currentStory.pages[currentPage];
  const isLastPage = currentPage === currentStory.pages.length - 1;

  return (
    <Card className="max-w-2xl mx-auto shadow-xl overflow-hidden">
      <div className={`bg-gradient-to-br ${currentPageData.background} p-8 text-white min-h-[500px] flex flex-col justify-center`}>
        {/* Story Content */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-6">{currentPageData.image}</div>
          <p className="text-xl leading-relaxed font-medium">
            {currentPageData.text}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            variant="outline"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>

          <div className="flex gap-2">
            {currentStory.pages.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentPage ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={() => {
              if (isLastPage) {
                setShowMission(true);
              } else {
                setCurrentPage(currentPage + 1);
              }
            }}
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            {isLastPage ? 'Misi' : 'Lanjut'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Story Info */}
      <div className="bg-white p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-purple-600">{currentStory.title}</h3>
          <span className="text-sm text-gray-500">
            Halaman {currentPage + 1} dari {currentStory.pages.length}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default StoryViewer;
