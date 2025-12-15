
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ManagerManagement } from '@/components/managers/ManagerManagement';
import { useToast } from '@/hooks/use-toast';
import PhoneInputComponent from '@/components/ui/PhoneInputComponent';

export const SettingsTab = () => {
  const [companySettings, setCompanySettings] = useState({
    companyName: 'LeadGen Pro Inc.',
    industry: 'Technology',
    website: 'https://leadgenpro.com',
    address: '123 Business St, Suite 100, City, State 12345',
    phone: '+1 (555) 123-4567'
  });

  const [emailSettings, setEmailSettings] = useState({
    fromName: 'LeadGen Pro Team',
    fromEmail: 'hello@leadgenpro.com',
    replyTo: 'support@leadgenpro.com',
    signature: 'Best regards,\nThe LeadGen Pro Team\n\nhttps://leadgenpro.com'
  });

  const [integrationSettings, setIntegrationSettings] = useState({
    crmIntegration: false,
    emailMarketing: true,
    analytics: true,
    socialMedia: false
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    ipRestriction: false,
    auditLogs: true
  });

  const { toast } = useToast();

  const handleSaveCompanySettings = () => {
    toast({
      title: "Company settings saved!",
      description: "Your company information has been updated successfully.",
      duration: 3000,
    });
  };

  const handleSaveEmailSettings = () => {
    toast({
      title: "Email settings saved!",
      description: "Your email configuration has been updated successfully.",
      duration: 3000,
    });
  };

  const handleSaveIntegrationSettings = () => {
    toast({
      title: "Integration settings saved!",
      description: "Your integration preferences have been updated successfully.",
      duration: 3000,
    });
  };

  const handleSaveSecuritySettings = () => {
    toast({
      title: "Security settings saved!",
      description: "Your security configuration has been updated successfully.",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-gray-600">Manage your account and application settings</p>
      </div>

      <Tabs defaultValue="company" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="managers">Managers</TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={companySettings.companyName}
                  onChange={(e) => setCompanySettings(prev => ({ ...prev, companyName: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="industry">Industry</Label>
                <Select value={companySettings.industry} onValueChange={(value) => setCompanySettings(prev => ({ ...prev, industry: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={companySettings.website}
                  onChange={(e) => setCompanySettings(prev => ({ ...prev, website: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={companySettings.address}
                  onChange={(e) => setCompanySettings(prev => ({ ...prev, address: e.target.value }))}
                />
              </div>

              <div>
              <PhoneInputComponent />
              </div>

              <Button onClick={handleSaveCompanySettings} className="w-full">
                Save Company Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fromName">From Name</Label>
                <Input
                  id="fromName"
                  value={emailSettings.fromName}
                  onChange={(e) => setEmailSettings(prev => ({ ...prev, fromName: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="fromEmail">From Email</Label>
                <Input
                  id="fromEmail"
                  type="email"
                  value={emailSettings.fromEmail}
                  onChange={(e) => setEmailSettings(prev => ({ ...prev, fromEmail: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="replyTo">Reply-To Email</Label>
                <Input
                  id="replyTo"
                  type="email"
                  value={emailSettings.replyTo}
                  onChange={(e) => setEmailSettings(prev => ({ ...prev, replyTo: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="signature">Email Signature</Label>
                <Textarea
                  id="signature"
                  value={emailSettings.signature}
                  onChange={(e) => setEmailSettings(prev => ({ ...prev, signature: e.target.value }))}
                  rows={4}
                />
              </div>

              <Button onClick={handleSaveEmailSettings} className="w-full">
                Save Email Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="crm">CRM Integration</Label>
                  <p className="text-sm text-gray-500">Connect with external CRM systems</p>
                </div>
                <Switch
                  id="crm"
                  checked={integrationSettings.crmIntegration}
                  onCheckedChange={(checked) => setIntegrationSettings(prev => ({ ...prev, crmIntegration: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailMarketing">Email Marketing</Label>
                  <p className="text-sm text-gray-500">Enable email marketing features</p>
                </div>
                <Switch
                  id="emailMarketing"
                  checked={integrationSettings.emailMarketing}
                  onCheckedChange={(checked) => setIntegrationSettings(prev => ({ ...prev, emailMarketing: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="analytics">Analytics</Label>
                  <p className="text-sm text-gray-500">Track and analyze performance</p>
                </div>
                <Switch
                  id="analytics"
                  checked={integrationSettings.analytics}
                  onCheckedChange={(checked) => setIntegrationSettings(prev => ({ ...prev, analytics: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="socialMedia">Social Media</Label>
                  <p className="text-sm text-gray-500">Connect social media accounts</p>
                </div>
                <Switch
                  id="socialMedia"
                  checked={integrationSettings.socialMedia}
                  onCheckedChange={(checked) => setIntegrationSettings(prev => ({ ...prev, socialMedia: checked }))}
                />
              </div>

              <Button onClick={handleSaveIntegrationSettings} className="w-full">
                Save Integration Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">Add an extra layer of security</p>
                </div>
                <Switch
                  id="twoFactor"
                  checked={securitySettings.twoFactorAuth}
                  onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, twoFactorAuth: checked }))}
                />
              </div>

              <div>
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Select value={securitySettings.sessionTimeout} onValueChange={(value) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="480">8 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="ipRestriction">IP Restriction</Label>
                  <p className="text-sm text-gray-500">Restrict access to specific IP addresses</p>
                </div>
                <Switch
                  id="ipRestriction"
                  checked={securitySettings.ipRestriction}
                  onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, ipRestriction: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auditLogs">Audit Logs</Label>
                  <p className="text-sm text-gray-500">Keep logs of user activities</p>
                </div>
                <Switch
                  id="auditLogs"
                  checked={securitySettings.auditLogs}
                  onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, auditLogs: checked }))}
                />
              </div>

              <Button onClick={handleSaveSecuritySettings} className="w-full">
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="managers">
          <ManagerManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};
