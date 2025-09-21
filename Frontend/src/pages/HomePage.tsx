import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import heroImage from '@/assets/hero-pottery.jpg';
import madhubaniArt from '@/assets/madhubani-art.jpg';
import gondArt from '@/assets/gond-art.jpg';
import potteryCollection from '@/assets/pottery-collection.jpg';
import embroidery from '@/assets/embroidery.png';
import dolls from '@/assets/dolls.png';
import wooven from '@/assets/wooven.png';
import master from '@/assets/master.png'; 
import { Link } from 'react-router-dom';

const featuredArtworks = [
  {
    id: 1,
    title: "Paintings",
    image: madhubaniArt,
    category: "Traditional Art"
  },
  {
    id: 2,
    title: "Earthen Harmony (Pottery)",
    image: potteryCollection,
    category: "Ceramics"
  },
  {
    id: 3,
    title: "Embroidery",
    image: embroidery,
    category: "Textile Art"
  },
  {
    id: 4,
    title: "Whispers of Dolls",
    image: dolls,
    category: "Handicrafts"
  },
  {
    id: 5,
    title: "Woven Dreams",
    image: wooven,
    category: "Textile Art"
  },
  {
    id: 6,
    title: "Masterwork",
    image: master,
    category: "Mixed Media"
  }
];

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-terracotta-dark/30
          "></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
              Discover & Collect<br />
              <span className="text-terracotta-light">Unique Art from</span><br />
              Passionate Artisans
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link to="/gallery">
                <Button variant="hero" size="lg" className="text-base px-6 py-3 h-auto">
                  Explore Art
                </Button>
              </Link>
              <Link to="/storyteller">
                <Button variant="outline" size="lg" className="text-base px-6 py-3 h-auto bg-white/10 backdrop-blur-sm border-white/30 text-primary-foreground hover:bg-white/">
                  Add New Story
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" size="lg" className="text-base px-6 py-3 h-auto bg-white/10 backdrop-blur-sm border-white/30 text-primary-foreground hover:bg-white/">
                  Join as an Artisan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artworks Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Featured Artworks
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArtworks.map((artwork) => (
              <Link key={artwork.id} to={`/artwork/${artwork.id}`}>
                <Card className="group overflow-hidden hover:shadow-elegant transition-all duration-300 hover:scale-105 bg-card">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={artwork.image} 
                      alt={artwork.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-terracotta-dark/40"></div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-card-foreground mb-2">
                      {artwork.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {artwork.category}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};