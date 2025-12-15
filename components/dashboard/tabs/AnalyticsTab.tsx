
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Mail, Users, Eye, Reply, AlertCircle, Download } from 'lucide-react';

const emailPerformanceData = [
  { month: 'Jan', sent: 450, opened: 180, replied: 45 },
  { month: 'Feb', sent: 520, opened: 208, replied: 52 },
  { month: 'Mar', sent: 480, opened: 192, replied: 48 },
  { month: 'Apr', sent: 600, opened: 240, replied: 60 },
  { month: 'May', sent: 680, opened: 272, replied: 68 },
  { month: 'Jun', sent: 750, opened: 300, replied: 75 }
];

const leadSourceData = [
  { name: 'AI Generated', value: 45, color: '#3B82F6' },
  { name: 'CSV Upload', value: 30, color: '#10B981' },
  { name: 'Manual Entry', value: 15, color: '#F59E0B' },
  { name: 'API Import', value: 10, color: '#EF4444' }
];

const campaignStats = [
  { id: 1, name: 'Q1 Tech Outreach', sent: 250, opened: 100, replied: 25, status: 'completed' },
  { id: 2, name: 'Manufacturing Follow-up', sent: 150, opened: 60, replied: 12, status: 'active' },
  { id: 3, name: 'Holiday Promotion', sent: 500, opened: 200, replied: 40, status: 'completed' },
  { id: 4, name: 'Spring Campaign', sent: 300, opened: 120, replied: 30, status: 'active' }
];

export const AnalyticsTab = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const handleExportReport = () => {
    // Simulate report generation
    console.log('Generating analytics report...');
    alert('Analytics report will be downloaded shortly!');
  };

  const getOpenRate = (sent: number, opened: number) => {
    return sent > 0 ? Math.round((opened / sent) * 100) : 0;
  };

  const getReplyRate = (sent: number, replied: number) => {
    return sent > 0 ? Math.round((replied / sent) * 100) : 0;
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">7 Days</SelectItem>
              <SelectItem value="30days">30 Days</SelectItem>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={handleExportReport} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Emails Sent</p>
                <p className="text-2xl font-bold">3,480</p>
                <p className="text-xs text-green-600">+12% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Average Open Rate</p>
                <p className="text-2xl font-bold">40%</p>
                <p className="text-xs text-green-600">+5% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Reply className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Average Reply Rate</p>
                <p className="text-2xl font-bold">10%</p>
                <p className="text-xs text-red-600">-2% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Active Leads</p>
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-xs text-green-600">+18% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Email Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={emailPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sent" stroke="#3B82F6" strokeWidth={2} name="Sent" />
                <Line type="monotone" dataKey="opened" stroke="#10B981" strokeWidth={2} name="Opened" />
                <Line type="monotone" dataKey="replied" stroke="#F59E0B" strokeWidth={2} name="Replied" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Lead Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leadSourceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {leadSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Campaign</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-right p-2">Sent</th>
                  <th className="text-right p-2">Opened</th>
                  <th className="text-right p-2">Replied</th>
                  <th className="text-right p-2">Open Rate</th>
                  <th className="text-right p-2">Reply Rate</th>
                </tr>
              </thead>
              <tbody>
                {campaignStats.map((campaign) => (
                  <tr key={campaign.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">{campaign.name}</td>
                    <td className="p-2">
                      <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                        {campaign.status}
                      </Badge>
                    </td>
                    <td className="p-2 text-right">{campaign.sent.toLocaleString()}</td>
                    <td className="p-2 text-right">{campaign.opened.toLocaleString()}</td>
                    <td className="p-2 text-right">{campaign.replied.toLocaleString()}</td>
                    <td className="p-2 text-right">{getOpenRate(campaign.sent, campaign.opened)}%</td>
                    <td className="p-2 text-right">{getReplyRate(campaign.sent, campaign.replied)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* SMTP Health Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            SMTP Health & Deliverability
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">98.5%</div>
              <div className="text-sm text-gray-600">Delivery Rate</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">2.1%</div>
              <div className="text-sm text-gray-600">Bounce Rate</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">0.3%</div>
              <div className="text-sm text-gray-600">Spam Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
