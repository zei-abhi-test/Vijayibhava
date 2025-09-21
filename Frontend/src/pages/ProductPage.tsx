import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Heart, Share2, ShoppingCart } from 'lucide-react';
import { useParams } from 'react-router-dom';
import madhubaniArt from '@/assets/madhubani-art.jpg';

export const ProductPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock product data
  const product = {
    id: 1,
    title: "Madhubani Paintings",
    price: "₹950",
    dimension: "14 x 11 inch",
    location: "BIHAR",
    artist: "Priya Sharma",
    rating: 4.8,
    reviews: 12,
    images: [madhubaniArt, madhubaniArt, madhubaniArt],
    details: {
      artForm: "Madhubani painting, known for its intricate expressions and vivid detailing.",
      material: "Hand-painted on premium quality handmade paper.",
      pigments: "Natural pigments are used for coloring.",
      colors: "Rich, vibrant hues with intricate fine-line detailing and symbolic patterns.",
      theme: "Radha-Krishna love.",
      quality: "Described as premium quality handmade paper and rich, vibrant colors with intricate detailing."
    },
    story: "Born and raised in the vibrant villages of Madhubani, Priya Sharma learned this ancient art form from her grandmother, who was one of the most celebrated Madhubani artists in her region. For over three generations, her family has been preserving and practicing this beautiful folk art that originated in the Mithila region of Bihar.\n\nPriya's journey began at the age of 12 when she would sit beside her grandmother, watching her create magical stories on paper with natural pigments and bamboo brushes. The intricate patterns, the symbolic representations of nature, gods, and goddesses, and the bold, vibrant colors fascinated young Priya.\n\nEach painting tells a story - this particular piece represents the eternal love of Radha and Krishna, depicted through traditional motifs of fish, peacocks, and lotus flowers. The fish symbolizes fertility and good luck, while the intricate geometric patterns around the border represent the cosmic universe."
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-secondary">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImage === index ? 'border-terracotta' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{product.title}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{product.location}</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-terracotta mb-4">{product.price}</div>
              <p className="text-muted-foreground mb-2">DIMENSION: {product.dimension}</p>
            </div>

            {/* Artist Info */}
            <Card className="shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-terracotta to-terracotta-light rounded-full flex items-center justify-center text-primary-foreground font-bold">
                    PS
                  </div>
                  <div>
                    <h3 className="font-semibold">ARTIST:</h3>
                    <p className="text-muted-foreground">{product.artist}</p>
                  </div>
                  <Badge className="ml-auto bg-green-100 text-green-800">4.0★</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-4">
              <Button variant="artisan" size="lg" className="flex-1">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Buy Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsFavorite(!isFavorite)}
                className={isFavorite ? "text-red-500 border-red-500" : ""}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500" : ""}`} />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Details */}
            <Card className="shadow-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Details about the painting:</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Art Form:</span> {product.details.artForm}
                  </div>
                  <div>
                    <span className="font-medium">Material:</span> {product.details.material}
                  </div>
                  <div>
                    <span className="font-medium">Pigments:</span> {product.details.pigments}
                  </div>
                  <div>
                    <span className="font-medium">Colors:</span> {product.details.colors}
                  </div>
                  <div>
                    <span className="font-medium">Theme:</span> {product.details.theme}
                  </div>
                  <div>
                    <span className="font-medium">Quality:</span> {product.details.quality}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Artist's Story */}
        <Card className="mt-12 shadow-card">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Artist's story:</h2>
            <div className="prose prose-gray max-w-none">
              {product.story.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-foreground mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};