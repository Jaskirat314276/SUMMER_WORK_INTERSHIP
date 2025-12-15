
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { X, Mail, Phone, Globe, Calendar, User, Building } from 'lucide-react';

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

interface LeadDetailsPanelProps {
  lead: Lead | null;
  onClose: () => void;
}

const statusConfig = {
  'not-interested': { label: 'Not Interested', color: 'bg-red-100 text-red-800' },
  'follow-up': { label: 'Follow Up', color: 'bg-yellow-100 text-yellow-800' },
  'interested': { label: 'Interested', color: 'bg-blue-100 text-blue-800' },
  'immediate-action': { label: 'Immediate Action', color: 'bg-green-100 text-green-800' }
};

export const LeadDetailsPanel: React.FC<LeadDetailsPanelProps> = ({ lead, onClose }) => {
  const [notes, setNotes] = useState('Initial contact made via LinkedIn. Showed interest in our automation tools.');

  if (!lead) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-gray-500">
          <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>Select a lead to view details</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">Lead Details</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-gray-500" />
            <span className="font-semibold">{lead.company}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-500" />
            <span>{lead.contact}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{lead.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm">Last contact: {lead.lastContact}</span>
          </div>
        </div>

        <Separator />

        {/* Status and Confidence */}
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
            <Select defaultValue={lead.status}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not-interested">Not Interested</SelectItem>
                <SelectItem value="follow-up">Follow Up</SelectItem>
                <SelectItem value="interested">Interested</SelectItem>
                <SelectItem value="immediate-action">Immediate Action</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">AI Confidence</label>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${lead.confidence}%` }}
                />
              </div>
              <span className="text-sm font-medium">{lead.confidence}%</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Additional Info */}
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700">Industry</label>
            <p className="text-sm">{lead.industry}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Company Size</label>
            <p className="text-sm">51-200 employees</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Location</label>
            <p className="text-sm">San Francisco, CA</p>
          </div>
        </div>

        <Separator />

        {/* Notes */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Notes</label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes about this lead..."
            className="min-h-[100px]"
          />
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Button className="w-full gap-2">
            <Mail className="h-4 w-4" />
            Send Email
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-1" />
              Call
            </Button>
            <Button variant="outline" size="sm">
              <Globe className="h-4 w-4 mr-1" />
              Website
            </Button>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Recent Activity</label>
          <div className="space-y-2">
            <div className="text-xs text-gray-600 p-2 bg-gray-50 rounded">
              <strong>Jan 16:</strong> Lead imported from CSV
            </div>
            <div className="text-xs text-gray-600 p-2 bg-gray-50 rounded">
              <strong>Jan 15:</strong> AI classified as "Interested" (85% confidence)
            </div>
            <div className="text-xs text-gray-600 p-2 bg-gray-50 rounded">
              <strong>Jan 14:</strong> Initial contact attempt
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
