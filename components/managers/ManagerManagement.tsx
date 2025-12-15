
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Mail, Phone, Plus, Edit, Trash2, Shield, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockManagers = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@company.com',
    phone: '+1 (555) 123-4567',
    role: 'Sales Manager',
    department: 'Sales',
    status: 'active',
    joinDate: '2023-01-15',
    avatar: ''
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 234-5678',
    role: 'Marketing Manager',
    department: 'Marketing',
    status: 'active',
    joinDate: '2023-03-20',
    avatar: ''
  },
  {
    id: 3,
    name: 'Mike Davis',
    email: 'mike.davis@company.com',
    phone: '+1 (555) 345-6789',
    role: 'Operations Manager',
    department: 'Operations',
    status: 'inactive',
    joinDate: '2022-11-10',
    avatar: ''
  }
];

export const ManagerManagement = () => {
  const [managers, setManagers] = useState(mockManagers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingManager, setEditingManager] = useState<any>(null);
  const [newManager, setNewManager] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    status: 'active'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const { toast } = useToast();

  const filteredManagers = managers.filter(manager => {
    const matchesSearch = manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         manager.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || manager.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const handleCreateManager = () => {
    if (!newManager.name || !newManager.email || !newManager.role || !newManager.department) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    const manager = {
      id: Date.now(),
      ...newManager,
      joinDate: new Date().toISOString().split('T')[0],
      avatar: ''
    };

    setManagers(prev => [...prev, manager]);
    resetForm();
    setIsDialogOpen(false);
    
    toast({
      title: "Manager created successfully!",
      description: `${newManager.name} has been added to the team`,
      duration: 3000,
    });
  };

  const handleEditManager = (manager: any) => {
    setEditingManager(manager);
    setNewManager({
      name: manager.name,
      email: manager.email,
      phone: manager.phone,
      role: manager.role,
      department: manager.department,
      status: manager.status
    });
    setIsDialogOpen(true);
  };

  const handleUpdateManager = () => {
    if (!editingManager) return;

    setManagers(prev => prev.map(manager => 
      manager.id === editingManager.id 
        ? { ...manager, ...newManager }
        : manager
    ));

    resetForm();
    setEditingManager(null);
    setIsDialogOpen(false);
    
    toast({
      title: "Manager updated successfully!",
      duration: 2000,
    });
  };

  const handleDeleteManager = (id: number) => {
    setManagers(prev => prev.filter(manager => manager.id !== id));
    toast({
      title: "Manager removed",
      duration: 2000,
    });
  };

  const resetForm = () => {
    setNewManager({
      name: '',
      email: '',
      phone: '',
      role: '',
      department: '',
      status: 'active'
    });
    setEditingManager(null);
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Manager Management</h2>
          <p className="text-gray-600">Manage your company managers and team leads</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Manager
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingManager ? 'Edit Manager' : 'Add New Manager'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={newManager.name}
                  onChange={(e) => setNewManager(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter full name"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newManager.email}
                  onChange={(e) => setNewManager(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newManager.phone}
                  onChange={(e) => setNewManager(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <Label htmlFor="role">Role *</Label>
                <Input
                  id="role"
                  value={newManager.role}
                  onChange={(e) => setNewManager(prev => ({ ...prev, role: e.target.value }))}
                  placeholder="e.g., Sales Manager"
                />
              </div>

              <div>
                <Label htmlFor="department">Department *</Label>
                <Select value={newManager.department} onValueChange={(value) => setNewManager(prev => ({ ...prev, department: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Customer Success">Customer Success</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="HR">Human Resources</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={newManager.status} onValueChange={(value) => setNewManager(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={editingManager ? handleUpdateManager : handleCreateManager}
                  className="flex-1"
                >
                  {editingManager ? 'Update Manager' : 'Add Manager'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search managers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterDepartment} onValueChange={setFilterDepartment}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="Sales">Sales</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="Operations">Operations</SelectItem>
            <SelectItem value="Customer Success">Customer Success</SelectItem>
            <SelectItem value="Finance">Finance</SelectItem>
            <SelectItem value="HR">Human Resources</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredManagers.map((manager) => (
          <Card key={manager.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={manager.avatar} />
                    <AvatarFallback>{getInitials(manager.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{manager.name}</h3>
                    <p className="text-sm text-gray-600">{manager.role}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(manager.status)}>
                  {manager.status}
                </Badge>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  {manager.email}
                </div>
                {manager.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    {manager.phone}
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  {manager.department}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4" />
                  Joined {new Date(manager.joinDate).toLocaleDateString()}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditManager(manager)}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeleteManager(manager.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredManagers.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No managers found</h3>
          <p className="text-gray-600">No managers match your current search criteria.</p>
        </div>
      )}
    </div>
  );
};
