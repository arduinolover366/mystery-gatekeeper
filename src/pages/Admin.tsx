import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Save, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Timer from '@/components/Timer';
import {
  getGameState,
  setPassword,
  addArticle,
  updateArticle,
  deleteArticle,
  type Article,
} from '@/lib/gameStore';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [password, setPasswordState] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadState();
  }, []);

  const loadState = () => {
    const state = getGameState();
    setArticles(state.articles);
    setPasswordState(state.password);
  };

  const handlePasswordSave = () => {
    setPassword(password);
    toast({
      title: 'Password Updated',
      description: `New password: ${password}`,
    });
  };

  const handleAddArticle = () => {
    const newArticle = addArticle({
      title: 'NEW DOCUMENT',
      content: 'Enter classified information here...',
      classification: 'CONFIDENTIAL',
    });
    setArticles([...articles, newArticle]);
    setEditingId(newArticle.id);
  };

  const handleUpdateArticle = (id: string, updates: Partial<Article>) => {
    updateArticle(id, updates);
    setArticles(articles.map(a => (a.id === id ? { ...a, ...updates } : a)));
  };

  const handleDeleteArticle = (id: string) => {
    deleteArticle(id);
    setArticles(articles.filter(a => a.id !== id));
    toast({
      title: 'Document Deleted',
      description: 'The classified document has been removed.',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="scanlines" />

      {/* Header */}
      <header className="classified-header">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-typewriter tracking-wider text-foreground">
                ADMIN CONTROL PANEL
              </h1>
              <p className="text-xs text-muted-foreground tracking-widest">
                AUTHORIZED PERSONNEL ONLY
              </p>
            </div>
          </div>
          
          <Link to="/">
            <Button variant="outline" className="border-terminal/30 text-terminal hover:bg-terminal/10">
              <Eye className="w-4 h-4 mr-2" /> View Game
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Articles Editor */}
          <div className="lg:col-span-2 space-y-6">
            <div className="document-panel">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-typewriter text-foreground tracking-wider">
                  DOCUMENT MANAGEMENT
                </h2>
                <Button onClick={handleAddArticle} className="btn-classified">
                  <Plus className="w-4 h-4 mr-2" /> Add Document
                </Button>
              </div>

              <div className="space-y-4">
                {articles.map(article => (
                  <div
                    key={article.id}
                    className="bg-muted border border-border p-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1 space-y-3">
                        <Input
                          value={article.title}
                          onChange={e =>
                            handleUpdateArticle(article.id, { title: e.target.value })
                          }
                          className="bg-input border-border font-typewriter"
                          placeholder="Document Title"
                        />

                        <Select
                          value={article.classification}
                          onValueChange={value =>
                            handleUpdateArticle(article.id, {
                              classification: value as Article['classification'],
                            })
                          }
                        >
                          <SelectTrigger className="w-48 bg-input border-border">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="TOP SECRET">TOP SECRET</SelectItem>
                            <SelectItem value="SECRET">SECRET</SelectItem>
                            <SelectItem value="CONFIDENTIAL">CONFIDENTIAL</SelectItem>
                          </SelectContent>
                        </Select>

                        <Textarea
                          value={article.content}
                          onChange={e =>
                            handleUpdateArticle(article.id, { content: e.target.value })
                          }
                          className="bg-input border-border min-h-[100px] font-typewriter text-sm"
                          placeholder="Enter document content with hidden clues..."
                        />
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteArticle(article.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {articles.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <p className="font-typewriter">No documents found.</p>
                    <p className="text-sm mt-2">Click "Add Document" to create your first clue.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Password & Timer */}
          <div className="space-y-6">
            {/* Password Setting */}
            <div className="document-panel">
              <h3 className="text-lg font-typewriter text-foreground tracking-wider mb-4">
                ACCESS CODE
              </h3>

              <div className="space-y-4">
                <Input
                  value={password}
                  onChange={e => setPasswordState(e.target.value.toUpperCase())}
                  className="password-input text-xl"
                  placeholder="SET CODE"
                />

                <Button onClick={handlePasswordSave} className="btn-classified w-full">
                  <Save className="w-4 h-4 mr-2" /> Save Password
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  This is the code players must discover from the clues.
                </p>
              </div>
            </div>

            {/* Timer */}
            <Timer showSettings />

            {/* Instructions */}
            <div className="document-panel">
              <h3 className="text-lg font-typewriter text-foreground tracking-wider mb-4">
                INSTRUCTIONS
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Create articles with hidden clues</li>
                <li>• Set a password that players must discover</li>
                <li>• Use the timer during the game session</li>
                <li>• Players expand articles to find clues</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
