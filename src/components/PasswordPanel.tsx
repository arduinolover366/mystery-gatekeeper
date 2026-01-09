import { useState } from 'react';
import { Lock, Unlock, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { checkPassword } from '@/lib/gameStore';

const PasswordPanel = () => {
  const [attempt, setAttempt] = useState('');
  const [status, setStatus] = useState<'locked' | 'unlocked' | 'failed'>('locked');
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (checkPassword(attempt)) {
      setStatus('unlocked');
    } else {
      setStatus('failed');
      setAttempts(prev => prev + 1);
      setTimeout(() => setStatus('locked'), 2000);
    }
  };

  return (
    <div className="document-panel h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-typewriter text-foreground tracking-wider">
          ACCESS TERMINAL
        </h2>
        {status === 'locked' && <Lock className="w-6 h-6 text-primary" />}
        {status === 'unlocked' && <Unlock className="w-6 h-6 text-terminal" />}
        {status === 'failed' && <AlertTriangle className="w-6 h-6 text-primary animate-pulse" />}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        {status === 'unlocked' ? (
          <div className="text-center">
            <div className="terminal-text text-4xl font-bold mb-4">
              ACCESS GRANTED
            </div>
            <p className="text-muted-foreground font-typewriter">
              Welcome, Agent. All files are now accessible.
            </p>
            <div className="mt-6 p-4 border border-terminal/30 bg-terminal/5">
              <p className="terminal-text text-sm">
                CONGRATULATIONS! You have successfully decoded the classified documents.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 border-2 border-primary/50 rounded-full flex items-center justify-center">
                <Lock className="w-10 h-10 text-primary" />
              </div>
              <p className="text-muted-foreground text-sm font-typewriter">
                ENTER SECURITY CODE
              </p>
            </div>

            <Input
              type="text"
              value={attempt}
              onChange={(e) => setAttempt(e.target.value.toUpperCase())}
              className="password-input text-xl py-6"
              placeholder="• • • •"
              maxLength={10}
            />

            {status === 'failed' && (
              <p className="text-primary text-center text-sm animate-pulse font-typewriter">
                ACCESS DENIED - INVALID CODE
              </p>
            )}

            <Button 
              type="submit" 
              className="btn-classified w-full"
              disabled={!attempt}
            >
              AUTHENTICATE
            </Button>

            {attempts > 0 && (
              <p className="text-center text-xs text-muted-foreground">
                Failed attempts: {attempts}
              </p>
            )}
          </form>
        )}
      </div>

      <div className="mt-auto pt-6 border-t border-border">
        <p className="text-xs text-muted-foreground text-center font-mono">
          SECURITY PROTOCOL v2.4.1 • ENCRYPTED CONNECTION
        </p>
      </div>
    </div>
  );
};

export default PasswordPanel;
