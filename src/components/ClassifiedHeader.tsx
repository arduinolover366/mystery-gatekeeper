import { Shield } from 'lucide-react';

interface ClassifiedHeaderProps {
  showTimer?: boolean;
  timer?: React.ReactNode;
}

const ClassifiedHeader = ({ showTimer, timer }: ClassifiedHeaderProps) => {
  return (
    <header className="classified-header">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl md:text-3xl font-typewriter tracking-wider text-foreground">
              CONFIDENTIAL STATE RECORD
            </h1>
            <p className="text-xs text-muted-foreground tracking-widest">
              UNAUTHORIZED ACCESS PROHIBITED • SECURITY CLEARANCE REQUIRED
            </p>
          </div>
        </div>
        
        {showTimer && timer}
        
        <div className="classified-stamp hidden md:block">
          CLASSIFIED
        </div>
      </div>
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -right-10 top-1/2 -translate-y-1/2 text-primary/5 text-[8rem] font-typewriter rotate-12">
          TOP SECRET
        </div>
      </div>
    </header>
  );
};

export default ClassifiedHeader;
