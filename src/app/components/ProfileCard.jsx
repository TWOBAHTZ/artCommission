// components/ProfileCard.jsx
"use client"
import { useEffect, useState } from 'react';

export default function ProfileCard() {
  const [profile, setProfile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const loadProfile = async () => {
    try {
      const response = await fetch('/profile', {
        method: 'GET',
        credentials: 'include',
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch profile');
      }

      setProfile(result.user);
    } catch (err) {
      console.error('Error loading profile:', err.message);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <div className="bg-gray-700 rounded-t-lg p-4 relative">
      <div className="absolute top-4 right-4 flex space-x-2">
        <button
          onClick={() => {
            setIsLogin(true);
            setIsOpen(true);
          }}
          className="text-teal-300 text-sm flex items-center space-x-1 border border-teal-300 px-3 py-1 rounded"
        >
          <span>Edit Profile</span>
        </button>
      </div>
      <div className="flex items-center space-x-4 mt-0">
        <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center text-3xl font-bold text-white">
          <span>👨</span>
        </div>
        <div className="text-white">
          <h1 className="text-2xl font-semibold">{profile ? profile.name : 'Name'}</h1>
          <p className="text-sm">Role: {profile ? profile.role : 'Role'}</p>
          <div className="text-xs mt-1 text-gray-300">
            <span>0 Followers</span> · <span>0 Followings</span>
          </div>
          <p className="mt-2 text-gray-400 text-sm">
            {profile?.description || 'Details'}
          </p>
        </div>
      </div>
    </div>
  );
}
