/* eslint-disable @typescript-eslint/no-explicit-any */
// src/viewModels/campaign/useCampaignsViewModel.ts
import { useState } from "react";
import CampaignService from "../services/campaigns/campaignService";
import {
  Campaign,
  CreateCampaignPayload,
  UpdateCampaignPayload,
} from "../types/campaignTypes";

export default function useCampaignsViewModel() {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const fetchAll = async (tenantId: string): Promise<Campaign[] | null> => {
    setLoading(true);
    setError(null);
    try {
      return await CampaignService.getCampaigns(tenantId);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchById = async (
    campaignId: string,
    tenantId: string
  ): Promise<Campaign | null> => {
    setLoading(true);
    setError(null);
    try {
      return await CampaignService.getCampaignById(campaignId, tenantId);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const create = async (
    payload: CreateCampaignPayload
  ): Promise<Campaign | null> => {
    setLoading(true);
    setError(null);
    try {
      return await CampaignService.createCampaign(payload);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const update = async (
    campaignId: string,
    payload: UpdateCampaignPayload & { tenantId: string }
  ): Promise<Campaign | null> => {
    setLoading(true);
    setError(null);
    try {
      return await CampaignService.updateCampaign(campaignId, payload);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (
    campaignId: string,
    tenantId: string
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await CampaignService.deleteCampaign(campaignId, tenantId);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    fetchAll,
    fetchById,
    create,
    update,
    remove,
  };
}
