import { useState } from "react";
import { Link } from "react-router-dom";
import MicrophoneButton from "@/components/MicrophoneButton";
import TranscriptionDisplay from "@/components/TranscriptionDisplay";
import SignPlayer from "@/components/SignPlayer";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { Settings, RotateCcw, Info } from "lucide-react";

const Index = () => {
  const {
    isListening,
    transcript,
    interimTranscript,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

  const [showInfo, setShowInfo] = useState(false);

  const handleMicToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="gradient-hero px-6 py-6 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-display text-display-sm text-primary-foreground tracking-tight">
                SignBridge
              </h1>
              <p className="text-primary-foreground/70 text-sm mt-0.5">
                Speech → Indian Sign Language
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="w-10 h-10 rounded-full bg-primary-foreground/15 flex items-center justify-center hover:bg-primary-foreground/25 transition"
                aria-label="About"
              >
                <Info className="w-5 h-5 text-primary-foreground" />
              </button>
              <Link
                to="/admin"
                className="w-10 h-10 rounded-full bg-primary-foreground/15 flex items-center justify-center hover:bg-primary-foreground/25 transition"
                aria-label="Admin panel"
              >
                <Settings className="w-5 h-5 text-primary-foreground" />
              </Link>
            </div>
          </div>

          {showInfo && (
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4 text-primary-foreground/90 text-sm animate-fade-up">
              <p className="font-semibold mb-1">How it works</p>
              <p>
                Tap the mic, speak in English, and SignBridge will display the corresponding
                Indian Sign Language signs for each word. Press Play to see them animate in sequence.
              </p>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-6 -mt-6 pb-12 space-y-6">
        {/* Mic Section */}
        <div className="flex flex-col items-center gap-4 py-4">
          <MicrophoneButton
            isListening={isListening}
            onToggle={handleMicToggle}
            disabled={!isSupported}
          />

          {!isSupported && (
            <p className="text-destructive text-sm text-center">
              Speech recognition is not supported in this browser.
              Please use Chrome or Edge.
            </p>
          )}

          {error && (
            <p className="text-destructive text-sm text-center">{error}</p>
          )}

          {transcript && (
            <button
              onClick={resetTranscript}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Clear
            </button>
          )}
        </div>

        {/* Transcription */}
        <TranscriptionDisplay
          transcript={transcript}
          interimTranscript={interimTranscript}
          isListening={isListening}
        />

        {/* Sign Player */}
        <SignPlayer transcript={transcript} />
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-muted-foreground">
        <p>SignBridge MVP • Bridging communication gaps with technology</p>
      </footer>
    </div>
  );
};

export default Index;
