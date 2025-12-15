// Base URL for the API
export const API_BASE_URL = 'https://ai-sales-api-poc-production.up.railway.app'; // Use '/api' for proxying

// Authentication-related endpoints
export const ApiEndpoints = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/tenants/create',
    COMPLETE_ADDITIONAL_SIGNUP: (tenantId: string) => `/tenant/${tenantId}/additional-setup`,
  },
  LEAD: {
    CREATE: `${API_BASE_URL}/leads`,
    GET_ALL_FOR_TENANT: (tenantId: string) =>
      `${API_BASE_URL}/leads/tenant/${tenantId}`,
    GET_BY_ID: (leadId: string) => 
      `${API_BASE_URL}/leads/lead/${leadId}`,
    UPDATE: (leadId: string) =>
      `${API_BASE_URL}/leads/${leadId}`, 
    DELETE: (leadId: string) =>
      `${API_BASE_URL}/leads/${leadId}`,
    UPDATE_STATUS: (leadId: string) =>
      `${API_BASE_URL}/leads/${leadId}/status`,
    DASHBOARD: `${API_BASE_URL}/leads/dashboard/leads`,
    BULK_DELETE: `${API_BASE_URL}/leads/leads/bulk-delete`,
    BULK_STATUS: `${API_BASE_URL}/leads/leads/bulk-status`,
  },
  CAMPAIGN: {
    CREATE: `${API_BASE_URL}/campaigns/create`,                 // POST
    GET_ALL_FOR_TENANT: (tenantId: string) =>
      `${API_BASE_URL}/campaigns/tenant/${tenantId}`,           // GET
    GET_BY_ID: (campaignId: string) =>
      `${API_BASE_URL}/campaigns/get/${campaignId}`,            // GET
    UPDATE: (campaignId: string) =>
      `${API_BASE_URL}/campaigns/update/${campaignId}`,         // PUT
    DELETE: (campaignId: string) =>
      `${API_BASE_URL}/campaigns/delete/${campaignId}`,         // DELETE
  },
  TEMPLATE: {
    GET_ALL:(tenantId: string) =>
      `${API_BASE_URL}/templates/tenant/${tenantId}`,
    CREATE: `${API_BASE_URL}/templates/create`,
  }
};

export default ApiEndpoints;