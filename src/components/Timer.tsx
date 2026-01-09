import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getGameState, setTimerDuration } from '@/lib/gameStore';

interface TimerProps {
  compact?: boolean;
  showSettings?: boolean;
}

const Timer = ({ compact = false, showSettings = false }: TimerProps) => {
  const [remainingMs, setRemainingMs] = useState(0);
  const [initialMs, setInitialMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [inputMinutes, setInputMinutes] = useState('5');
  const [inputSeconds, setInputSeconds] = useState('0');

  useEffect(() => {
    const state = getGameState();
    setInitialMs(state.timerDurationMs);
    setRemainingMs(state.timerDurationMs);
    setInputMinutes(Math.floor(state.timerDurationMs / 60000).toString());
    setInputSeconds(Math.floor((state.timerDurationMs % 60000) / 1000).toString());
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && remainingMs > 0) {
      interval = setInterval(() => {
        setRemainingMs(prev => Math.max(0, prev - 10));
      }, 10);
    } else if (remainingMs <= 0 && isRunning) {
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, remainingMs]);

  const formatTime = useCallback((totalMs: number) => {
    const hours = Math.floor(totalMs / 3600000);
    const minutes = Math.floor((totalMs % 3600000) / 60000);
    const seconds = Math.floor((totalMs % 60000) / 1000);
    const ms = Math.floor((totalMs % 1000) / 10);
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  }, []);

  const handleToggle = () => setIsRunning(prev => !prev);
  
  const handleReset = () => {
    setIsRunning(false);
    setRemainingMs(initialMs);
  };

  const handleSaveDuration = () => {
    const mins = parseInt(inputMinutes) || 0;
    const secs = parseInt(inputSeconds) || 0;
    const totalMs = (mins * 60 + secs) * 1000;
    setTimerDuration(totalMs);
    setInitialMs(totalMs);
    setRemainingMs(totalMs);
    setIsRunning(false);
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className={`timer-display text-lg ${remainingMs <= 10000 ? 'text-destructive animate-pulse' : ''}`}>
          {formatTime(remainingMs)}
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
      
      <div className={`timer-display text-4xl text-center mb-6 ${remainingMs <= 10000 && remainingMs > 0 ? 'text-destructive animate-pulse' : ''}`}>
        {formatTime(remainingMs)}
      </div>

      {showSettings && (
        <div className="mb-4 space-y-3">
          <label className="text-xs font-typewriter text-muted-foreground tracking-wider">
            SET DURATION
          </label>
          <div className="flex gap-2 items-center">
            <Input
              type="number"
              value={inputMinutes}
              onChange={e => setInputMinutes(e.target.value)}
              className="bg-input border-border w-20 text-center"
              min="0"
              max="99"
            />
            <span className="text-muted-foreground">min</span>
            <Input
              type="number"
              value={inputSeconds}
              onChange={e => setInputSeconds(e.target.value)}
              className="bg-input border-border w-20 text-center"
              min="0"
              max="59"
            />
            <span className="text-muted-foreground">sec</span>
          </div>
          <Button
            onClick={handleSaveDuration}
            variant="outline"
            className="w-full border-terminal/30 text-terminal hover:bg-terminal/10"
          >
            Apply Duration
          </Button>
        </div>
      )}

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
