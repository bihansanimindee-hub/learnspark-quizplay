import { Trophy, Target, Flame, Star, Award } from "lucide-react";

const badgeIcons = {
  streak: Flame,
  score: Trophy,
  level: Star,
  milestone: Target,
  achievement: Award,
};

interface AchievementBadgeProps {
  type: keyof typeof badgeIcons;
  title: string;
  description: string;
  earned?: boolean;
  className?: string;
}

const AchievementBadge = ({ 
  type, 
  title, 
  description, 
  earned = false, 
  className 
}: AchievementBadgeProps) => {
  const Icon = badgeIcons[type];

  return (
    <div className={`
      relative p-4 rounded-lg border transition-all duration-200 hover:scale-105 
      ${earned 
        ? "achievement-badge border-success/30" 
        : "bg-muted/50 border-border text-muted-foreground"
      } 
      ${className}
    `}>
      <div className="flex items-center space-x-3">
        <div className={`
          p-2 rounded-lg 
          ${earned 
            ? "bg-success/20 text-success" 
            : "bg-muted text-muted-foreground"
          }
        `}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm truncate">{title}</h3>
          <p className="text-xs opacity-80 truncate">{description}</p>
        </div>
        {earned && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-success-foreground rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementBadge;