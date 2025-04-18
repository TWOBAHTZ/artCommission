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
  

  export async function fetchUserProfile() {
    try {
      const response = await fetch('/user/profile', {
        method: 'GET',
        credentials: 'include',
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch profile');
      }
  
      return result.user;
    } catch (err) {
      console.error('Error fetching profile:', err.message);
      return null;
    }
}

  
  
  
