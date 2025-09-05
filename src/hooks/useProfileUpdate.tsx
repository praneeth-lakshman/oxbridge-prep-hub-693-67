import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { User } from '@supabase/supabase-js';

interface TempTutorData {
  user_type: string;
  name: string;
  university: string;
  degree: string;
  year: string;
  subjects: {
    exams: string[];
  };
  exam_rates: Record<string, number>;
}

export const useProfileUpdate = (user: User | null) => {
  const { toast } = useToast();

  useEffect(() => {
    const updateTutorProfile = async () => {
      if (!user) return;

      // Check for temporary tutor data
      const tempDataString = localStorage.getItem('tempTutorData');
      if (!tempDataString) return;

      try {
        const tempData: TempTutorData = JSON.parse(tempDataString);
        
        // Update the profile with tutor information
        const { error } = await supabase
          .from('profiles')
          .update({
            user_type: tempData.user_type,
            name: tempData.name,
            university: tempData.university,
            degree: tempData.degree,
            year: tempData.year,
            subjects: tempData.subjects,
            exam_rates: tempData.exam_rates,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);

        if (error) {
          console.error('Error updating tutor profile:', error);
          toast({
            title: "Profile Update Failed",
            description: "There was an error updating your tutor profile. Please try again.",
            variant: "destructive",
          });
        } else {
          // Clear the temporary data
          localStorage.removeItem('tempTutorData');
          toast({
            title: "Profile Updated!",
            description: "Your tutor profile has been successfully set up.",
          });
        }
      } catch (error) {
        console.error('Error parsing temp tutor data:', error);
        // Clear invalid data
        localStorage.removeItem('tempTutorData');
      }
    };

    updateTutorProfile();
  }, [user, toast]);
};