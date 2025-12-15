
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon, Clock, Plus, Edit, Trash2, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockEvents = [
  {
    id: 1,
    title: 'Team Meeting',
    description: 'Weekly team sync and project updates',
    date: new Date(2024, 11, 15),
    time: '10:00 AM',
    type: 'meeting',
    participants: ['John Doe', 'Jane Smith', 'Mike Johnson']
  },
  {
    id: 2,
    title: 'Campaign Launch',
    description: 'Launch Q4 email campaign',
    date: new Date(2024, 11, 16),
    time: '2:00 PM',
    type: 'campaign',
    participants: ['Marketing Team']
  },
  {
    id: 3,
    title: 'Lead Follow-up',
    description: 'Follow up with potential clients from last week',
    date: new Date(2024, 11, 18),
    time: '9:00 AM',
    type: 'followup',
    participants: ['Sales Team']
  }
];

export const ScheduleTab = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState(mockEvents);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: new Date(),
    time: '',
    type: 'meeting',
    participants: ''
  });
  const { toast } = useToast();

  const filteredEvents = selectedDate 
    ? events.filter(event => 
        event.date.toDateString() === selectedDate.toDateString()
      )
    : events;

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.time) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    const event = {
      id: Date.now(),
      ...newEvent,
      date: selectedDate || new Date(),
      participants: newEvent.participants.split(',').map(p => p.trim()).filter(p => p)
    };

    setEvents(prev => [...prev, event]);
    setNewEvent({
      title: '',
      description: '',
      date: new Date(),
      time: '',
      type: 'meeting',
      participants: ''
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Event created successfully!",
      duration: 2000,
    });
  };

  const handleEditEvent = (event: any) => {
    setEditingEvent(event);
    setNewEvent({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      type: event.type,
      participants: event.participants.join(', ')
    });
    setIsDialogOpen(true);
  };

  const handleUpdateEvent = () => {
    if (!editingEvent) return;

    setEvents(prev => prev.map(event => 
      event.id === editingEvent.id 
        ? {
            ...event,
            ...newEvent,
            participants: newEvent.participants.split(',').map(p => p.trim()).filter(p => p)
          }
        : event
    ));

    setEditingEvent(null);
    setNewEvent({
      title: '',
      description: '',
      date: new Date(),
      time: '',
      type: 'meeting',
      participants: ''
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Event updated successfully!",
      duration: 2000,
    });
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(prev => prev.filter(event => event.id !== id));
    toast({
      title: "Event deleted",
      duration: 2000,
    });
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'campaign': return 'bg-green-100 text-green-800';
      case 'followup': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const resetDialog = () => {
    setEditingEvent(null);
    setNewEvent({
      title: '',
      description: '',
      date: new Date(),
      time: '',
      type: 'meeting',
      participants: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Schedule</h2>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetDialog();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingEvent ? 'Edit Event' : 'Create New Event'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Event title"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Event description"
                />
              </div>

              <div>
                <Label htmlFor="time">Time *</Label>
                <Input
                  id="time"
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="type">Type</Label>
                <Select value={newEvent.type} onValueChange={(value) => setNewEvent(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="campaign">Campaign</SelectItem>
                    <SelectItem value="followup">Follow-up</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="participants">Participants</Label>
                <Input
                  id="participants"
                  value={newEvent.participants}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, participants: e.target.value }))}
                  placeholder="Enter names separated by commas"
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={editingEvent ? handleUpdateEvent : handleCreateEvent}
                  className="flex-1"
                >
                  {editingEvent ? 'Update Event' : 'Create Event'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetDialog();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Events for {selectedDate?.toLocaleDateString() || 'Selected Date'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredEvents.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No events scheduled for this date</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredEvents.map((event) => (
                    <div key={event.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{event.title}</h3>
                          <Badge className={getEventTypeColor(event.type)}>
                            {event.type}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditEvent(event)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {event.time}
                        </span>
                        {event.participants.length > 0 && (
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {event.participants.join(', ')}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
