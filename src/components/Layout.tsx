import { Link, useLocation } from "react-router-dom";
import { GraduationCap, BookOpen, Brain, BarChart3, CreditCard, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart3 },
  { name: "Add Content", href: "/content", icon: BookOpen },
  { name: "Quiz", href: "/quiz", icon: Brain },
  { name: "Flashcards", href: "/flashcards", icon: CreditCard },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="card-learning border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-learning p-2 rounded-xl shadow-lg">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">LearnSpark</h1>
                <p className="text-xs text-muted-foreground">Smart Study Companion</p>
              </div>
            </div>

            {/* Streak Counter */}
            <div className="flex items-center space-x-2 streak-badge">
              <Flame className="h-4 w-4" />
              <span className="font-semibold">7 Day Streak!</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="card-learning border-b bg-card/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
                    isActive
                      ? "bg-gradient-learning text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;