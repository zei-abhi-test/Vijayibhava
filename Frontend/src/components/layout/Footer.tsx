import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-terracotta rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">V</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">VijayiBhava</h3>
            </div>
            <p className="text-muted-foreground text-sm max-w-md">
              Empowering local artists across India to showcase their heritage crafts and connect with art lovers worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/gallery" className="block text-sm text-muted-foreground hover:text-terracotta transition-colors">
                Gallery
              </Link>
              <Link to="/community" className="block text-sm text-muted-foreground hover:text-terracotta transition-colors">
                Community
              </Link>
              <Link to="/storyteller" className="block text-sm text-muted-foreground hover:text-terracotta transition-colors">
                Tell Your Story
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <div className="space-y-2">
              <Link to="/privacy" className="block text-sm text-muted-foreground hover:text-terracotta transition-colors">
                Privacy Policy
              </Link>
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-terracotta transition-colors">
                Contact Us
              </Link>
              <Link to="/terms" className="block text-sm text-muted-foreground hover:text-terracotta transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 VijayiBhava. All rights reserved. Celebrating traditional Indian crafts with GI Tag authenticity.
          </p>
        </div>
      </div>
    </footer>
  );
};