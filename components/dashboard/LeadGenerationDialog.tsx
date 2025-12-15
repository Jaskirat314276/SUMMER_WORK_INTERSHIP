
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Upload, FileText, X, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LeadGenerationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LeadGenerationDialog: React.FC<LeadGenerationDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [generationType, setGenerationType] = useState<'prompt' | 'csv'>('prompt');
  const [keywords, setKeywords] = useState<string[]>(['React', 'SaaS']);
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    prompt: 'Find software companies in San Francisco with 50-200 employees that use React or Node.js...',
    industry: '',
    location: '',
    companySize: '51-200',
    maxLeads: '50'
  });
  const { toast } = useToast();

  const addKeyword = () => {
    if (currentKeyword.trim() && !keywords.includes(currentKeyword.trim())) {
      setKeywords([...keywords, currentKeyword.trim()]);
      setCurrentKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate AI lead generation
    setTimeout(() => {
      setIsGenerating(false);
      const leadCount = parseInt(formData.maxLeads);
      toast({
        title: "Lead Generation Complete",
        description: `Successfully generated ${leadCount} new leads!`,
      });
      onOpenChange(false);
    }, 3000);
  };

  const handleFileUpload = () => {
    // Simulate file upload
    toast({
      title: "File Upload Started",
      description: "Processing your CSV file...",
    });
    
    setTimeout(() => {
      toast({
        title: "Upload Complete",
        description: "Successfully imported 150 leads from CSV!",
      });
      onOpenChange(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Generate New Leads</DialogTitle>
          <DialogDescription>
            Use AI to discover new leads based on your criteria or upload a CSV file.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Generation Type Toggle */}
          <div className="flex space-x-2">
            <Button
              variant={generationType === 'prompt' ? 'default' : 'outline'}
              onClick={() => setGenerationType('prompt')}
              className="flex-1"
            >
              <Search className="h-4 w-4 mr-2" />
              AI Generation
            </Button>
            <Button
              variant={generationType === 'csv' ? 'default' : 'outline'}
              onClick={() => setGenerationType('csv')}
              className="flex-1"
            >
              <Upload className="h-4 w-4 mr-2" />
              CSV Upload
            </Button>
          </div>

          {generationType === 'prompt' ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prompt">Natural Language Prompt</Label>
                <Textarea
                  id="prompt"
                  value={formData.prompt}
                  onChange={(e) => handleInputChange('prompt', e.target.value)}
                  placeholder="Find software companies in San Francisco with 50-200 employees that use React or Node.js..."
                  className="min-h-[100px]"
                />
                <p className="text-sm text-gray-600">
                  Describe your ideal prospects in natural language. Be specific about industry, location, company size, or technologies.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry (Optional)</Label>
                  <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location (Optional)</Label>
                  <Input 
                    placeholder="San Francisco, CA" 
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add keyword (e.g., React, SaaS, B2B)"
                    value={currentKeyword}
                    onChange={(e) => setCurrentKeyword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                  />
                  <Button type="button" onClick={addKeyword}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {keywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary" className="gap-1">
                      {keyword}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeKeyword(keyword)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-size">Company Size</Label>
                  <Select value={formData.companySize} onValueChange={(value) => handleInputChange('companySize', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-1000">201-1000 employees</SelectItem>
                      <SelectItem value="1000+">1000+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-leads">Max Leads to Generate</Label>
                  <Select value={formData.maxLeads} onValueChange={(value) => handleInputChange('maxLeads', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="25">25 leads</SelectItem>
                      <SelectItem value="50">50 leads</SelectItem>
                      <SelectItem value="100">100 leads</SelectItem>
                      <SelectItem value="250">250 leads</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">Upload CSV File</p>
                <p className="text-sm text-gray-600 mb-4">
                  Upload a CSV file with your lead data. Required columns: Company Name, Contact Email
                </p>
                <Button variant="outline" onClick={handleFileUpload}>
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File 
                </Button>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">CSV Format Requirements:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Company Name (required)</li>
                  <li>• Contact Email (required)</li>
                  <li>• Contact Name (optional)</li>
                  <li>• Phone Number (optional)</li>
                  <li>• Industry (optional)</li>
                  <li>• Website (optional)</li>
                </ul>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              onClick={generationType === 'prompt' ? handleGenerate : handleFileUpload}
              disabled={isGenerating}
            >
              {isGenerating && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {generationType === 'prompt' ? 'Generate Leads' : 'Upload CSV'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
