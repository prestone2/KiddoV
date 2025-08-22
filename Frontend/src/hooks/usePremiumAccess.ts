
import { useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from './useAuth';
import { useProfile } from './useProfile';
import { useUserSubscription } from './useSubscriptions';

export const usePremiumAccess = () => {
  const { user } = useAuth();
  const { data: profile } = useProfile();
  const { data: subscription } = useUserSubscription();

  // Time driver so access can change without manual refresh
  const [now, setNow] = useState<number>(() => Date.now());
  const expiryTimeoutRef = useRef<number | null>(null);
  const heartbeatRef = useRef<number | null>(null);

  // Recalculate precisely at the earliest expiry and also every 30s as a safety net
  useEffect(() => {
    // Clear existing timers
    if (expiryTimeoutRef.current) clearTimeout(expiryTimeoutRef.current);
    if (heartbeatRef.current) clearInterval(heartbeatRef.current);

    // Heartbeat refresh to keep UI in sync even if user stays on the page
    heartbeatRef.current = window.setInterval(() => setNow(Date.now()), 30000);

    // Schedule a precise update at the earliest known expiry time
    const nowMs = Date.now();
    let nextExpiryMs = Number.POSITIVE_INFINITY;

    if (subscription?.current_period_end) {
      const t = new Date(subscription.current_period_end).getTime();
      if (t > nowMs && t < nextExpiryMs) nextExpiryMs = t;
    }
    if (profile?.subscription_expires_at) {
      const t = new Date(profile.subscription_expires_at).getTime();
      if (t > nowMs && t < nextExpiryMs) nextExpiryMs = t;
    }

    if (Number.isFinite(nextExpiryMs)) {
      expiryTimeoutRef.current = window.setTimeout(() => setNow(Date.now()), Math.max(0, nextExpiryMs - nowMs));
    }

    return () => {
      if (expiryTimeoutRef.current) clearTimeout(expiryTimeoutRef.current);
      if (heartbeatRef.current) clearInterval(heartbeatRef.current);
    };
  }, [subscription?.current_period_end, profile?.subscription_expires_at]);

  const hasAccess = useMemo(() => {
    if (!user) return false;

    const nowDate = new Date(now);

    // Subscription-based access: require 'active' AND not past current_period_end (if present)
    const subStatusActive = subscription?.status === 'active';
    const subEnd = subscription?.current_period_end ? new Date(subscription.current_period_end) : null;
    const subActiveByTime = subStatusActive && (!subEnd || subEnd > nowDate);

    // Profile fallback: require 'active' AND not past subscription_expires_at (if present)
    const profileStatusActive = profile?.subscription_status === 'active';
    const profileEnd = profile?.subscription_expires_at ? new Date(profile.subscription_expires_at) : null;
    const profileActiveByTime = profileStatusActive && (!profileEnd || profileEnd > nowDate);

    const active = subActiveByTime || profileActiveByTime;

    // Minimal logging for debugging
    // console.debug('[usePremiumAccess]', { now: nowDate.toISOString(), subStatusActive, subEnd, profileStatusActive, profileEnd, active });

    return active;
  }, [user, now, subscription?.status, subscription?.current_period_end, profile?.subscription_status, profile?.subscription_expires_at]);

  // Derive an effective status for UI consumers
  const subscriptionStatus = hasAccess ? 'active' : 'free';

  return {
    hasPremiumAccess: hasAccess,
    isAuthenticated: !!user,
    subscriptionStatus,
    subscription,
    profile,
  };
};
