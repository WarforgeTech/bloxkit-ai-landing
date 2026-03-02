'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer() {
  // Function to get the next 11:59 PM EST deadline
  const getNextDeadline = (): Date => {
    const now = new Date();
    
    // Convert current time to EST
    const estOffset = -5; // EST is UTC-5
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const estTime = new Date(utc + (estOffset * 3600000));
    
    // Create today's 11:59 PM EST
    const todayDeadline = new Date(estTime);
    todayDeadline.setHours(23, 59, 0, 0);
    
    // If we've already passed today's deadline, use tomorrow's
    if (estTime >= todayDeadline) {
      const tomorrowDeadline = new Date(todayDeadline);
      tomorrowDeadline.setDate(tomorrowDeadline.getDate() + 1);
      return tomorrowDeadline;
    }
    
    return todayDeadline;
  };

  const calculateTimeLeft = (difference: number): TimeLeft => {
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  // Initialize with a default state to prevent hydration mismatch
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isVisible, setIsVisible] = useState(true); // Always show for now
  const [isClient, setIsClient] = useState(false);
  const [targetDate, setTargetDate] = useState<Date>(getNextDeadline());

  useEffect(() => {
    // Mark that we're on the client
    setIsClient(true);

    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft(calculateTimeLeft(difference));
      } else {
        // Countdown finished - reset to next deadline
        const newTargetDate = getNextDeadline();
        setTargetDate(newTargetDate);
        const newDifference = newTargetDate.getTime() - now.getTime();
        setTimeLeft(calculateTimeLeft(newDifference));
      }
    };

    // Initial calculation
    updateTimer();

    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Don't render the countdown until we're on the client to prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-red-600 to-red-500 rounded-full md:shadow-lg md:animate-pulse">
        <Clock className="h-4 w-4 text-white md:animate-pulse" />
        <span className="text-white text-sm font-bold">
          <span className="text-yellow-300">OFFER ENDS:</span>
        </span>
        <div className="flex items-center gap-1 text-white text-sm font-mono font-bold">
          <span className="bg-red-700 px-1.5 py-0.5 rounded text-xs">--</span>
          <span className="text-yellow-300">:</span>
          <span className="bg-red-700 px-1.5 py-0.5 rounded text-xs">--</span>
          <span className="text-yellow-300">:</span>
          <span className="bg-red-700 px-1.5 py-0.5 rounded text-xs">--</span>
          <span className="text-yellow-300">:</span>
          <span className="bg-red-700 px-1.5 py-0.5 rounded text-xs">--</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-red-600 to-red-500 rounded-full md:shadow-lg md:animate-pulse">
      <Clock className="h-4 w-4 text-white animate-pulse" />
      <span className="text-white text-sm font-bold">
        <span className="text-yellow-300">OFFER ENDS:</span>
      </span>
      <div className="flex items-center gap-1 text-white text-sm font-mono font-bold">
        <span className="bg-red-700 px-1.5 py-0.5 rounded text-xs">
          {timeLeft.days.toString().padStart(2, '0')}
        </span>
        <span className="text-yellow-300">:</span>
        <span className="bg-red-700 px-1.5 py-0.5 rounded text-xs">
          {timeLeft.hours.toString().padStart(2, '0')}
        </span>
        <span className="text-yellow-300">:</span>
        <span className="bg-red-700 px-1.5 py-0.5 rounded text-xs">
          {timeLeft.minutes.toString().padStart(2, '0')}
        </span>
        <span className="text-yellow-300">:</span>
        <span className="bg-red-700 px-1.5 py-0.5 rounded text-xs">
          {timeLeft.seconds.toString().padStart(2, '0')}
        </span>
      </div>
    </div>
  );
} 