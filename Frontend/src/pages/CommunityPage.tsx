import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Send, Sparkles, Heart, MessageCircle, Share2 } from 'lucide-react';
import { Sidebar } from '../components/layout/Sidebar'; // import your sidebar

const messages = [
  {
    id: 1,
    user: 'Priya Sharma',
    avatar: 'PS',
    message:
      'Just finished a beautiful Madhubani painting! The traditional fish motifs turned out amazing.',
    time: '2 hours ago',
    likes: 12,
    replies: 3,
  },
  {
    id: 2,
    user: 'Rajesh Kumar',
    avatar: 'RK',
    message:
      'Looking for advice on pottery glazing techniques. Any master potters here?',
    time: '4 hours ago',
    likes: 8,
    replies: 7,
  },
  {
    id: 3,
    user: 'Anita Devi',
    avatar: 'AD',
    message:
      "Sharing some photos from today's weaving session. The colors are so vibrant!",
    time: '6 hours ago',
    likes: 15,
    replies: 5,
  },
];

export const CommunityPage = () => {
  const [newMessage, setNewMessage] = useState('');
  const [chatMessages, setChatMessages] = useState(messages);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        user: 'You',
        avatar: 'ME',
        message: newMessage,
        time: 'now',
        likes: 0,
        replies: 0,
      };
      setChatMessages((prev) => [...prev, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* --- Pinned Sidebar ---
      <div className="sticky top-0 h-screen w-52 bg-background border-r border-border overflow-y-auto">
        <Sidebar />
      </div> */}

      {/* --- Chat Area --- */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <h1 className="text-xl font-bold text-foreground mb-1">Community Chat</h1>
          <p className="text-sm text-muted-foreground">Connect with fellow artisans across India</p>
        </div>

        {/* Messages scrollable box fills remaining space */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {chatMessages.map((message) => (
            <Card
              key={message.id}
              className="shadow-card hover:shadow-warm transition-shadow text-sm"
            >
              <CardContent className="p-3">
                <div className="flex items-start gap-2">
                  {/* Avatar */}
                  <div className="w-8 h-8 bg-gradient-to-br from-terracotta to-terracotta-light rounded-full flex items-center justify-center text-primary-foreground font-semibold text-xs">
                    {message.avatar}
                  </div>

                  {/* Message Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground text-sm">{message.user}</h3>
                      <span className="text-[10px] text-muted-foreground">{message.time}</span>
                    </div>

                    <p className="text-foreground mb-2 text-sm">{message.message}</p>

                    {/* Interaction Buttons */}
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-1 text-muted-foreground hover:text-terracotta transition-colors">
                        <Heart className="w-3 h-3" />
                        <span className="text-xs">{message.likes}</span>
                      </button>

                      <button className="flex items-center gap-1 text-muted-foreground hover:text-terracotta transition-colors">
                        <MessageCircle className="w-3 h-3" />
                        <span className="text-xs">{message.replies}</span>
                      </button>

                      <button className="flex items-center gap-1 text-muted-foreground hover:text-terracotta transition-colors">
                        <Share2 className="w-3 h-3" />
                        <span className="text-xs">Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* AI Enhanced Message Suggestion */}
          <Card className="shadow-card border-terracotta/20 text-sm">
            <CardContent className="p-3">
              <div className="flex items-center gap-1 mb-1">
                <Sparkles className="w-3 h-3 text-terracotta" />
                <span className="text-xs font-medium text-terracotta">AI Suggestion</span>
              </div>
              <p className="text-muted-foreground text-xs">
                "Share your latest creation with the community! Tell them about your artistic journey
                and techniques."
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Input stays visible at bottom */}
        <div className="p-3 bg-secondary/50 border-t border-border">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-background text-sm"
            />
            <Button
              variant="chat"
              size="icon"
              onClick={handleSendMessage}
              className="shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
