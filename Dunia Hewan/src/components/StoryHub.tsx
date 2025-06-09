
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, Lock } from 'lucide-react';
import LitaCharacter from '@/components/LitaCharacter';
import StoryViewer from '@/components/StoryViewer';

interface StoryHubProps {
  playerData: any;
  updatePlayerData: (data: any) => void;
  addStars: (amount: number) => void;
  onBack: () => void;
}

const StoryHub: React.FC<StoryHubProps> = ({ playerData, updatePlayerData, addStars, onBack }) => {
  const [currentStory, setCurrentStory] = useState<string | null>(null);

  const stories = [
    {
      id: 'forest',
      title: 'Hutan Ajaib',
      description: 'Lita bertemu dengan hewan-hewan lucu di hutan',
      icon: '🌲',
      color: 'from-green-400 to-green-600',
      requiredStars: 0,
      isUnlocked: true
    },
    {
      id: 'ocean',
      title: 'Lautan Biru',
      description: 'Petualangan Lita di bawah laut',
      icon: '🌊',
      color: 'from-blue-400 to-blue-600',
      requiredStars: 5,
      isUnlocked: playerData.stars >= 5
    },
    {
      id: 'space',
      title: 'Luar Angkasa',
      description: 'Lita menjelajahi planet-planet',
      icon: '🚀',
      color: 'from-purple-400 to-purple-600',
      requiredStars: 10,
      isUnlocked: playerData.stars >= 10
    },
    {
      id: 'city',
      title: 'Kota Modern',
      description: 'Lita belajar tentang kehidupan kota',
      icon: '🏙️',
      color: 'from-gray-400 to-gray-600',
      requiredStars: 15,
      isUnlocked: playerData.stars >= 15
    }
  ];

  const handleStoryComplete = (storyId: string, starsEarned: number) => {
    addStars(starsEarned);
    
    // Buka cerita berikutnya jika ada
    const currentIndex = stories.findIndex(s => s.id === storyId);
    if (currentIndex < stories.length - 1) {
      const nextStory = stories[currentIndex + 1];
      if (playerData.stars + starsEarned >= nextStory.requiredStars) {
        const unlockedStories = [...playerData.unlockedStories];
        if (!unlockedStories.includes(nextStory.id)) {
          unlockedStories.push(nextStory.id);
          updatePlayerData({ unlockedStories });
        }
      }
    }
    
    setCurrentStory(null);
  };

  if (currentStory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 p-4">
        <div className="max-w-4xl mx-auto">
          <Button 
            onClick={() => setCurrentStory(null)}
            className="mb-4 bg-white/90 text-purple-600 hover:bg-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Cerita
          </Button>
          
          <StoryViewer 
            storyId={currentStory}
            onComplete={(starsEarned: number) => handleStoryComplete(currentStory, starsEarned)}
            onBack={() => setCurrentStory(null)}
          />
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
            📖 Petualangan Lita
          </h1>
          <p className="text-white/90 text-lg">Pilih cerita dan ikuti petualangan Lita!</p>
        </div>

        {/* Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {stories.map((story) => (
            <Card 
              key={story.id}
              className={`p-6 bg-gradient-to-br ${story.color} border-0 shadow-xl relative overflow-hidden ${
                story.isUnlocked 
                  ? 'hover:scale-105 transition-transform cursor-pointer' 
                  : 'opacity-60'
              }`}
              onClick={() => story.isUnlocked && setCurrentStory(story.id)}
            >
              {/* Lock icon for locked stories */}
              {!story.isUnlocked && (
                <div className="absolute top-4 right-4 bg-black/20 rounded-full p-2">
                  <Lock className="w-6 h-6 text-white" />
                </div>
              )}
              
              <div className="text-center text-white">
                <div className="text-4xl mb-3">{story.icon}</div>
                <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                <p className="text-white/90 text-sm mb-4">{story.description}</p>
                
                <div className="space-y-2">
                  {story.isUnlocked ? (
                    <div className="bg-white/20 px-3 py-1 rounded-full text-sm inline-block">
                      ✨ Siap Dibaca
                    </div>
                  ) : (
                    <div className="bg-black/20 px-3 py-1 rounded-full text-sm inline-block">
                      🔒 Butuh {story.requiredStars} Bintang
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Character Info */}
        <div className="text-center">
          <div className="bg-white/90 rounded-xl p-6 shadow-lg inline-block">
            <LitaCharacter mood="happy" size="medium" className="mx-auto mb-4" />
            <h3 className="text-purple-600 font-bold text-lg mb-2">Tentang Lita</h3>
            <p className="text-gray-600 max-w-md">
              Lita adalah seorang petualang kecil yang suka belajar hal-hal baru. 
              Dia akan mengajakmu menjelajahi berbagai tempat menarik dan bertemu 
              teman-teman baru di setiap petualangan!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryHub;
