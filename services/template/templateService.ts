import ApiClient from "../api/apiClient";
import Endpoints from "../../constants/Endpoints";
import { EmailTemplate } from "../../types/templateTypes";

export const TemplateService = {
  fetchAll: async (tenantId: string): Promise<EmailTemplate[]> => {
    const resp = await ApiClient.get(Endpoints.TEMPLATE.GET_ALL(tenantId));
    return resp.data;
  },
  create: async (payload: {
    tenantId: string;
    name: string;
    subject: string;
    body: string;
    from: string;
    to: string;
    variable?: { key: string; defaultValue?: string }[];
  }): Promise<EmailTemplate> => {
    const resp = await ApiClient.post(Endpoints.TEMPLATE.CREATE, payload);
    return resp.data;
  },
};
export default TemplateService;
