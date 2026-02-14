import { SignEntry } from "@/lib/signLibrary";
import { Hand, AlertCircle } from "lucide-react";

interface SignCardProps {
  sign: SignEntry;
  isActive: boolean;
}

const SignCard = ({ sign, isActive }: SignCardProps) => {
  return (
    <div
      className={`
        flex flex-col items-center justify-center rounded-lg border-2 p-4 min-w-[100px]
        transition-all duration-300 animate-sign-enter
        ${isActive
          ? "border-accent bg-accent/10 shadow-elevated scale-105"
          : sign.available
            ? "border-border bg-card shadow-card"
            : "border-destructive/30 bg-destructive/5"
        }
      `}
    >
      {sign.available ? (
        <>
          <div className={`
            w-16 h-16 rounded-lg flex items-center justify-center mb-2
            ${isActive ? "gradient-accent" : "gradient-hero"}
          `}>
            <Hand className={`w-8 h-8 ${isActive ? "text-accent-foreground" : "text-primary-foreground"}`} />
          </div>
          <span className="text-base font-semibold text-card-foreground capitalize">
            {sign.word}
          </span>
          {sign.videoUrl ? (
            <span className="text-xs text-success mt-1">Video ready</span>
          ) : (
            <span className="text-xs text-muted-foreground mt-1">Demo sign</span>
          )}
        </>
      ) : (
        <>
          <div className="w-16 h-16 rounded-lg bg-destructive/10 flex items-center justify-center mb-2">
            <AlertCircle className="w-8 h-8 text-destructive/60" />
          </div>
          <span className="text-base font-semibold text-card-foreground capitalize">
            {sign.word}
          </span>
          <span className="text-xs text-destructive mt-1">Sign not available</span>
        </>
      )}
    </div>
  );
};

export default SignCard;
