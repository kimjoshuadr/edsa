import React from 'react';
import Countdown from 'react-countdown';

interface CountdownTimerProps {
  targetDate: string;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return (
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-protest text-primary animate-glitch">
            THE REVOLUTION IS NOW
          </h2>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-card border-2 border-primary p-4 md:p-6">
          <div className="text-3xl md:text-5xl font-protest text-primary">
            {String(days).padStart(2, '0')}
          </div>
          <div className="text-sm md:text-base font-semibold text-muted-foreground uppercase tracking-wider">
            Days
          </div>
        </div>
        <div className="bg-card border-2 border-primary p-4 md:p-6">
          <div className="text-3xl md:text-5xl font-protest text-primary">
            {String(hours).padStart(2, '0')}
          </div>
          <div className="text-sm md:text-base font-semibold text-muted-foreground uppercase tracking-wider">
            Hours
          </div>
        </div>
        <div className="bg-card border-2 border-primary p-4 md:p-6">
          <div className="text-3xl md:text-5xl font-protest text-primary">
            {String(minutes).padStart(2, '0')}
          </div>
          <div className="text-sm md:text-base font-semibold text-muted-foreground uppercase tracking-wider">
            Minutes
          </div>
        </div>
        <div className="bg-card border-2 border-primary p-4 md:p-6">
          <div className="text-3xl md:text-5xl font-protest text-primary animate-pulse-revolution">
            {String(seconds).padStart(2, '0')}
          </div>
          <div className="text-sm md:text-base font-semibold text-muted-foreground uppercase tracking-wider">
            Seconds
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h3 className="text-xl md:text-2xl font-protest text-center mb-6 text-muted-foreground">
        COUNTDOWN TO REVOLUTION
      </h3>
      <Countdown date={new Date(targetDate)} renderer={renderer} />
    </div>
  );
};

export default CountdownTimer;