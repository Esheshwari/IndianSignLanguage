// Mock ISL Sign Library
// In production, this would come from a database

export interface SignEntry {
  word: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  available: boolean;
}

// Pre-loaded common words with availability flags
// Videos would be stored in cloud storage in production
const signLibrary: Record<string, SignEntry> = {
  hello: { word: "hello", available: true },
  how: { word: "how", available: true },
  are: { word: "are", available: true },
  you: { word: "you", available: true },
  good: { word: "good", available: true },
  morning: { word: "morning", available: true },
  thank: { word: "thank", available: true },
  please: { word: "please", available: true },
  sorry: { word: "sorry", available: true },
  yes: { word: "yes", available: true },
  no: { word: "no", available: true },
  help: { word: "help", available: true },
  name: { word: "name", available: true },
  my: { word: "my", available: true },
  what: { word: "what", available: true },
  is: { word: "is", available: true },
  your: { word: "your", available: true },
  i: { word: "i", available: true },
  we: { word: "we", available: true },
  they: { word: "they", available: true },
  welcome: { word: "welcome", available: true },
  friend: { word: "friend", available: true },
  learn: { word: "learn", available: true },
  school: { word: "school", available: true },
  teacher: { word: "teacher", available: true },
  student: { word: "student", available: true },
  water: { word: "water", available: true },
  food: { word: "food", available: true },
  home: { word: "home", available: true },
  love: { word: "love", available: true },
};

export function lookupSign(word: string): SignEntry {
  const normalized = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!normalized) return { word, available: false };
  return signLibrary[normalized] || { word: normalized, available: false };
}

export function getAvailableWords(): string[] {
  return Object.keys(signLibrary).sort();
}

export function addSign(word: string): void {
  const normalized = word.toLowerCase().replace(/[^a-z]/g, "");
  if (normalized) {
    signLibrary[normalized] = { word: normalized, available: true };
  }
}

export function removeSign(word: string): void {
  const normalized = word.toLowerCase().replace(/[^a-z]/g, "");
  delete signLibrary[normalized];
}
