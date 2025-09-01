import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

const PresenceTracker = () => {
  const { user } = useAuth();

  // Simple last_seen update without presence tracking
  useEffect(() => {
    if (!user) return;

    // Update last seen immediately
    const updateLastSeen = async () => {
      await supabase.rpc('update_user_last_seen', { 
        user_id_param: user.id 
      });
    };

    updateLastSeen();

    // Update every 30 seconds while active
    const interval = setInterval(updateLastSeen, 30000);

    return () => {
      clearInterval(interval);
      // Final update on cleanup
      updateLastSeen();
    };
  }, [user]);

  // Track visibility changes
  useEffect(() => {
    if (!user) return;

    const updateLastSeen = async () => {
      await supabase.rpc('update_user_last_seen', { 
        user_id_param: user.id 
      });
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        updateLastSeen();
      }
    };

    const handleBeforeUnload = () => {
      updateLastSeen();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [user]);

  return null;
};

export default PresenceTracker;