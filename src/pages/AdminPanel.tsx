import { useState } from "react";
import { getAvailableWords, addSign, removeSign } from "@/lib/signLibrary";
import { Plus, Trash2, ArrowLeft, Upload } from "lucide-react";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  const [words, setWords] = useState(getAvailableWords);
  const [newWord, setNewWord] = useState("");

  const handleAdd = () => {
    const trimmed = newWord.trim().toLowerCase();
    if (!trimmed) return;
    addSign(trimmed);
    setWords(getAvailableWords());
    setNewWord("");
  };

  const handleRemove = (word: string) => {
    removeSign(word);
    setWords(getAvailableWords());
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="gradient-hero px-6 py-6">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Link
            to="/"
            className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition"
          >
            <ArrowLeft className="w-5 h-5 text-primary-foreground" />
          </Link>
          <div>
            <h1 className="font-display text-display-sm text-primary-foreground">Admin Panel</h1>
            <p className="text-primary-foreground/70 text-sm">Manage ISL sign library</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8 space-y-8">
        {/* Add new word */}
        <div className="bg-card rounded-lg shadow-card border border-border p-6">
          <h2 className="font-display text-lg font-semibold text-card-foreground mb-4">
            Add New Sign Entry
          </h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              placeholder="Enter word…"
              className="flex-1 px-4 py-3 rounded-lg border border-input bg-background text-foreground text-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-6 py-3 rounded-lg gradient-accent text-accent-foreground font-medium hover:opacity-90 transition"
            >
              <Plus className="w-5 h-5" /> Add
            </button>
          </div>
          <p className="text-sm text-muted-foreground mt-3 flex items-center gap-1.5">
            <Upload className="w-4 h-4" />
            Video upload will be available once cloud storage is connected
          </p>
        </div>

        {/* Word library */}
        <div className="bg-card rounded-lg shadow-card border border-border p-6">
          <h2 className="font-display text-lg font-semibold text-card-foreground mb-4">
            Sign Library ({words.length} words)
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {words.map((word) => (
              <div
                key={word}
                className="flex items-center justify-between bg-secondary rounded-lg px-4 py-3"
              >
                <span className="text-secondary-foreground font-medium capitalize">{word}</span>
                <button
                  onClick={() => handleRemove(word)}
                  className="text-destructive/60 hover:text-destructive transition p-1"
                  aria-label={`Remove ${word}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
