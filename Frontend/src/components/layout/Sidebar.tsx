import { Home, MessageCircle, BookOpen, BarChart3, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const navigationItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: BookOpen, label: 'Storyteller', path: '/storyteller' },
  { icon: BarChart3, label: 'My Stories', path: '/my-stories' },
  { icon: MessageCircle, label: 'Community', path: '/community' },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-background to-secondary border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-terracotta to-terracotta-light rounded-lg"></div>
          <span className="text-xl font-bold text-foreground">VIJAYIBHAVA</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-4">
            Main Navigation
          </p>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? "artisan" : "ghost"}
                  className="w-full justify-start gap-3 h-11"
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-border space-y-2">
        <Button variant="ghost" className="w-full justify-start gap-3">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Button>
        <Button variant="warm" className="w-full justify-start gap-3">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};