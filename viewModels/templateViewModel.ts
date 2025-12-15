import { useState, useEffect } from "react";
import TemplateService from "../services/template/templateService";
import { EmailTemplate } from "../types/templateTypes";

export default function useTemplatesViewModel(tenantId?: string) {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string|null>(null);

  useEffect(() => {
    if (!tenantId) return;
    setLoading(true);
    TemplateService.fetchAll(tenantId)
      .then(setTemplates)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [tenantId]);

  const createTemplate = async (data: Omit<EmailTemplate, "id"|"createdAt">) => {
    setLoading(true); setError(null);
    try {
      const tpl = await TemplateService.create(data);
      setTemplates(t => [tpl, ...t]);
      return tpl;
    } catch (e: any) {
      setError(e.response?.data?.message || e.message);
      return null;
    } finally { setLoading(false); }
  };

  return { templates, loading, error, createTemplate };
}
