import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  label?: string;
  variant?: "default" | "success" | "warning";
}

const ProgressBar = ({ 
  value, 
  max = 100, 
  className, 
  showLabel = true, 
  label,
  variant = "default"
}: ProgressBarProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const variants = {
    default: "progress-fill",
    success: "bg-gradient-success", 
    warning: "bg-gradient-to-r from-warning to-warning/80"
  };

  return (
    <div className={cn("space-y-2", className)}>
      {showLabel && (
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium text-foreground">
            {label || "Progress"}
          </span>
          <span className="text-muted-foreground">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
        <div
          className={cn("h-full transition-all duration-700 ease-out", variants[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;