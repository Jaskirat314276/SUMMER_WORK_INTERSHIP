import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Download, Calendar, Crown, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { PlanComparisonScreen } from "./PlanComparisonScreen";
import { pricingConfig } from "@/config/pricingConfig";
import { UsageDialog } from "./UsageDialog";

const invoices = [
  { id: 'INV-001', date: '2024-01-01', amount: '$29.00', status: 'paid' },
  { id: 'INV-002', date: '2023-12-01', amount: '$29.00', status: 'paid' },
];

export const BillingScreen = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [usageDialogOpen, setUsageDialogOpen] = React.useState(false);
  const [customerPortalLoading, setCustomerPortalLoading] = React.useState(false);

  // Helper to convert usage limits to number, treating string ("Unlimited") as Number.MAX_SAFE_INTEGER
  const toNumber = (val: string | number | undefined) => {
    if (typeof val === "number") return val;
    if (typeof val === "string") {
      // treat "Unlimited" or similar strings as Number.MAX_SAFE_INTEGER
      if (val.toLowerCase().includes("unlimit")) return Number.MAX_SAFE_INTEGER;
      const parsed = parseInt(val, 10);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  // Mock usage data
  // In a real app, fetch this from API/backend
  const currentPlanDetails = React.useMemo(() => {
    if (!user) return null;
    const plans = pricingConfig[user.region];
    return plans.find((plan: any) => plan.name.toLowerCase() === user.plan);
  }, [user]);

  // For display in badges, if a value is "Unlimited" as string, show that
  const badgeLabel = (limit: string | number | undefined, used: number) => {
    if (typeof limit === "string" && limit.toLowerCase().includes("unlimit")) {
      return `${used}/Unlimited`;
    }
    return `${used}/${limit}`;
  };

  const usage = React.useMemo(() => ({
    jobsThisMonth: 12,
    jobsLimit: toNumber(currentPlanDetails?.jobsPerDay),
    classesThisMonth: 120,
    classesLimit: toNumber(currentPlanDetails?.classificationsPerMonth),
    seatsUsed: 1,
    seatsTotal: toNumber(currentPlanDetails?.seats),
  }), [currentPlanDetails]);

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Download Started",
      description: `Downloading invoice ${invoiceId}...`,
    });
  };

  // 1. View Usage: open dialog
  const handleViewUsage = () => setUsageDialogOpen(true);

  // 2. Update Payment Method: open Stripe customer portal
  const handleUpdatePaymentMethod = async () => {
    if (customerPortalLoading) return;
    try {
      setCustomerPortalLoading(true);
      // Requires Supabase connectivity and edge function `customer-portal`
      const response = await fetch('/functions/v1/customer-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // You would add the Authorization header with Bearer token here if using Supabase
        },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      if (data.url) {
        window.open(data.url, '_blank');
      } else {
        toast({
          title: "Error",
          description: data.error || "Couldn't open payment portal.",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.message || "Couldn't open payment portal.",
        variant: "destructive",
      });
    } finally {
      setCustomerPortalLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-gray-900">Billing & Subscription</h1>
        <p className="text-gray-600">Manage your subscription, usage, and billing info</p>
      </div>
      {/* Plan Summary */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            {user?.plan === "pro" ? <Crown className="h-5 w-5 text-yellow-500" /> : null}
            <CardTitle className="text-lg">
              {currentPlanDetails?.name ?? user?.plan?.toUpperCase()} Plan
            </CardTitle>
            <Badge variant="outline" className="capitalize ml-2">
              {user?.plan}
            </Badge>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-gray-900 font-bold text-2xl">{currentPlanDetails?.price}</span>
            <span className="text-xs text-gray-500">per month</span>
          </div>
        </CardHeader>
        <CardContent className="py-2 space-y-1">
          <p className="text-gray-500 text-sm mb-2">
            {currentPlanDetails ? <>
              <span>
                Includes <b>{typeof currentPlanDetails.seats === "string" && currentPlanDetails.seats.toLowerCase().includes("unlimit") ? "Unlimited" : currentPlanDetails.seats}</b> seat{currentPlanDetails.seats !== 1 ? "s" : ""}, 
                <b> {typeof currentPlanDetails.jobsPerDay === "string" && currentPlanDetails.jobsPerDay.toLowerCase().includes("unlimit") ? "Unlimited" : currentPlanDetails.jobsPerDay}</b> jobs/day, 
                <b> {typeof currentPlanDetails.classificationsPerMonth === "string" && currentPlanDetails.classificationsPerMonth.toLowerCase().includes("unlimit") ? "Unlimited" : currentPlanDetails.classificationsPerMonth}</b> classifications/month.
              </span>
            </> : null }
          </p>
          <ul className="text-gray-700 text-sm grid grid-cols-1 sm:grid-cols-2 gap-x-8 mb-2">
            {currentPlanDetails?.keyFeatures?.map((feature: string, idx: number) => (
              <li key={feature + idx}>
                <Check className="inline-block w-4 h-4 text-green-500 mr-1" />
                {feature}
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-600 my-2">
            Overage: <b>{currentPlanDetails?.overage.job}/job</b>, <b>{currentPlanDetails?.overage.classification}/classification</b>
          </p>
          <div className="flex gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleUpdatePaymentMethod}
              disabled={customerPortalLoading}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              {customerPortalLoading ? "Loading..." : "Update Payment Method"}
            </Button>
            <Button variant="default" size="sm" onClick={handleViewUsage}>
              View Usage
            </Button>
          </div>
        </CardContent>
      </Card>
      <UsageDialog
        open={usageDialogOpen}
        onOpenChange={setUsageDialogOpen}
        usage={usage}
      />
      {/* Plan Comparison Only for upgrade/downgrade */}
      <div>
        <PlanComparisonScreen />
      </div>
      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{invoice.id}</p>
                    <p className="text-sm text-gray-600">{new Date(invoice.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold">{invoice.amount}</span>
                  <Badge variant={invoice.status === 'paid' ? 'default' : 'secondary'}>
                    {invoice.status}
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownloadInvoice(invoice.id)}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
