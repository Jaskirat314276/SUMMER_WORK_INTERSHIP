// src/types/campaignTypes.ts

export interface Campaign {
  id: string;
  tenantId: string;
  templateId: string;
  scheduledAt: string | null;
  createdAt: string;
  // plus any included template/logs fields you want to surface
}

export interface CreateCampaignPayload {
  tenantId: string;
  templateId: string;
  scheduledAt?: string;  // ISO timestamp
}

export interface UpdateCampaignPayload {
  scheduledAt?: string;
  // any other updatable fields
}
