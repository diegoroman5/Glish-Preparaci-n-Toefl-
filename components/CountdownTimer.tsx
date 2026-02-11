
import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC = () => {
  const targetDate = new Date('2026-02-23T00:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimerBlock = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-[2rem] flex items-center justify-center shadow-2xl mb-2">
        <span className="text-2xl md:text-4xl font-black text-white tracking-tighter">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-blue-300/80">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex justify-center gap-3 md:gap-6 mb-16 animate-in fade-in zoom-in duration-1000">
      <TimerBlock value={timeLeft.days} label="Días" />
      <TimerBlock value={timeLeft.hours} label="Horas" />
      <TimerBlock value={timeLeft.minutes} label="Minutos" />
      <TimerBlock value={timeLeft.seconds} label="Segundos" />
    </div>
  );
};

export default CountdownTimer;
