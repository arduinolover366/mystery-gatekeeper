import { useEffect, useState } from 'react';
import ClassifiedHeader from '@/components/ClassifiedHeader';
import ArticleCard from '@/components/ArticleCard';
import PasswordPanel from '@/components/PasswordPanel';
import Timer from '@/components/Timer';
import { getGameState, type Article } from '@/lib/gameStore';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';

const Index = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const state = getGameState();
    setArticles(state.articles);
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Scanlines overlay */}
      <div className="scanlines" />
      
      <ClassifiedHeader 
        showTimer 
        timer={<Timer compact />}
      />

      {/* Admin link */}
      <Link 
        to="/admin" 
        className="fixed bottom-4 right-4 z-50 p-3 bg-card border border-border rounded-full hover:border-primary/50 transition-colors"
        title="Admin Panel"
      >
        <Settings className="w-5 h-5 text-muted-foreground" />
      </Link>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 min-h-[calc(100vh-200px)]">
          {/* Left Panel - Articles */}
          <div className="document-panel">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-typewriter text-foreground tracking-wider">
                CLASSIFIED DOCUMENTS
              </h2>
              <span className="text-xs text-muted-foreground">
                {articles.length} FILE(S)
              </span>
            </div>

            <div className="space-y-3">
              {articles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground font-mono text-center">
                Review documents carefully. Clues are hidden within.
              </p>
            </div>
          </div>

          {/* Right Panel - Password */}
          <PasswordPanel />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4">
        <div className="container mx-auto px-4">
          <p className="text-xs text-muted-foreground text-center font-mono">
            DOCUMENT CLASSIFICATION: TOP SECRET • HANDLING: RESTRICTED • 
            DISTRIBUTION: NEED TO KNOW BASIS ONLY
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
