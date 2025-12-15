
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Mail, Clock, CheckCircle, Users, Edit, Trash2, Play, Pause, Eye } from 'lucide-react';
import { EmailCampaignDialog } from '../EmailCampaignDialog';
import { useToast } from '@/hooks/use-toast';
import useCampaignsViewModel from '@/viewModels/campiagnViewModel';

interface Campaign {
  id: string;
  name: string;
  status: 'draft' | 'scheduled' | 'active' | 'completed' | 'paused';
  totalLeads: number;
  sent: number;
  opened: number;
  replied: number;
  scheduledDate: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Q1 Tech Outreach',
    status: 'active',
    totalLeads: 250,
    sent: 180,
    opened: 72,
    replied: 18,
    scheduledDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Manufacturing Follow-up',
    status: 'scheduled',
    totalLeads: 120,
    sent: 0,
    opened: 0,
    replied: 0,
    scheduledDate: '2024-01-20'
  },
  {
    id: '3',
    name: 'Holiday Promotion',
    status: 'completed',
    totalLeads: 500,
    sent: 500,
    opened: 245,
    replied: 45,
    scheduledDate: '2023-12-15'
  },
  {
    id: '4',
    name: 'Spring Campaign',
    status: 'draft',
    totalLeads: 75,
    sent: 0,
    opened: 0,
    replied: 0,
    scheduledDate: '2024-02-01'
  }
];

const statusConfig = {
  draft: { label: 'Draft', color: 'bg-gray-100 text-gray-800' },
  scheduled: { label: 'Scheduled', color: 'bg-blue-100 text-blue-800' },
  active: { label: 'Active', color: 'bg-green-100 text-green-800' },
  completed: { label: 'Completed', color: 'bg-purple-100 text-purple-800' },
  paused: { label: 'Paused', color: 'bg-orange-100 text-orange-800' }
};

export const CampaignsTab = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const {loading, error,fetchAll, fetchById, create, update, remove,} = useCampaignsViewModel();

  const handleCampaignAction = (campaignId: string, action: string) => {
    setCampaigns(prev => prev.map(campaign => {
      if (campaign.id === campaignId) {
        switch (action) {
          case 'start':
            return { ...campaign, status: 'active' as const };
          case 'pause':
            return { ...campaign, status: 'paused' as const };
          case 'resume':
            return { ...campaign, status: 'active' as const };
          case 'delete':
            return null;
          default:
            return campaign;
        }
      }
      return campaign;
    }).filter(Boolean) as Campaign[]);

    const actionMessages = {
      start: 'Campaign started successfully',
      pause: 'Campaign paused',
      resume: 'Campaign resumed',
      delete: 'Campaign deleted'
    };

    toast({
      title: "Campaign Updated",
      description: actionMessages[action as keyof typeof actionMessages],
    });
  };

  const handleEditCampaign = (campaignId: string) => {
    toast({
      title: "Edit Campaign",
      description: "Campaign editor would open here",
    });
  };

  const handleViewCampaign = (campaignId: string) => {
    toast({
      title: "View Campaign",
      description: "Campaign details would open here",
    });
  };

  const getOpenRate = (sent: number, opened: number) => {
    return sent > 0 ? Math.round((opened / sent) * 100) : 0;
  };

  const getReplyRate = (sent: number, replied: number) => {
    return sent > 0 ? Math.round((replied / sent) * 100) : 0;
  };

  const getStats = () => {
    const totalCampaigns = campaigns.length;
    const totalEmailsSent = campaigns.reduce((sum, campaign) => sum + campaign.sent, 0);
    const totalOpened = campaigns.reduce((sum, campaign) => sum + campaign.opened, 0);
    const totalReplied = campaigns.reduce((sum, campaign) => sum + campaign.replied, 0);
    const avgOpenRate = totalEmailsSent > 0 ? Math.round((totalOpened / totalEmailsSent) * 100) : 0;
    const avgReplyRate = totalEmailsSent > 0 ? Math.round((totalReplied / totalEmailsSent) * 100) : 0;

    return { totalCampaigns, totalEmailsSent, avgOpenRate, avgReplyRate };
  };

  const stats = getStats();

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Campaigns</p>
                <p className="text-2xl font-bold">{stats.totalCampaigns}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Emails Sent</p>
                <p className="text-2xl font-bold">{stats.totalEmailsSent.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Avg. Open Rate</p>
                <p className="text-2xl font-bold">{stats.avgOpenRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Avg. Reply Rate</p>
                <p className="text-2xl font-bold">{stats.avgReplyRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Email Campaigns</h2>
        <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{campaign.name}</CardTitle>
                <Badge className={statusConfig[campaign.status].color}>
                  {statusConfig[campaign.status].label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Total Leads</p>
                    <p className="font-semibold">{campaign.totalLeads.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Emails Sent</p>
                    <p className="font-semibold">{campaign.sent.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Open Rate</p>
                    <p className="font-semibold">{getOpenRate(campaign.sent, campaign.opened)}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Reply Rate</p>
                    <p className="font-semibold">{getReplyRate(campaign.sent, campaign.replied)}%</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-600">
                      Scheduled: {campaign.scheduledDate}
                    </span>
                  </div>
                  
                  <div className="flex gap-2 flex-wrap">
                    {campaign.status === 'draft' && (
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleCampaignAction(campaign.id, 'start')}
                      >
                        <Play className="h-3 w-3 mr-1" />
                        Start
                      </Button>
                    )}
                    
                    {campaign.status === 'active' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCampaignAction(campaign.id, 'pause')}
                      >
                        <Pause className="h-3 w-3 mr-1" />
                        Pause
                      </Button>
                    )}
                    
                    {campaign.status === 'paused' && (
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleCampaignAction(campaign.id, 'resume')}
                      >
                        <Play className="h-3 w-3 mr-1" />
                        Resume
                      </Button>
                    )}
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditCampaign(campaign.id)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewCampaign(campaign.id)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleCampaignAction(campaign.id, 'delete')}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <EmailCampaignDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
};
