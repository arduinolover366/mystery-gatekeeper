import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TimerProps {
  compact?: boolean;
}

const Timer = ({ compact = false }: TimerProps) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = useCallback((totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const handleToggle = () => setIsRunning(prev => !prev);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className="timer-display text-lg">
          {formatTime(seconds)}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggle}
          className="h-8 w-8 text-terminal hover:text-terminal hover:bg-terminal/10"
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleReset}
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="document-panel">
      <h3 className="text-sm font-typewriter text-muted-foreground mb-4 tracking-wider">
        MISSION TIMER
      </h3>
      
      <div className="timer-display text-4xl text-center mb-6">
        {formatTime(seconds)}
      </div>

      <div className="flex gap-2">
        <Button
          onClick={handleToggle}
          className={`flex-1 ${isRunning ? 'bg-accent hover:bg-accent/80' : 'bg-terminal hover:bg-terminal/80'} text-background`}
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4 mr-2" /> PAUSE
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" /> START
            </>
          )}
        </Button>
        <Button
          variant="outline"
          onClick={handleReset}
          className="border-muted-foreground/30 hover:bg-muted"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Timer;
