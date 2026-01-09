import { ChevronDown, FileText } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useState } from 'react';
import type { Article } from '@/lib/gameStore';

interface ArticleCardProps {
  article: Article;
}

const classificationColors = {
  'TOP SECRET': 'text-primary border-primary bg-primary/10',
  'SECRET': 'text-accent border-accent bg-accent/10',
  'CONFIDENTIAL': 'text-muted-foreground border-muted-foreground bg-muted',
};

const ArticleCard = ({ article }: ArticleCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="article-card">
        <CollapsibleTrigger className="w-full">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-muted-foreground" />
              <div className="text-left">
                <h3 className="text-foreground font-bold tracking-wide">
                  {article.title}
                </h3>
                <span className={`text-xs px-2 py-0.5 border ${classificationColors[article.classification]}`}>
                  {article.classification}
                </span>
              </div>
            </div>
            <ChevronDown 
              className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                isOpen ? 'rotate-180' : ''
              }`} 
            />
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="px-4 pb-4 border-t border-border pt-4">
            <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
              {article.content}
            </p>
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span>DOC-{article.id.padStart(6, '0')}</span>
              <span>•</span>
              <span>EYES ONLY</span>
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

export default ArticleCard;
