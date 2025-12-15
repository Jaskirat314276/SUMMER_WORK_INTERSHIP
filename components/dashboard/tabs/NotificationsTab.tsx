
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Search, Filter, Check, X, Clock, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockNotifications = [
  {
    id: 1,
    title: 'New Lead Generated',
    message: 'John Smith from Tech Corp has shown interest in your product',
    type: 'lead',
    status: 'unread',
    timestamp: '2 minutes ago',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Campaign Performance Alert',
    message: 'Your "Q4 Outreach" campaign has reached 80% completion',
    type: 'campaign',
    status: 'read',
    timestamp: '15 minutes ago',
    priority: 'medium'
  },
  {
    id: 3,
    title: 'Email Bounce Notification',
    message: '3 emails bounced in your latest campaign',
    type: 'email',
    status: 'unread',
    timestamp: '1 hour ago',
    priority: 'low'
  },
  {
    id: 4,
    title: 'Weekly Report Ready',
    message: 'Your weekly analytics report is now available',
    type: 'report',
    status: 'read',
    timestamp: '2 hours ago',
    priority: 'medium'
  }
];

export const NotificationsTab = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [leadNotifications, setLeadNotifications] = useState(true);
  const [campaignNotifications, setCampaignNotifications] = useState(true);
  const { toast } = useToast();

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || notification.status === filterType;
    return matchesSearch && matchesFilter;
  });

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, status: 'read' } : notif
    ));
    toast({
      title: "Notification marked as read",
      duration: 2000,
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, status: 'read' })));
    toast({
      title: "All notifications marked as read",
      duration: 2000,
    });
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast({
      title: "Notification deleted",
      duration: 2000,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lead': return <AlertCircle className="h-4 w-4" />;
      case 'campaign': return <Bell className="h-4 w-4" />;
      case 'email': return <Clock className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Notifications</h2>
        <Button onClick={markAllAsRead} variant="outline">
          <Check className="h-4 w-4 mr-2" />
          Mark all as read
        </Button>
      </div>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>

          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <Card key={notification.id} className={`${notification.status === 'unread' ? 'border-l-4 border-l-blue-500' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="mt-1">
                        {getTypeIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-sm">{notification.title}</h3>
                          <Badge className={getPriorityColor(notification.priority)}>
                            {notification.priority}
                          </Badge>
                          {notification.status === 'unread' && (
                            <Badge variant="secondary">New</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                        <p className="text-xs text-gray-400">{notification.timestamp}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {notification.status === 'unread' && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications" className="text-sm font-medium">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-gray-500">Receive notifications via email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications" className="text-sm font-medium">
                    Push Notifications
                  </Label>
                  <p className="text-sm text-gray-500">Receive browser push notifications</p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="lead-notifications" className="text-sm font-medium">
                    New Lead Alerts
                  </Label>
                  <p className="text-sm text-gray-500">Get notified when new leads are generated</p>
                </div>
                <Switch
                  id="lead-notifications"
                  checked={leadNotifications}
                  onCheckedChange={setLeadNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="campaign-notifications" className="text-sm font-medium">
                    Campaign Updates
                  </Label>
                  <p className="text-sm text-gray-500">Receive updates about campaign performance</p>
                </div>
                <Switch
                  id="campaign-notifications"
                  checked={campaignNotifications}
                  onCheckedChange={setCampaignNotifications}
                />
              </div>

              <Button 
                onClick={() => toast({ title: "Notification settings saved!", duration: 2000 })}
                className="w-full"
              >
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
