import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface OnlineStatus {
  [userId: string]: boolean;
}

export const useOnlineStatus = (userIds: string[]) => {
  const [onlineStatus, setOnlineStatus] = useState<OnlineStatus>({});

  useEffect(() => {
    if (!userIds.length) return;

    // Fetch and update online status
    const updateOnlineStatus = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('id, last_seen')
        .in('id', userIds);

      if (data) {
        const status: OnlineStatus = {};
        data.forEach(profile => {
          status[profile.id] = profile.last_seen 
            ? Date.now() - new Date(profile.last_seen).getTime() < 60000 
            : false;
        });
        setOnlineStatus(status);
      }
    };

    // Initial fetch
    updateOnlineStatus();

    // Update every 30 seconds - simple polling instead of subscriptions
    const interval = setInterval(updateOnlineStatus, 30000);

    return () => {
      clearInterval(interval);
    };
  }, [userIds.join(',')]); // Use join to avoid array reference issues

  const isUserOnline = (userId: string) => onlineStatus[userId] || false;

  return { onlineStatus, isUserOnline };
};