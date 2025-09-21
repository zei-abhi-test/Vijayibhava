import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Footer } from './Footer';
import { AIChatbot } from '@/components/ui/ai-chatbot';
import { Toaster } from '@/components/ui/sonner';

interface AppLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export const AppLayout = ({ children, showSidebar = true }: AppLayoutProps) => {
  return (
    // use min-h-screen (not h-screen) so the page can grow taller than the viewport
    <div className="flex min-h-screen bg-background">
      {/* optional sidebar */}
      {showSidebar && <Sidebar />}

      {/* main content wrapper */}
      <div className="flex-1 flex flex-col">
        {/* header at top */}
        <Header />

        {/* page content; flex-grow pushes footer to bottom if content is short */}
        <main className="flex-1">
          {children}
        </main>

        {/* footer sits at the bottom naturally */}
        <Footer />
      </div>

      {/* extras */}
      <AIChatbot />
      <Toaster />
    </div>
  );
};
