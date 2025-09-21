import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="h-16 bg-gradient-to-r from-terracotta to-terracotta-light shadow-warm flex items-center justify-between px-6">
      <Link to="/" className="flex items-center gap-4">
        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-sm"></div>
        </div>
        <span className="text-xl font-bold text-primary-foreground">VIJAYIBHAVA</span>
      </Link>

      <nav className="hidden md:flex items-center gap-6">
        <Link to="/" className="text-primary-foreground hover:text-primary-foreground/80 transition-colors">
          Home
        </Link>
        <Link to="/gallery" className="text-primary-foreground hover:text-primary-foreground/80 transition-colors">
          Gallery
        </Link>
        <Link to="/community" className="text-primary-foreground hover:text-primary-foreground/80 transition-colors">
          Community
        </Link>
      </nav>

      <div className="flex items-center gap-3">
        <Link to="/auth">
          <Button variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-primary-foreground hover:bg-white/20">
            Sign In
          </Button>
        </Link>
      </div>
    </header>
  );
};