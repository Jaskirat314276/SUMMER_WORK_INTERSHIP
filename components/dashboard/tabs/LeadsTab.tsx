import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { LeadGenerationDialog } from '../LeadGenerationDialog';
import { LeadDetailsPanel } from '../LeadDetailsPanel';
import { Plus, Search, Filter, Users, Clock, CheckCircle, AlertCircle, Mail, Trash2, Edit } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import useDashboardViewModel from '@/viewModels/leadsViewModels';
import { useAuth } from '@/contexts/AuthContext';

interface Lead {
  id: string;
  company: string;
  contact: string;
  email: string;
  status: 'not-interested' | 'follow-up' | 'interested' | 'immediate-action';
  confidence: number;
  lastContact: string;
  industry: string;
}

const mockLeads: Lead[] = [
  {
    id: '1',
    company: 'TechCorp Solutions',
    contact: 'Sarah Johnson',
    email: 'sarah@techcorp.com',
    status: 'interested',
    confidence: 85,
    lastContact: '2024-01-15',
    industry: 'Technology'
  },
  {
    id: '2',
    company: 'Global Industries',
    contact: 'Mike Chen',
    email: 'mike@global.com',
    status: 'follow-up',
    confidence: 72,
    lastContact: '2024-01-14',
    industry: 'Manufacturing'
  },
  {
    id: '3',
    company: 'StartUp Inc',
    contact: 'Alex Rivera',
    email: 'alex@startup.com',
    status: 'immediate-action',
    confidence: 95,
    lastContact: '2024-01-16',
    industry: 'Technology'
  },
  {
    id: '4',
    company: 'Health Solutions LLC',
    contact: 'Dr. Emma Wilson',
    email: 'emma@healthsolutions.com',
    status: 'interested',
    confidence: 88,
    lastContact: '2024-01-17',
    industry: 'Healthcare'
  },
  {
    id: '5',
    company: 'Finance Pro',
    contact: 'Robert Smith',
    email: 'robert@financepro.com',
    status: 'follow-up',
    confidence: 76,
    lastContact: '2024-01-13',
    industry: 'Finance'
  }
];

const statusConfig = {
  'not-interested': { label: 'Not Interested', color: 'bg-red-100 text-red-800' },
  'follow-up': { label: 'Follow Up', color: 'bg-yellow-100 text-yellow-800' },
  'interested': { label: 'Interested', color: 'bg-blue-100 text-blue-800' },
  'immediate-action': { label: 'Immediate Action', color: 'bg-green-100 text-green-800' }
};

