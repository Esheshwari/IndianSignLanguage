import { useState, useEffect, useCallback } from "react";
import { lookupSign, SignEntry } from "@/lib/signLibrary";
import SignCard from "./SignCard";
import { Play, RotateCcw } from "lucide-react";

interface SignPlayerProps {
  transcript: string;
}

const SignPlayer = ({ transcript }: SignPlayerProps) => {
  const [words, setWords] = useState<SignEntry[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!transcript.trim()) {
      setWords([]);
      setActiveIndex(-1);
      setIsPlaying(false);
      return;
    }

    const tokens = transcript.trim().split(/\s+/).filter(Boolean);
    const signs = tokens.map((w) => lookupSign(w));
    setWords(signs);
    setActiveIndex(-1);
    setIsPlaying(false);
  }, [transcript]);

  const playSequence = useCallback(() => {
    if (words.length === 0) return;
    setIsPlaying(true);
    setActiveIndex(0);
  }, [words]);

  useEffect(() => {
    if (!isPlaying || activeIndex < 0) return;
    if (activeIndex >= words.length) {
      setIsPlaying(false);
      setActiveIndex(-1);
      return;
    }

    const timer = setTimeout(() => {
      setActiveIndex((prev) => prev + 1);
    }, 1200);

    return () => clearTimeout(timer);
  }, [isPlaying, activeIndex, words.length]);

  const reset = () => {
    setActiveIndex(-1);
    setIsPlaying(false);
  };

  if (words.length === 0) {
    return (
      <div className="w-full rounded-lg bg-card shadow-card border border-border p-8 text-center">
        <p className="text-muted-foreground text-lg">
          ISL signs will appear here after you speak
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-foreground">
          ISL Signs ({words.filter((w) => w.available).length}/{words.length} available)
        </h2>
        <div className="flex gap-2">
          <button
            onClick={playSequence}
            disabled={isPlaying}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg gradient-hero text-primary-foreground text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            <Play className="w-4 h-4" /> Play
          </button>
          <button
            onClick={reset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:opacity-80 transition"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {words.map((sign, idx) => (
          <SignCard key={`${sign.word}-${idx}`} sign={sign} isActive={activeIndex === idx} />
        ))}
      </div>
    </div>
  );
};

export default SignPlayer;
