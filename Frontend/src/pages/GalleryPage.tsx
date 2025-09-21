import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import madhubaniArt from '@/assets/madhubani-art.jpg';
import gondArt from '@/assets/gond-art.jpg';
import potteryCollection from '@/assets/pottery-collection.jpg';

const artworks = [
  {
    id: 1,
    title: "Madhubani Painting",
    artist: "Priya Sharma",
    location: "Bihar",
    state: "Bihar - GI tag",
    image: madhubaniArt,
    price: "₹950",
    rating: 4.8,
    category: "Paintings"
  },
  {
    id: 2,
    title: "Gond Painting",
    artist: "Rajesh Tekam",
    location: "Madhya Pradesh",
    state: "Madhya Pradesh - GI tag",
    image: gondArt,
    price: "₹1,200",
    rating: 4.9,
    category: "Paintings"
  },
  {
    id: 3,
    title: "Mughal Miniature Painting",
    artist: "Fatima Khan",
    location: "Rajasthan",
    state: "Rajasthan",
    image: potteryCollection,
    price: "₹2,800",
    rating: 4.7,
    category: "Paintings"
  },
  {
    id: 4,
    title: "Kerala Mural Painting",
    artist: "Suresh Nair",
    location: "Uttar Pradesh",
    state: "Uttar Pradesh",
    image: madhubaniArt,
    price: "₹1,850",
    rating: 4.6,
    category: "Paintings"
  },
  {
    id: 5,
    title: "Pichwai Painting",
    artist: "Meera Devi",
    location: "Rajasthan",
    state: "Rajasthan - GI tag",
    image: gondArt,
    price: "₹3,200",
    rating: 4.9,
    category: "Paintings"
  },
  {
    id: 6,
    title: "Kalighat Painting",
    artist: "Amit Roy",
    location: "West Bengal",
    state: "West Bengal - GI tag",
    image: potteryCollection,
    price: "₹1,450",
    rating: 4.5,
    category: "Paintings"
  }
];

const categories = ["All", "Paintings", "Pottery", "Textiles", "Jewelry", "Sculptures"];

export const GalleryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredArtworks = artworks.filter(artwork => {
    const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artwork.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || artwork.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-terracotta to-terracotta-light shadow-warm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-primary-foreground mb-4">Art Gallery</h1>
          <p className="text-primary-foreground/90 text-lg">
            Discover authentic Indian art from talented artisans across the country
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search artworks or artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "artisan" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredArtworks.length} of {artworks.length} artworks
          </p>
        </div>

        {/* Artwork Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtworks.map((artwork) => (
            <Link key={artwork.id} to={`/artwork/${artwork.id}`}>
              <Card className="group hover:shadow-elegant transition-all duration-300 hover:scale-105 overflow-hidden">
                <div className="relative">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-white/90 text-foreground">
                      {artwork.category}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-terracotta transition-colors">
                    {artwork.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-2">{artwork.artist}</p>
                  
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{artwork.state}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{artwork.rating}</span>
                    </div>
                    <span className="font-bold text-lg text-terracotta">{artwork.price}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Load More */}
        {filteredArtworks.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Artworks
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};