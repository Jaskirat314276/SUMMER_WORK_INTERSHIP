
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

 interface AdditionalSignupDialogProps {
   isOpen: boolean;
   onComplete: (data: {
     productDescription: string;
     targetMarket: string;
     role: string;
     hearAboutUs: string;
     primaryGoal: string;
   } | null) => void;
 }

export const AdditionalSignupDialog: React.FC<AdditionalSignupDialogProps> = ({
  isOpen,
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Product Details
    productDescription: '',
    targetMarket: '',
    // Survey
    role: '',
    hearAboutUs: '',
    primaryGoal: ''
  });
  const { toast } = useToast();

  // Debug logging
  console.log('AdditionalSignupDialog render - isOpen:', isOpen);

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!formData.productDescription || !formData.targetMarket) {
        toast({
          title: "Please fill in all product details",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.role || !formData.hearAboutUs || !formData.primaryGoal) {
      toast({
        title: "Please complete the survey",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    // For debugging: 
    console.log('Survey completed with data:', formData);
    toast({
      title: "Setup completed!",
      description: "Welcome to LeadGen Pro",
      duration: 3000,
    });

    // Pass the entire formData object back to parent
    onComplete({ 
      productDescription: formData.productDescription,
      targetMarket:        formData.targetMarket,
      role:                 formData.role,
      hearAboutUs:          formData.hearAboutUs,
      primaryGoal:          formData.primaryGoal
    });
  };

  const handleSkip = () => {
    console.log('Survey skipped');
    onComplete(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-md z-[100] fixed">
        <DialogHeader>
          <DialogTitle>Complete Your Setup</DialogTitle>
        </DialogHeader>

        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="font-semibold">Product Information</h3>
              <p className="text-sm text-gray-600">Step 1 of 2</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-description">Product/Service Description *</Label>
              <Textarea
                id="product-description"
                placeholder="Describe what your company offers"
                value={formData.productDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, productDescription: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="target-market">Target Market *</Label>
              <Textarea
                id="target-market"
                placeholder="Describe your ideal customers"
                value={formData.targetMarket}
                onChange={(e) => setFormData(prev => ({ ...prev, targetMarket: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="flex space-x-2">
              <Button type="button" variant="outline" onClick={handleSkip} className="flex-1">
                Skip
              </Button>
              <Button type="button" onClick={handleNextStep} className="flex-1">
                Next
              </Button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <form onSubmit={handleComplete} className="space-y-4">
            <div className="text-center">
              <h3 className="font-semibold">Quick Survey</h3>
              <p className="text-sm text-gray-600">Step 2 of 2</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">What's your role? *</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="founder">Founder/CEO</SelectItem>
                  <SelectItem value="sales">Sales Manager</SelectItem>
                  <SelectItem value="marketing">Marketing Manager</SelectItem>
                  <SelectItem value="business-dev">Business Development</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hear-about">How did you hear about us? *</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, hearAboutUs: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="google">Google Search</SelectItem>
                  <SelectItem value="social-media">Social Media</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="advertisement">Advertisement</SelectItem>
                  <SelectItem value="blog">Blog/Article</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="primary-goal">What's your primary goal? *</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, primaryGoal: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="increase-leads">Increase Lead Generation</SelectItem>
                  <SelectItem value="improve-conversion">Improve Conversion Rates</SelectItem>
                  <SelectItem value="automate-process">Automate Sales Process</SelectItem>
                  <SelectItem value="better-tracking">Better Lead Tracking</SelectItem>
                  <SelectItem value="team-collaboration">Team Collaboration</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-2">
              <Button type="button" variant="outline" onClick={handlePreviousStep} className="flex-1">
                Previous
              </Button>
              <Button type="submit" className="flex-1">
                Complete Setup
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
