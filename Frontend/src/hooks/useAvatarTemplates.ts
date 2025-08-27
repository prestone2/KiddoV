
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface AvatarTemplate {
  id: string;
  name: string;
  style: string;
  image_url: string;
  is_premium: boolean;
  created_at: string;
}

export const useAvatarTemplates = () => {
  return useQuery({
    queryKey: ['avatar-templates'],
    queryFn: async () => {
      console.log('Fetching avatar templates');
      const { data, error } = await supabase
        .from('avatar_templates')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching avatar templates:', error);
        throw error;
      }

      console.log('Fetched avatar templates:', data);
      return data as AvatarTemplate[];
    },
  });
};
    