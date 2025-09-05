import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';
import { useProfileUpdate } from './useProfileUpdate';

export const useAuth = () => {
  console.log('useAuth hook called');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Use the profile update hook to handle tutor data
  useProfileUpdate(user);

  useEffect(() => {
    console.log('useAuth useEffect running');
    // Get initial session
    const getUser = async () => {
      try {
        console.log('Getting user session...');
        const { data: { user } } = await supabase.auth.getUser();
        console.log('Got user from supabase:', user);
        setUser(user);
        setLoading(false);
      } catch (error) {
        console.error('Error getting user:', error);
        setLoading(false);
      }
    };

    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
};