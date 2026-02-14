import { Mic, MicOff } from "lucide-react";

interface MicrophoneButtonProps {
  isListening: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

const MicrophoneButton = ({ isListening, onToggle, disabled }: MicrophoneButtonProps) => {
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      aria-label={isListening ? "Stop listening" : "Start listening"}
      className={`
        relative w-24 h-24 rounded-full flex items-center justify-center
        transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-ring
        ${isListening
          ? "gradient-accent animate-mic-pulse"
          : "gradient-hero hover:opacity-90 hover:scale-105 active:scale-95"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {isListening ? (
        <MicOff className="w-10 h-10 text-accent-foreground" />
      ) : (
        <Mic className="w-10 h-10 text-primary-foreground" />
      )}
    </button>
  );
};

export default MicrophoneButton;
