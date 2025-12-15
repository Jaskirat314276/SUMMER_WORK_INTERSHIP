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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, Eye, Send, Calendar, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import useCampaignsViewModel from '@/viewModels/campiagnViewModel';
import { useAuth } from '@/contexts/AuthContext';
import { CreateCampaignPayload } from '@/types/campaignTypes';
import useTemplatesViewModel from '@/viewModels/templateViewModel';

interface EmailCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EmailCampaignDialog: React.FC<EmailCampaignDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const { loading, error, create } = useCampaignsViewModel();
  const { user } = useAuth();
  const tenantId = user!.tenantId;
  const [templateId, setTemplateId] = useState<string>('');
  const [scheduledAt, setScheduledAt] = useState<string>('');
  const {
    templates,
    loading: tplLoading,
    error: tplError,
    createTemplate
  } = useTemplatesViewModel(tenantId);
  const [emailTemplate, setEmailTemplate] = useState(`Subject: Boost Your Sales with AI-Powered Lead Generation

Hi {{contact_name}},

I hope this email finds you well. I noticed that {{company_name}} is in the {{industry}} industry and thought you might be interested in how we're helping similar companies increase their sales efficiency.

Our AI-powered lead generation platform has helped companies like yours:
• Discover 3x more qualified prospects
• Reduce manual research time by 80%
• Increase email response rates by 45%

Would you be open to a brief 15-minute call this week to discuss how this could benefit {{company_name}}?

Best regards,
John Doe
Sales Manager`);

  const [campaignData, setCampaignData] = useState({
    name: 'Q1 Tech Outreach Campaign',
    type: 'cold-outreach',
    description: '',
    senderName: 'John Doe',
    senderEmail: 'john@company.com',
    sendOption: 'now',
    sendDate: '',
    sendTime: '09:00',
    sendRate: '5'
  });

  const [selectedSegments, setSelectedSegments] = useState({
    interested: true,
    followUp: false,
    highConfidence: true
  });
  const [tplName, setTplName] = useState("");
  const [tplSubject, setTplSubject] = useState("");
  const [tplBody, setTplBody] = useState("");
  const [tplFrom, setTplFrom] = useState("");
  const [tplTo, setTplTo] = useState("");
  const [isNewTpl,setIsNewTpl] = useState(false);

  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setCampaignData(prev => ({ ...prev, [field]: value }));
  };

  const handleSegmentChange = (segment: string, checked: boolean) => {
    setSelectedSegments(prev => ({ ...prev, [segment]: checked }));
  };

  const insertVariable = (variable: string) => {
    setEmailTemplate(prev => prev + ' ' + variable);
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your campaign has been saved as a draft.",
    });
    onOpenChange(false);
  };

  const handleCreateCampaign = async () => {
    if (!tenantId || !templateId) {
      toast({
        title: "Missing info",
        description: "Please select a template before creating.",
        variant: "destructive",
      });
      return;
    }

    // Build the payload
    const payload: CreateCampaignPayload = {
      tenantId,
      templateId,
      ...(scheduledAt ? { scheduledAt } : {})
    };

    // Call the view-model
    console.log("payload is ",payload);
    const newCampaign = await create(payload);

    if (newCampaign) {
      toast({
        title: "Campaign Created",
        description: `Campaign "${newCampaign.id}" created successfully`,
      });
      onOpenChange(false);
    } else {
      toast({
        title: "Creation Failed",
        description: error || "Unknown error",
        variant: "destructive",
      });
    }
  };

  const getSelectedLeadsCount = () => {
    let count = 0;
    if (selectedSegments.interested) count += 156;
    if (selectedSegments.followUp) count += 89;
    if (selectedSegments.highConfidence) count += 67;
    return count;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Email Campaign</DialogTitle>
          <DialogDescription>
            Set up a new email campaign with templates, scheduling, and audience selection.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="setup" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="setup">Setup</TabsTrigger>
            <TabsTrigger value="template">Template</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="setup" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="campaign-name">Campaign Name</Label>
                <Input
                  id="campaign-name"
                  value={campaignData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Q1 Tech Outreach Campaign"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="campaign-type">Campaign Type</Label>
                <Select value={campaignData.type} onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cold-outreach">Cold Outreach</SelectItem>
                    <SelectItem value="follow-up">Follow-up Sequence</SelectItem>
                    <SelectItem value="nurture">Lead Nurturing</SelectItem>
                    <SelectItem value="re-engagement">Re-engagement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="campaign-description">Description</Label>
              <Textarea
                id="campaign-description"
                value={campaignData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe the purpose and goals of this campaign..."
                className="min-h-[80px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sender-name">Sender Name</Label>
                <Input
                  id="sender-name"
                  value={campaignData.senderName}
                  onChange={(e) => handleInputChange('senderName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sender-email">Sender Email</Label>
                <Input
                  id="sender-email"
                  value={campaignData.senderEmail}
                  onChange={(e) => handleInputChange('senderEmail', e.target.value)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="template" className="space-y-4">
            <div className="space-y-2">
              <Label>Select or Create Email Template</Label>
              <Select
                value={isNewTpl ? "__new__" : templateId}
                onValueChange={(v) => {
                  if (v === "__new__") {
                    setIsNewTpl(true);
                    setTemplateId("");
                  } else {
                    setIsNewTpl(false);
                    setTemplateId(v);
                  }
                }}
              >
                <SelectTrigger><SelectValue placeholder="Pick a template" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="__new__">+ Create New Template</SelectItem>
                  {templates.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {tplError && <p className="text-red-600">{tplError}</p>}
            </div>

            {/* New‐template form */}
            {isNewTpl && (
              <Card className="p-4 space-y-2 border">
                <div className="flex justify-between">
                  <h4 className="font-semibold">New Template</h4>
                  <Button size="sm" onClick={() => setIsNewTpl(false)}>Cancel</Button>
                </div>
                <Input placeholder="Name" value={tplName} onChange={e => setTplName(e.target.value)} />
                <Input placeholder="Subject" value={tplSubject} onChange={e => setTplSubject(e.target.value)} />
                <Textarea placeholder="Body" value={tplBody} onChange={e => setTplBody(e.target.value)} rows={4} />
                <Input placeholder="From" value={tplFrom} onChange={e => setTplFrom(e.target.value)} />
                <Input placeholder="To" value={tplTo} onChange={e => setTplTo(e.target.value)} />
                <Button
                  onClick={async () => {
                    const newTpl = await createTemplate({
                      tenantId,
                      name: tplName,
                      subject: tplSubject,
                      body: tplBody,
                      from: tplFrom,
                      to: tplTo,
                    });
                    if (newTpl) {
                      toast({ title: "Template Created", description: newTpl.name });
                      setTemplateId(newTpl.id);
                      setIsNewTpl(false);
                    }
                  }}
                  disabled={tplLoading || !tplName || !tplSubject}
                >
                  {tplLoading ? "Saving…" : "Save Template"}
                </Button>
              </Card>
            )}
          </TabsContent>


          <TabsContent value="audience" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Lead Segments</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 p-3 border rounded">
                    <Checkbox
                      id="interested-leads"
                      checked={selectedSegments.interested}
                      onCheckedChange={(checked) => handleSegmentChange('interested', checked as boolean)}
                    />
                    <label htmlFor="interested-leads" className="flex-1">
                      <div className="font-medium">Interested Leads</div>
                      <div className="text-sm text-gray-600">156 leads • High engagement potential</div>
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded">
                    <Checkbox
                      id="follow-up-leads"
                      checked={selectedSegments.followUp}
                      onCheckedChange={(checked) => handleSegmentChange('followUp', checked as boolean)}
                    />
                    <label htmlFor="follow-up-leads" className="flex-1">
                      <div className="font-medium">Follow-up Required</div>
                      <div className="text-sm text-gray-600">89 leads • Previously contacted</div>
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded">
                    <Checkbox
                      id="high-confidence"
                      checked={selectedSegments.highConfidence}
                      onCheckedChange={(checked) => handleSegmentChange('highConfidence', checked as boolean)}
                    />
                    <label htmlFor="high-confidence" className="flex-1">
                      <div className="font-medium">High Confidence (&gt;80%)</div>
                      <div className="text-sm text-gray-600">67 leads • AI-verified prospects</div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry-filter">Industry Filter</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All industries" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Industries</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location-filter">Location Filter</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="us-west">US West Coast</SelectItem>
                      <SelectItem value="us-east">US East Coast</SelectItem>
                      <SelectItem value="europe">Europe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{getSelectedLeadsCount()}</div>
                    <div className="text-sm text-gray-600">Total recipients selected</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Send Options</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="send-now"
                      name="send-option"
                      checked={campaignData.sendOption === 'now'}
                      onChange={() => handleInputChange('sendOption', 'now')}
                    />
                    <label htmlFor="send-now" className="flex-1">
                      <div className="font-medium">Send Immediately</div>
                      <div className="text-sm text-gray-600">Start sending emails right away</div>
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="send-scheduled"
                      name="send-option"
                      checked={campaignData.sendOption === 'scheduled'}
                      onChange={() => handleInputChange('sendOption', 'scheduled')}
                    />
                    <label htmlFor="send-scheduled" className="flex-1">
                      <div className="font-medium">Schedule for Later</div>
                      <div className="text-sm text-gray-600">Choose a specific date and time</div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="send-date">Send Date</Label>
                  <Input
                    id="send-date"
                    type="date"
                    value={campaignData.sendDate}
                    onChange={(e) => handleInputChange('sendDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="send-time">Send Time</Label>
                  <Input
                    id="send-time"
                    type="time"
                    value={campaignData.sendTime}
                    onChange={(e) => handleInputChange('sendTime', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="send-rate">Send Rate</Label>
                <Select value={campaignData.sendRate} onValueChange={(value) => handleInputChange('sendRate', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 email per hour</SelectItem>
                    <SelectItem value="5">5 emails per hour</SelectItem>
                    <SelectItem value="10">10 emails per hour</SelectItem>
                    <SelectItem value="20">20 emails per hour</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-600">
                  Slower rates help maintain better deliverability
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Campaign Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Recipients:</span>
                    <span className="font-medium">{getSelectedLeadsCount()} leads</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Send Rate:</span>
                    <span className="font-medium">{campaignData.sendRate} emails/hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Duration:</span>
                    <span className="font-medium">~{Math.ceil(getSelectedLeadsCount() / parseInt(campaignData.sendRate))} hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Daily Limit Impact:</span>
                    <span className="font-medium">{Math.ceil(getSelectedLeadsCount() / 30)} days</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="outline" onClick={handleSaveDraft}>
            <Eye className="h-4 w-4 mr-2" />
            Save as Draft
          </Button>
          <Button onClick={handleCreateCampaign} disabled={isCreating}>
            {isCreating && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            <Send className="h-4 w-4 mr-2" />
            Create Campaign
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
