import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Upload, Eye, X, Save, Loader2 } from 'lucide-react';

export const StorytellerPage = () => {
  const [storyTitle, setStoryTitle] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [materials, setMaterials] = useState('');
  const [techniques, setTechniques] = useState('');
  const [mainContent, setMainContent] = useState('');
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState('');
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      // Basic validation for file size (max 10MB)
      const validFiles = newFiles.filter(file => file.size <= 10 * 1024 * 1024);
      
      if (validFiles.length !== newFiles.length) {
        alert('Some files were too large (max 10MB) and were not added.');
      }
      
      setGalleryFiles(prevFiles => [...prevFiles, ...validFiles]);
    }
  };

  const handleRemoveImage = (index) => {
    setGalleryFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleGenerateStory = async () => {
    if (!aiPrompt.trim()) {
      alert('Please provide a prompt for the AI to generate a story snippet.');
      return;
    }
    
    setIsGenerating(true);
    try {
      // Call the backend API to generate story content
      const response = await fetch('http://localhost:3001/api/generate-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: aiPrompt,
          title: storyTitle,
          introduction,
          materials,
          techniques
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMainContent(prev => prev ? `${prev}\n\n${data.generatedContent}` : data.generatedContent);
      } else {
        throw new Error('Failed to generate story');
      }
    } catch (error) {
      console.error('Error generating story:', error);
      alert('Failed to generate story. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    
    const formData = new FormData();
    formData.append('storyTitle', storyTitle);
    formData.append('introduction', introduction);
    formData.append('aiPrompt', aiPrompt);
    formData.append('materials', materials);
    formData.append('techniques', techniques);
    formData.append('mainContent', mainContent);

    galleryFiles.forEach((file) => {
      formData.append('galleryImages', file);
    });

    try {
      const response = await fetch('http://localhost:3001/api/save-draft', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Draft saved successfully!');
      } else {
        alert('Failed to save draft.');
      }
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('An error occurred while saving the draft.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!storyTitle.trim() || !introduction.trim() || !mainContent.trim()) {
      alert('Please fill in all required fields: Title, Introduction, and Main Content.');
      return;
    }
    
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('storyTitle', storyTitle);
    formData.append('introduction', introduction);
    formData.append('aiPrompt', aiPrompt);
    formData.append('materials', materials);
    formData.append('techniques', techniques);
    formData.append('mainContent', mainContent);

    galleryFiles.forEach((file) => {
      formData.append('galleryImages', file);
    });

    try {
      const response = await fetch('http://localhost:3001/api/upload-content', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('Story and images uploaded successfully!');
        
        // Update content if AI generated enhanced version
        if (data.generatedContent) {
          setMainContent(data.generatedContent);
        }
        
        // Reset form if needed
        // setStoryTitle('');
        // setIntroduction('');
        // setAiPrompt('');
        // setMaterials('');
        // setTechniques('');
        // setMainContent('');
        // setGalleryFiles([]);
      } else {
        alert(data.error || 'Failed to upload content.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <form className="max-w-6xl mx-auto" onSubmit={handleSubmit}>
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Craft Your Story</h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Share the passion, process, and uniqueness behind your creations with AI assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* AI Story Weaver */}
          <Card className="shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="w-5 h-5 text-terracotta" />
                AI Story Weaver
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Story Title *
                </label>
                <Input
                  placeholder="e.g., The Art of Hand-knitted Scarves"
                  value={storyTitle}
                  onChange={(e) => setStoryTitle(e.target.value)}
                  className="bg-background"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Introduction *
                </label>
                <Textarea
                  placeholder="Introduce your craft and its essence..."
                  value={introduction}
                  onChange={(e) => setIntroduction(e.target.value)}
                  className="bg-background min-h-[100px]"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  AI Prompt (Optional)
                </label>
                <Textarea
                  placeholder="Describe your inspiration or process for AI to generate narrative..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="bg-background min-h-[80px]"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Example: "Explain the traditional weaving techniques passed down through generations for this pottery."
                </p>
              </div>

              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={handleGenerateStory}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Story Snippet
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Multimedia Gallery */}
          <Card className="shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Upload className="w-5 h-5 text-terracotta" />
                Multimedia Gallery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {/* Display uploaded images */}
                {galleryFiles.map((file, index) => (
                  <div key={index} className="relative aspect-square rounded-md overflow-hidden border group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Uploaded image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-background/80 backdrop-blur-sm rounded-full p-1 text-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
                      aria-label="Remove image"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                
                {/* Upload button */}
                <label className="aspect-square bg-muted/30 border-2 border-dashed border-border rounded-md flex items-center justify-center cursor-pointer hover:bg-accent/30 transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                  <div className="text-center p-2">
                    <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Upload Images</p>
                  </div>
                </label>
              </div>
              
              {galleryFiles.length > 0 && (
                <p className="text-xs text-muted-foreground mt-3">
                  {galleryFiles.length} image(s) selected
                </p>
              )}
              
              <p className="text-xs text-muted-foreground mt-4">
                Supported formats: JPG, PNG, GIF. Max file size: 10MB per image.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Story Details */}
        <Card className="mt-6 md:mt-8 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Story Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Materials Used
                </label>
                <Input
                  placeholder="e.g., Organic Cotton, Natural Dyes"
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  className="bg-background"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Techniques
                </label>
                <Input
                  placeholder="e.g., Hand-weaving, Block Printing"
                  value={techniques}
                  onChange={(e) => setTechniques(e.target.value)}
                  className="bg-background"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Main Story Content *
              </label>
              <Textarea
                placeholder="Write your story content here or generate it with AI..."
                value={mainContent}
                onChange={(e) => setMainContent(e.target.value)}
                className="bg-background min-h-[150px]"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card className="mt-6 md:mt-8 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Eye className="w-5 h-5 text-terracotta" />
              Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-lg p-6 border">
              {storyTitle || introduction || mainContent || galleryFiles.length > 0 ? (
                <div className="space-y-4">
                  {storyTitle && (
                    <h2 className="text-2xl font-bold text-foreground">{storyTitle}</h2>
                  )}
                  
                  {galleryFiles.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {galleryFiles.slice(0, 4).map((file, index) => (
                        <img
                          key={index}
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="rounded-md object-cover h-32 w-full"
                        />
                      ))}
                    </div>
                  )}
                  
                  {introduction && (
                    <p className="text-foreground/90">{introduction}</p>
                  )}
                  
                  {(materials || techniques) && (
                    <div className="bg-white p-3 rounded-md border">
                      <h3 className="font-medium text-foreground mb-2">Craft Details</h3>
                      {materials && <p className="text-sm"><span className="font-medium">Materials:</span> {materials}</p>}
                      {techniques && <p className="text-sm mt-1"><span className="font-medium">Techniques:</span> {techniques}</p>}
                    </div>
                  )}
                  
                  {mainContent && (
                    <div className="mt-4">
                      <h3 className="font-medium text-foreground mb-2">The Story</h3>
                      <p className="text-foreground/90 whitespace-pre-line">{mainContent}</p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  Your beautifully crafted story will be displayed here, combining text and media in an engaging layout.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6 md:mt-8 justify-end">
          <Button 
            type="button" 
            variant="outline"
            onClick={handleSaveDraft}
            disabled={isSaving}
            className="sm:order-1"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </>
            )}
          </Button>
          <Button 
            type="submit" 
            variant="artisan" 
            size="lg"
            disabled={isSubmitting}
            className="w-full sm:w-auto order-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Publishing...
              </>
            ) : (
              'Publish Story'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};