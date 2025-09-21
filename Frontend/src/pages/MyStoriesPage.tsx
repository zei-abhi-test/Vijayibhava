import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Eye, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const stories = [
  {
    id: 1,
    title: "The Art of Madhubani",
    status: "Published",
    views: 234,
    likes: 45,
    thumbnail: "placeholder",
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    title: "Traditional Pottery Making",
    status: "Draft",
    views: 0,
    likes: 0,
    thumbnail: "placeholder",
    createdAt: "2024-01-20"
  }
];

export const MyStoriesPage = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">My Stories</h1>
            <p className="text-muted-foreground">Manage your artistic narratives and creations</p>
          </div>
          
          <Link to="/storyteller">
            <Button variant="artisan" size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Create New Story
            </Button>
          </Link>
        </div>

        {/* Stories Grid */}
        {stories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <Card key={story.id} className="shadow-card hover:shadow-elegant transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="aspect-video bg-secondary rounded-lg mb-3 flex items-center justify-center">
                    <div className="text-center">
                      <Eye className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Story Preview</p>
                    </div>
                  </div>
                  
                  <CardTitle className="text-lg">{story.title}</CardTitle>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      story.status === 'Published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {story.status}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(story.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>{story.views} views</span>
                    <span>{story.likes} likes</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No stories yet</h3>
            <p className="text-muted-foreground mb-6">
              Start sharing your artistic journey by creating your first story
            </p>
            <Link to="/storyteller">
              <Button variant="artisan" size="lg">
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Story
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};