// hooks/useCountdown.ts
import { useState, useEffect, useRef } from "react";

interface CountdownOptions {
  initialSeconds: number;
  onComplete?: () => void;
  storageKey?: string;
}

export const useCountdown = ({
  initialSeconds,
  onComplete,
  storageKey,
}: CountdownOptions) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (storageKey && typeof window !== "undefined") {
      const savedState = localStorage.getItem(storageKey);
      if (savedState) {
        const { expiresAt } = JSON.parse(savedState);
        const now = Date.now();
        const remaining = Math.floor((expiresAt - now) / 1000);

        if (remaining > 0) {
          setTimeout(() => {
            setTimeLeft(remaining);
            setIsActive(true);
          }, 0);
        }
      }
    }
  }, [storageKey]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            if (onComplete) onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [isActive, timeLeft, onComplete]);

  const start = (seconds?: number) => {
    const duration = seconds || initialSeconds;
    setTimeLeft(duration);
    setIsActive(true);

    if (storageKey && typeof window !== "undefined") {
      const expiresAt = Date.now() + duration * 1000;
      localStorage.setItem(storageKey, JSON.stringify({ expiresAt }));
    }
  };

  const pause = () => {
    setIsActive(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const reset = () => {
    setTimeLeft(initialSeconds);
    setIsActive(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (storageKey && typeof window !== "undefined") {
      localStorage.removeItem(storageKey);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return {
    timeLeft,
    isActive,
    start,
    pause,
    reset,
    formatTime: () => formatTime(timeLeft),
  };
};
