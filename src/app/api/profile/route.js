import { useEffect, useState } from 'react';

const fetchProfile = async () => {
    try {
      const response = await fetch('/profile', {
        method: 'GET',
        credentials: 'include', // ✅ ส่ง cookie/session ไปให้ Spring backend
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch profile');
      }
  
      console.log('✅ Profile:', result.user);
      return result.user; // คือ UserProfileDTO ที่ backend ส่งกลับมา
    } catch (error) {
      console.error('❌ Error fetching profile:', error.message);
      throw error;
    }
  };
  

  export default function ProfileComponent() {
    const [profile, setProfile] = useState(null);
  
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
  
    // โหลดทันทีเมื่อ component mount
    useEffect(() => {
      loadProfile();
    }, []);
  
    return (
      <div>
        <button onClick={loadProfile}>Reload Profile</button>
        {profile ? <p>{profile.name}</p> : <p>Loading...</p>}
      </div>
    );
  }
  
  
  
