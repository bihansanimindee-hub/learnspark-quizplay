import { Brain, BookOpen, Trophy, TrendingUp, Clock, Target } from "lucide-react";
import Layout from "@/components/Layout";
import ProgressBar from "@/components/ProgressBar";
import AchievementBadge from "@/components/AchievementBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Mock data - in real app this would come from state management
  const stats = {
    totalQuizzes: 24,
    correctAnswers: 89,
    studyStreak: 7,
    weeklyGoal: 5,
    completedThisWeek: 3,
    averageScore: 85,
    studyTime: 120, // minutes
    level: 12
  };

  const recentActivities = [
    { type: "quiz", subject: "Biology", score: 92, time: "2 hours ago" },
    { type: "flashcard", subject: "History", count: 15, time: "1 day ago" },
    { type: "quiz", subject: "Mathematics", score: 78, time: "2 days ago" },
  ];

  const achievements = [
    { type: "streak" as const, title: "Week Warrior", description: "7 day study streak", earned: true },
    { type: "score" as const, title: "Quiz Master", description: "90% average score", earned: false },
    { type: "level" as const, title: "Rising Star", description: "Reach level 15", earned: false },
    { type: "milestone" as const, title: "Century Club", description: "Complete 100 quizzes", earned: false },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Welcome back!</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to continue your learning journey? You're on a {stats.studyStreak}-day streak! 
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-learning">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center space-x-2">
                <Brain className="h-4 w-4 text-primary" />
                <span>Total Quizzes</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.totalQuizzes}</div>
              <p className="text-xs text-success">+3 this week</p>
            </CardContent>
          </Card>

          <Card className="card-learning">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center space-x-2">
                <Trophy className="h-4 w-4 text-warning" />
                <span>Average Score</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.averageScore}%</div>
              <p className="text-xs text-success">+5% from last week</p>
            </CardContent>
          </Card>

          <Card className="card-learning">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center space-x-2">
                <Clock className="h-4 w-4 text-primary-glow" />
                <span>Study Time</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{Math.floor(stats.studyTime / 60)}h {stats.studyTime % 60}m</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card className="card-learning">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center space-x-2">
                <Target className="h-4 w-4 text-success" />
                <span>Current Level</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.level}</div>
              <p className="text-xs text-primary">240 XP to next level</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="card-learning">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Weekly Goal Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <ProgressBar 
                value={stats.completedThisWeek} 
                max={stats.weeklyGoal} 
                label={`${stats.completedThisWeek} / ${stats.weeklyGoal} quizzes completed`}
              />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Keep it up!</span>
                <span className="text-primary font-medium">
                  {stats.weeklyGoal - stats.completedThisWeek} more to go
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="card-learning">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/content">
                <Button className="w-full bg-gradient-learning hover:opacity-90" size="lg">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Add New Study Content
                </Button>
              </Link>
              <Link to="/quiz">
                <Button variant="outline" className="w-full" size="lg">
                  <Brain className="h-4 w-4 mr-2" />
                  Start Random Quiz
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="card-learning">
          <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => (
                <AchievementBadge
                  key={index}
                  type={achievement.type}
                  title={achievement.title}
                  description={achievement.description}
                  earned={achievement.earned}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="card-learning">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {activity.type === 'quiz' ? (
                        <Brain className="h-4 w-4 text-primary" />
                      ) : (
                        <BookOpen className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{activity.subject}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.type === 'quiz' ? `Score: ${activity.score}%` : `${activity.count} cards reviewed`}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;