export const LeadsTab = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [data, setData] = useState();
  const [stat, setStat] = useState<{
    interested: number;
    followUp: number;
    highPriority: number;
  }>({ interested: 0, followUp: 0, highPriority: 0 });
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isGenerationOpen, setIsGenerationOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();
  const { loading, error, fetchDashboardLeads, remove, bulkDelete, bulkUpdateStatus } = useDashboardViewModel();
  const { user } = useAuth();
  console.log("user   is", user);
  const tenantId = user?.id || 'default-tenant-id';
  console.log("tennatnt id is ", tenantId);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchDashboardLeads(tenantId);
      console.log("respose " ,res);
      if(!res) {
        setLeads(mockLeads);
        return ;
      }
      const mapped : Lead[] = res.leads.map(l => ({
        id: l.companyName+" "+l.contactEmail,
        company: l.companyName,
        contact: l.contactName,
        email : l.contactEmail,
        status: l.status.toLowerCase().replace('_', '-') as Lead['status'],
        confidence: 0,
        lastContact: 'dummyData',
        industry: 'dummy ind',
      }));
      setLeads(mapped);
      setStat(res.stats);
    };
    fetchData();
  }, [])


  const handleLeadSelect = (leadId: string) => {
    setSelectedLeads(prev =>
      prev.includes(leadId)
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const handleBulkStatusChange = async (newStatus: string) => {
  if (!tenantId || selectedLeads.length === 0) return;
  const ok = await bulkUpdateStatus(selectedLeads, newStatus, tenantId);
  if (ok) {
    setLeads((prev) =>
      prev.map((l) =>
        selectedLeads.includes(l.id) ? { ...l, status: newStatus as Lead['status'] } : l
      )
    );
    toast({ title: "Status Updated", description: `${selectedLeads.length} updated` });
    setSelectedLeads([]);
  } else {
    toast({ title: "Update failed", description: error, variant: "destructive" });
  }
};

  const handleDeleteLead = async (leadId: string) => {
    if (!tenantId) return;

    const ok = await remove(leadId, tenantId);
    if (ok) {
      // remove from local state
      setLeads((prev) => prev.filter((l) => l.id !== leadId));
      toast({
        title: "Lead deleted",
        description: "The lead was removed successfully.",
      });
    } else {
      toast({
        title: "Delete failed",
        description: "Could not delete the lead. Try again.",
        variant: "destructive",
      });
    }
  };

  const handleBulkEmail = () => {
    toast({
      title: "Email Campaign Started",
      description: `Email campaign initiated for ${selectedLeads.length} leads`,
    });
    setSelectedLeads([]);
  };

  const handleBulkDelete = async () => {
  if (!tenantId || selectedLeads.length === 0) return;
  const ok = await bulkDelete(selectedLeads, tenantId);
  if (ok) {
    setLeads((prev) => prev.filter((l) => !selectedLeads.includes(l.id)));
    toast({ title: "Leads Deleted", description: `${selectedLeads.length} deleted` });
    setSelectedLeads([]);
  } else {
    toast({ title: "Delete failed", description: error, variant: "destructive" });
  }
};
  const handleExport = () => {
    const csvContent = [
      ['Company', 'Contact', 'Email', 'Status', 'Confidence', 'Industry'],
      ...leads.map(lead => [
        lead.company,
        lead.contact,
        lead.email,
        lead.status,
        lead.confidence.toString(),
        lead.industry
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads.csv';
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "Leads have been exported to CSV",
    });
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStats = () => {
    const total = leads.length;
    const interested = leads.filter(l => l.status === 'interested').length;
    const followUp = leads.filter(l => l.status === 'follow-up').length;
    const highPriority = leads.filter(l => l.status === 'immediate-action').length;
    return { total, interested, followUp, highPriority };
  };

  const stats = stat;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold">{stat.interested + stat.followUp + stat.highPriority}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Interested</p>
                <p className="text-2xl font-bold">{stat.interested}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Follow Up</p>
                <p className="text-2xl font-bold">{stat.followUp}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">High Priority</p>
                <p className="text-2xl font-bold">{stat.highPriority}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search leads..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="interested">Interested</SelectItem>
                  <SelectItem value="follow-up">Follow Up</SelectItem>
                  <SelectItem value="immediate-action">Immediate Action</SelectItem>
                  <SelectItem value="not-interested">Not Interested</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={handleExport} className="gap-2">
                <Filter className="h-4 w-4" />
                Export CSV
              </Button>
            </div>

            <Button onClick={() => setIsGenerationOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Generate Leads
            </Button>
          </div>

          {selectedLeads.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
              <span className="text-sm text-blue-700">
                {selectedLeads.length} leads selected
              </span>
              <div className="flex gap-2">
                <Select onValueChange={handleBulkStatusChange}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Change Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="interested">Interested</SelectItem>
                    <SelectItem value="follow-up">Follow Up</SelectItem>
                    <SelectItem value="immediate-action">Immediate Action</SelectItem>
                    <SelectItem value="not-interested">Not Interested</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm" variant="outline" onClick={handleBulkEmail}>
                  <Mail className="h-4 w-4 mr-1" />
                  Send Email
                </Button>
                <Button size="sm" variant="outline" onClick={handleBulkDelete}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Leads Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Leads ({filteredLeads.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <Checkbox
                      checked={selectedLeads.includes(lead.id)}
                      onCheckedChange={() => handleLeadSelect(lead.id)}
                      onClick={(e) => e.stopPropagation()}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">{lead.company}</h3>
                        <Badge className={statusConfig[lead.status].color}>
                          {statusConfig[lead.status].label}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{lead.contact} • {lead.email}</p>
                      <p className="text-xs text-gray-500">{lead.industry} • Last contact: {lead.lastContact}</p>
                    </div>

                    <div className="text-right">
                      <div className={`text-sm font-medium ${getConfidenceColor(lead.confidence)}`}>
                        {lead.confidence}% confidence
                      </div>
                    </div>
                  </div>
                ))}

                {filteredLeads.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No leads found matching your criteria
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <LeadDetailsPanel lead={selectedLead} onClose={() => setSelectedLead(null)} />
        </div>
      </div>

      <LeadGenerationDialog
        open={isGenerationOpen}
        onOpenChange={setIsGenerationOpen}
      />
    </div>
  );
};
