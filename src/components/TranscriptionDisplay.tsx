interface TranscriptionDisplayProps {
  transcript: string;
  interimTranscript: string;
  isListening: boolean;
}

const TranscriptionDisplay = ({ transcript, interimTranscript, isListening }: TranscriptionDisplayProps) => {
  const hasContent = transcript || interimTranscript;

  return (
    <div className="w-full rounded-lg bg-card shadow-card border border-border p-6 min-h-[120px]">
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2.5 h-2.5 rounded-full ${isListening ? "bg-accent animate-pulse" : "bg-muted-foreground/30"}`} />
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {isListening ? "Listening…" : "Transcription"}
        </span>
      </div>

      {hasContent ? (
        <p className="text-xl md:text-2xl leading-relaxed text-card-foreground">
          {transcript}
          {interimTranscript && (
            <span className="text-muted-foreground/60">{interimTranscript}</span>
          )}
        </p>
      ) : (
        <p className="text-lg text-muted-foreground/50 italic">
          Tap the microphone and start speaking…
        </p>
      )}
    </div>
  );
};

export default TranscriptionDisplay;
