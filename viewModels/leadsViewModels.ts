
import { Lead, CreateLeadPayload, UpdateLeadPayload } from '@/types/leadTypes';
import LeadService from '@/services/leads/leadsServices';

export class LeadsViewModel {
  private leads: Lead[] = [];
  private loading = false;
  private error: string | null = null;

  constructor() {
    this.fetchLeads();
  }

  async fetchLeads(): Promise<void> {
    this.loading = true;
    this.error = null;
    
    try {
      const response = await LeadService.getTenantLeads('default-tenant-id');
      this.leads = response;
    } catch (error: any) {
      this.error = error.message || 'Failed to fetch leads';
      console.error('Error fetching leads:', error);
    } finally {
      this.loading = false;
    }
  }

  async createLead(leadData: CreateLeadPayload): Promise<void> {
    this.loading = true;
    this.error = null;

    try {
      const response = await LeadService.createLead(leadData);
      this.leads.push(response);
    } catch (error: any) {
      this.error = error.message || 'Failed to create lead';
      console.error('Error creating lead:', error);
      throw error;
    } finally {
      this.loading = false;
    }
  }

  async updateLead(leadId: string, updates: Partial<UpdateLeadPayload>): Promise<void> {
    this.loading = true;
    this.error = null;

    try {
      const response = await LeadService.updateLead(leadId, updates);
      const index = this.leads.findIndex(lead => lead.id === leadId);
      if (index !== -1) {
        this.leads[index] = response;
      }
    } catch (error: any) {
      this.error = error.message || 'Failed to update lead';
      console.error('Error updating lead:', error);
      throw error;
    } finally {
      this.loading = false;
    }
  }

  async updateLeadStatus(leadId: string, status: "NOT_INTERESTED" | "FOLLOW_UP" | "INTERESTED" | "IMMEDIATE_ACTION"): Promise<void> {
    this.loading = true;
    this.error = null;

    try {
      const response = await LeadService.updateLeadStatus(leadId, { status });
      const index = this.leads.findIndex(lead => lead.id === leadId);
      if (index !== -1) {
        this.leads[index] = response;
      }
    } catch (error: any) {
      this.error = error.message || 'Failed to update lead status';
      console.error('Error updating lead status:', error);
      throw error;
    } finally {
      this.loading = false;
    }
  }

  async deleteLead(leadId: string): Promise<void> {
    this.loading = true;
    this.error = null;

    try {
      await LeadService.deleteLead(leadId, 'default-tenant-id');
      this.leads = this.leads.filter(lead => lead.id !== leadId);
    } catch (error: any) {
      this.error = error.message || 'Failed to delete lead';
      console.error('Error deleting lead:', error);
      throw error;
    } finally {
      this.loading = false;
    }
  }

  async remove(leadId: string, tenantId: string): Promise<boolean> {
    this.loading = true;
    this.error = null;

    try {
      await LeadService.deleteLead(leadId, tenantId);
      this.leads = this.leads.filter(lead => lead.id !== leadId);
      return true;
    } catch (error: any) {
      this.error = error.message || 'Failed to delete lead';
      console.error('Error deleting lead:', error);
      return false;
    } finally {
      this.loading = false;
    }
  }

  async bulkDelete(leadIds: string[], tenantId: string): Promise<boolean> {
    this.loading = true;
    this.error = null;

    try {
      await LeadService.bulkDeleteLeads(tenantId, leadIds);
      this.leads = this.leads.filter(lead => !leadIds.includes(lead.id || ''));
      return true;
    } catch (error: any) {
      this.error = error.message || 'Failed to bulk delete leads';
      console.error('Error bulk deleting leads:', error);
      return false;
    } finally {
      this.loading = false;
    }
  }

  async bulkUpdateStatus(leadIds: string[], status: string, tenantId: string): Promise<boolean> {
    this.loading = true;
    this.error = null;

    try {
      await LeadService.bulkUpdateLeadStatus(tenantId, leadIds, status);
      this.leads = this.leads.map(lead => 
        leadIds.includes(lead.id || '') ? { ...lead, status } : lead
      );
      return true;
    } catch (error: any) {
      this.error = error.message || 'Failed to bulk update lead status';
      console.error('Error bulk updating lead status:', error);
      return false;
    } finally {
      this.loading = false;
    }
  }

  getLeads(): Lead[] {
    return this.leads;
  }

  getLeadById(id: string): Lead | undefined {
    return this.leads.find(lead => lead.id === id);
  }

  getLeadsByStatus(status: string): Lead[] {
    return this.leads.filter(lead => lead.status === status);
  }

  isLoading(): boolean {
    return this.loading;
  }

  getError(): string | null {
    return this.error;
  }

  clearError(): void {
    this.error = null;
  }

  async fetchDashboardLeads(tenantId: string): Promise<any> {
    this.loading = true;
    this.error = null;
    
    try {
      const response = await LeadService.getDashboardLeads(tenantId);
      return response;
    } catch (error: any) {
      this.error = error.message || 'Failed to fetch dashboard leads';
      console.error('Error fetching dashboard leads:', error);
      throw error;
    } finally {
      this.loading = false;
    }
  }
}

export const leadsViewModel = new LeadsViewModel();

// Create a hook for easy React integration
export const useDashboardViewModel = () => {
  return {
    loading: leadsViewModel.isLoading(),
    error: leadsViewModel.getError(),
    fetchDashboardLeads: leadsViewModel.fetchDashboardLeads.bind(leadsViewModel),
    remove: leadsViewModel.remove.bind(leadsViewModel),
    bulkDelete: leadsViewModel.bulkDelete.bind(leadsViewModel),
    bulkUpdateStatus: leadsViewModel.bulkUpdateStatus.bind(leadsViewModel),
  };
};

export default useDashboardViewModel;
