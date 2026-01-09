// Simple in-memory store for game state
// In production, this would be backed by a database

export interface Article {
  id: string;
  title: string;
  content: string;
  classification: 'TOP SECRET' | 'SECRET' | 'CONFIDENTIAL';
}

export interface GameState {
  articles: Article[];
  password: string;
  timerSeconds: number;
  isTimerRunning: boolean;
}

const defaultArticles: Article[] = [
  {
    id: '1',
    title: 'OPERATION MIDNIGHT SUN',
    content: 'Agent codename: RAVEN reported unusual activity at coordinates 47.6062° N. The first letter of the operative\'s surname is "B". All communications intercepted on frequency 127.5 MHz. Status: ONGOING.',
    classification: 'TOP SECRET',
  },
  {
    id: '2',
    title: 'ASSET EXTRACTION REPORT',
    content: 'Target successfully extracted from location ALPHA-7. The second digit of the safe combination is "4". Transport vehicle license plate partially visible: ***-2**. Mission duration: 72 hours.',
    classification: 'SECRET',
  },
  {
    id: '3',
    title: 'SURVEILLANCE LOG #847',
    content: 'Subject observed entering facility at 0300 hours. Notable: Subject was carrying a briefcase with initials "L.M." embossed. The access code ends with the number "9". Cross-reference with file OMEGA.',
    classification: 'CONFIDENTIAL',
  },
  {
    id: '4',
    title: 'INTERCEPTED TRANSMISSION',
    content: 'Decoded message fragment: "...the package will arrive on the THIRD day of the month..." Signal origin traced to eastern sector. Encryption level: AES-256. Priority: HIGH.',
    classification: 'TOP SECRET',
  },
];

let gameState: GameState = {
  articles: defaultArticles,
  password: 'B493',
  timerSeconds: 0,
  isTimerRunning: false,
};

export const getGameState = (): GameState => ({ ...gameState });

export const setPassword = (password: string): void => {
  gameState.password = password;
};

export const setArticles = (articles: Article[]): void => {
  gameState.articles = articles;
};

export const addArticle = (article: Omit<Article, 'id'>): Article => {
  const newArticle = { ...article, id: Date.now().toString() };
  gameState.articles.push(newArticle);
  return newArticle;
};

export const updateArticle = (id: string, updates: Partial<Article>): void => {
  gameState.articles = gameState.articles.map(a => 
    a.id === id ? { ...a, ...updates } : a
  );
};

export const deleteArticle = (id: string): void => {
  gameState.articles = gameState.articles.filter(a => a.id !== id);
};

export const checkPassword = (attempt: string): boolean => {
  return attempt.toUpperCase() === gameState.password.toUpperCase();
};
