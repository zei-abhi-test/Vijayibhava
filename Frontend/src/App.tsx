import fs from 'fs/promises';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { HomePage } from "./pages/HomePage";
import { StorytellerPage } from "./pages/StorytellerPage";
import { CommunityPage } from "./pages/CommunityPage";
import { MyStoriesPage } from "./pages/MyStoriesPage";
import { AuthPage } from "./pages/AuthPage";
import { GalleryPage } from "./pages/GalleryPage";
import { ProductPage } from "./pages/ProductPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={
            <AppLayout showSidebar={false}>
              <HomePage />
            </AppLayout>
          } />
          <Route path="/gallery" element={
            <AppLayout showSidebar={false}>
              <GalleryPage />
            </AppLayout>
          } />
          <Route path="/artwork/:id" element={
            <AppLayout showSidebar={false}>
              <ProductPage />
            </AppLayout>
          } />
          <Route path="/storyteller" element={
            <AppLayout>
              <StorytellerPage />
            </AppLayout>
          } />
          <Route path="/my-stories" element={
            <AppLayout>
              <MyStoriesPage />
            </AppLayout>
          } />
          <Route path="/community" element={
            <AppLayout>
              <CommunityPage />
            </AppLayout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
