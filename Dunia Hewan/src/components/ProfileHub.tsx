
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, User, Star, Edit, Save } from 'lucide-react';
import LitaCharacter from '@/components/LitaCharacter';

interface ProfileHubProps {
  playerData: any;
  updatePlayerData: (data: any) => void;
  onBack: () => void;
}

const ProfileHub: React.FC<ProfileHubProps> = ({ playerData, updatePlayerData, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(playerData.name);
  const [editAge, setEditAge] = useState(playerData.age);

  const handleSave = () => {
    updatePlayerData({
      name: editName || 'Petualang Kecil',
      age: Math.max(5, Math.min(10, parseInt(editAge) || 7))
    });
    setIsEditing(false);
  };

  const resetProgress = () => {
    if (confirm('Apakah kamu yakin ingin mengulang dari awal? Semua progres akan hilang.')) {
      updatePlayerData({
        stars: 0,
        stickers: [],
        completedGames: [],
        unlockedStories: ['forest'],
        currentStory: 'forest'
      });
    }
  };

  const getPlayerLevel = () => {
    const stars = playerData.stars;
    if (stars >= 20) return { level: 'Master', color: 'from-purple-500 to-pink-500', icon: '👑' };
    if (stars >= 15) return { level: 'Ahli', color: 'from-blue-500 to-purple-500', icon: '🎓' };
    if (stars >= 10) return { level: 'Mahir', color: 'from-green-500 to-blue-500', icon: '⭐' };
    if (stars >= 5) return { level: 'Pemula+', color: 'from-yellow-500 to-green-500', icon: '🌟' };
    return { level: 'Pemula', color: 'from-orange-500 to-yellow-500', icon: '🌱' };
  };

  const playerLevel = getPlayerLevel();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 p-4">
      <div className="max-w-2xl mx-auto">
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
            👤 Profil Saya
          </h1>
          <p className="text-white/90 text-lg">Kelola informasi dan progres belajarmu!</p>
        </div>

        {/* Profile Card */}
        <Card className="p-8 mb-6 bg-white/95 shadow-xl">
          <div className="text-center mb-6">
            <LitaCharacter mood="happy" size="large" className="mx-auto mb-4" />
            
            {/* Player Level Badge */}
            <div className={`inline-block bg-gradient-to-r ${playerLevel.color} text-white px-4 py-2 rounded-full mb-4 shadow-lg`}>
              <span className="text-lg mr-2">{playerLevel.icon}</span>
              <span className="font-bold">Level {playerLevel.level}</span>
            </div>
          </div>

          {/* Profile Info */}
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-purple-600" />
                <div>
                  <label className="text-sm font-semibold text-purple-600">Nama</label>
                  {isEditing ? (
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="mt-1"
                      placeholder="Masukkan nama kamu"
                    />
                  ) : (
                    <p className="text-lg font-bold text-gray-700">{playerData.name}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="text-blue-600 text-xl">🎂</div>
                <div>
                  <label className="text-sm font-semibold text-blue-600">Umur</label>
                  {isEditing ? (
                    <Input
                      type="number"
                      min="5"
                      max="10"
                      value={editAge}
                      onChange={(e) => setEditAge(e.target.value)}
                      className="mt-1"
                      placeholder="5-10 tahun"
                    />
                  ) : (
                    <p className="text-lg font-bold text-gray-700">{playerData.age} tahun</p>
                  )}
                </div>
              </div>
            </div>

            {/* Edit/Save Button */}
            <div className="text-center">
              {isEditing ? (
                <div className="space-x-4">
                  <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Simpan
                  </Button>
                  <Button onClick={() => setIsEditing(false)} variant="outline">
                    Batal
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setIsEditing(true)} className="bg-purple-500 hover:bg-purple-600 text-white">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profil
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Statistics */}
        <Card className="p-6 mb-6 bg-white/95 shadow-xl">
          <h2 className="text-xl font-bold text-purple-600 mb-4">📊 Statistik Belajar</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl">
              <div className="text-2xl mb-2">⭐</div>
              <div className="text-2xl font-bold text-orange-600">{playerData.stars}</div>
              <div className="text-sm text-orange-600">Total Bintang</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl">
              <div className="text-2xl mb-2">🎮</div>
              <div className="text-2xl font-bold text-blue-600">{playerData.completedGames.length}</div>
              <div className="text-sm text-blue-600">Game Selesai</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
              <div className="text-2xl mb-2">📚</div>
              <div className="text-2xl font-bold text-purple-600">{playerData.unlockedStories.length}</div>
              <div className="text-sm text-purple-600">Cerita Terbuka</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-red-100 to-orange-100 rounded-xl">
              <div className="text-2xl mb-2">🏆</div>
              <div className="text-2xl font-bold text-red-600">
                {Math.round((playerData.completedGames.length / 5) * 100)}%
              </div>
              <div className="text-sm text-red-600">Progres Game</div>
            </div>
          </div>
        </Card>

        {/* Progress Info */}
        <Card className="p-6 mb-6 bg-white/95 shadow-xl">
          <h2 className="text-xl font-bold text-purple-600 mb-4">🎯 Target Berikutnya</h2>
          
          <div className="space-y-4">
            {playerData.stars < 5 && (
              <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                <p className="text-yellow-700 font-semibold">🌟 Kumpulkan 5 bintang untuk membuka cerita Lautan Biru!</p>
              </div>
            )}
            
            {playerData.completedGames.length < 5 && (
              <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <p className="text-blue-700 font-semibold">🎮 Selesaikan semua mini games untuk jadi Master Game!</p>
              </div>
            )}
            
            {playerData.stars >= 20 && playerData.completedGames.length === 5 && (
              <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                <p className="text-green-700 font-semibold">👑 Selamat! Kamu sudah mencapai level tertinggi!</p>
              </div>
            )}
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 bg-red-50 border-red-200 shadow-xl">
          <h2 className="text-xl font-bold text-red-600 mb-4">⚠️ Reset Progres</h2>
          <p className="text-red-600 mb-4">
            Ingin memulai petualangan dari awal? Semua progres akan hilang dan tidak bisa dikembalikan.
          </p>
          <Button 
            onClick={resetProgress}
            variant="outline"
            className="border-red-300 text-red-600 hover:bg-red-50"
          >
            🔄 Reset Semua Progres
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default ProfileHub;
