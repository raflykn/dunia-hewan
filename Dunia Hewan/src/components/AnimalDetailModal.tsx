
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface AnimalDetailModalProps {
  animal: any;
  onClose: () => void;
}

const AnimalDetailModal: React.FC<AnimalDetailModalProps> = ({ animal, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playSound = () => {
    setIsPlaying(true);
    // Simulate sound playing
    setTimeout(() => setIsPlaying(false), 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Detail Hewan</h2>
          <Button 
            onClick={onClose}
            className="p-2 h-auto bg-gray-100 hover:bg-gray-200 text-gray-600"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="text-center">
          {/* Animal Animation */}
          <div className="text-8xl mb-4 animate-bounce-gentle">
            {animal.emoji}
          </div>

          {/* Animal Info */}
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{animal.nama}</h3>
          <p className="text-sm text-gray-600 italic mb-4">{animal.latin}</p>

          {/* Diet Badge */}
          <div className="flex justify-center mb-4">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              animal.jenis_makanan === 'Herbivora' ? 'bg-green-100 text-green-700' :
              animal.jenis_makanan === 'Karnivora' ? 'bg-red-100 text-red-700' :
              'bg-yellow-100 text-yellow-700'
            }`}>
              {animal.jenis_makanan}
            </span>
          </div>

          {/* Animal Details */}
          <div className="space-y-3 text-left">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm"><strong>🏠 Habitat:</strong> {animal.habitat}</p>
            </div>
            
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm"><strong>🍽️ Makanan:</strong> {animal.makanan}</p>
            </div>
            
            <div className="bg-yellow-50 p-3 rounded-lg">
              <p className="text-sm"><strong>🔍 Ciri-ciri:</strong> {animal.ciri}</p>
            </div>
            
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-sm"><strong>💡 Fakta Menarik:</strong> {animal.fakta}</p>
            </div>
          </div>

          {/* Sound Button */}
          <Button 
            onClick={playSound}
            className={`mt-4 w-full ${isPlaying ? 'animate-pulse' : ''}`}
            disabled={isPlaying}
          >
            🔊 {isPlaying ? 'Memainkan suara...' : `Dengar suara: "${animal.suara}"`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetailModal;
