// src/services/campaign/CampaignService.ts
import ApiClient from "../api/apiClient";
import Endpoints from "../../constants/Endpoints";
import {
  Campaign,
  CreateCampaignPayload,
  UpdateCampaignPayload,
} from "../../types/campaignTypes";

export const CampaignService = {
  createCampaign: async (payload: CreateCampaignPayload): Promise<Campaign> => {
    const resp = await ApiClient.post(
      Endpoints.CAMPAIGN.CREATE,
      payload
    );
    return resp.data;
  },

  getCampaigns: async (tenantId: string): Promise<Campaign[]> => {
    const resp = await ApiClient.get(
      Endpoints.CAMPAIGN.GET_ALL_FOR_TENANT(tenantId)
    );
    return resp.data;
  },

  getCampaignById: async (
    campaignId: string,
    tenantId: string
  ): Promise<Campaign> => {
    // backend reads tenantId from body
    const resp = await ApiClient.request({
      url: Endpoints.CAMPAIGN.GET_BY_ID(campaignId),
      method: "GET",
      headers: { "Content-Type": "application/json" },
      data: { tenantId },
    });
    return resp.data;
  },

  updateCampaign: async (
    campaignId: string,
    payload: UpdateCampaignPayload & { tenantId: string }
  ): Promise<Campaign> => {
    const resp = await ApiClient.put(
      Endpoints.CAMPAIGN.UPDATE(campaignId),
      payload
    );
    return resp.data;
  },

  deleteCampaign: async (
    campaignId: string,
    tenantId: string
  ): Promise<void> => {
    await ApiClient.request({
      url: Endpoints.CAMPAIGN.DELETE(campaignId),
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      data: { tenantId },
    });
  },
};

export default CampaignService;
