
// src/services/lead/LeadService.ts
import ApiClient from "../api/apiClient";
import ApiEndpoints from "../../constants/Endpoints";
import {
    Lead,
    CreateLeadPayload,
    UpdateLeadPayload,
    UpdateStatusPayload,
    DashboardLeadsResponse,
} from "../../types/leadTypes";

export const leadsService = {
    createLead: async (payload: CreateLeadPayload): Promise<Lead> => {
        const resp = await ApiClient.post(ApiEndpoints.LEAD.CREATE, payload);
        return resp.data;
    },

    getTenantLeads: async (tenantId: string): Promise<Lead[]> => {
        const resp = await ApiClient.get(ApiEndpoints.LEAD.GET_ALL_FOR_TENANT(tenantId));
        return resp.data;
    },

    getLeadById: async (leadId: string, tenantId: string): Promise<Lead> => {
        const resp = await ApiClient.get(ApiEndpoints.LEAD.GET_BY_ID(leadId));
        return resp.data;
    },

    updateLead: async (leadId: string, payload: UpdateLeadPayload): Promise<Lead> => {
        const resp = await ApiClient.put(ApiEndpoints.LEAD.UPDATE(leadId), payload);
        return resp.data;
    },

    deleteLead: async (leadId: string, tenantId: string): Promise<void> => {
        await ApiClient.delete(ApiEndpoints.LEAD.DELETE(leadId));
    },

    updateLeadStatus: async (
        leadId: string,
        payload: UpdateStatusPayload
    ): Promise<Lead> => {
        const resp = await ApiClient.patch(
            ApiEndpoints.LEAD.UPDATE_STATUS(leadId),
            payload
        );
        return resp.data;
    },
    getDashboardLeads: async (tenantId: string): Promise<DashboardLeadsResponse> => {
        // note: your controller expects tenantId in the body or query; here we'll send as body
        const resp = await ApiClient.get(ApiEndpoints.LEAD.DASHBOARD, {
            params: { tenantId },
        });
        return resp.data;
    },

    bulkDeleteLeads: async (
        tenantId: string,
        leadIds: string[]
    ): Promise<{ message: string; count: number }> => {
        const resp = await ApiClient.post(
            ApiEndpoints.LEAD.BULK_DELETE,      // e.g. "/leads/leads/bulk-delete"
            { tenantId, leadIds }
        );
        return resp.data;
    },

    /** Bulk update status */
    bulkUpdateLeadStatus: async (
        tenantId: string,
        leadIds: string[],
        status: string
    ): Promise<{ message: string; count: number }> => {
        const resp = await ApiClient.patch(
            ApiEndpoints.LEAD.BULK_STATUS,      // e.g. "/leads/leads/bulk-status"
            { tenantId, leadIds, status }
        );
        return resp.data;
    },
};

export const LeadService = leadsService;
export default LeadService;
