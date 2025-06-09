
import React from 'react';

interface LitaCharacterProps {
  mood?: 'happy' | 'excited' | 'thinking' | 'celebrating';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const LitaCharacter: React.FC<LitaCharacterProps> = ({ 
  mood = 'happy', 
  size = 'medium',
  className = '' 
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small': return 'w-16 h-16';
      case 'large': return 'w-32 h-32';
      default: return 'w-24 h-24';
    }
  };

  const getAnimationClass = () => {
    switch (mood) {
      case 'excited': return 'animate-bounce';
      case 'celebrating': return 'animate-pulse';
      case 'thinking': return 'animate-pulse';
      default: return 'hover:scale-110 transition-transform';
    }
  };

  return (
    <div className={`${getSizeClasses()} ${getAnimationClass()} ${className} relative`}>
      {/* Karakter Lita - representasi sederhana dengan emoji dan styling */}
      <div className="w-full h-full bg-gradient-to-br from-purple-300 to-pink-400 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
        <div className="text-center">
          {mood === 'happy' && <span className="text-2xl">😊</span>}
          {mood === 'excited' && <span className="text-2xl">🤩</span>}
          {mood === 'thinking' && <span className="text-2xl">🤔</span>}
          {mood === 'celebrating' && <span className="text-2xl">🎉</span>}
        </div>
      </div>
      
      {/* Nama karakter */}
      {size === 'large' && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-white px-3 py-1 rounded-full shadow-md">
            <span className="text-purple-600 font-bold text-sm">Lita</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LitaCharacter;
