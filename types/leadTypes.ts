
// src/viewModels/lead/types.ts

export interface Lead {
  id?: string;
  companyName: string;
  contactEmail: string;
  contactName: string;
  contactPhone?: string;
  status: "INTERESTED" | "FOLLOW_UP" | "IMMEDIATE_ACTION" | string;
}

export interface CreateLeadPayload {
  tenantId: string;
  companyName: string;
  contactEmail: string;
  contactName: string;
  contactPhone?: string;
}

export interface UpdateLeadPayload {
  companyName?: string;
  contactEmail?: string;
  contactName?: string;
  contactPhone?: string;
  metadata?: Record<string, any>;
}

export interface UpdateStatusPayload {
  status: "NOT_INTERESTED" | "FOLLOW_UP" | "INTERESTED" | "IMMEDIATE_ACTION";
}

export interface DashboardLeadsResponse {
  leads: Lead[];
  stats: {
    interested: number;
    followUp: number;
    highPriority: number;
  };
}
