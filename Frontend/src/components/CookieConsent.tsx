import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Simple cookie helpers scoped to this component
function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function getCookie(name: string) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
}

const CONSENT_COOKIE = "cookie_consent"; // values: "all" | "essential"

const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if no consent set
    const existing = getCookie(CONSENT_COOKIE);
    if (!existing) setVisible(true);
  }, []);

  const acceptAll = () => {
    setCookie(CONSENT_COOKIE, "all", 365);
    setVisible(false);
  };

  const rejectNonEssential = () => {
    setCookie(CONSENT_COOKIE, "essential", 365);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-50 sm:inset-x-0 sm:left-1/2 sm:-translate-x-1/2 sm:max-w-2xl"
    >
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border border-border rounded-xl shadow-lg">
        <div className="p-4 sm:p-5">
          <h2 className="text-base font-semibold">We use cookies</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We use essential cookies to make our site work. With your consent, we may
            also use cookies to improve your experience. Read our {""}
            <Link to="/privacy" className="underline underline-offset-2">
              Privacy Policy
            </Link>{" "}
            and {""}
            <Link to="/cookies" className="underline underline-offset-2">
              Cookie Policy
            </Link>
            .
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button variant="secondary" onClick={rejectNonEssential}>
              Reject non‑essential
            </Button>
            <Button onClick={acceptAll}>Accept all</Button>
          </div>
        </div>
      </div>
      
    </aside>
  );
};

export default CookieConsent;
