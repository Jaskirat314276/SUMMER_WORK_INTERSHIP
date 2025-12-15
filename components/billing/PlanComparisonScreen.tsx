
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { pricingConfig, Region } from "@/config/pricingConfig";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown } from "lucide-react";

export function PlanComparisonScreen() {
  const { user, upgradePlan } = useAuth();

  const region: Region = user?.region || "IN";
  const currentPlan = user?.plan || "free";

  const plans = pricingConfig[region];

  // For highlighting the current or recommended plan
  const getPlanHighlight = (plan: string) =>
    plan.toLowerCase() === currentPlan ? "ring-2 ring-blue-500" : "";

  // Plan upgrade logic
  const handleUpgrade = (plan: string) => {
    upgradePlan(plan.toLowerCase() as any);
  };

  return (
    <div className="bg-white border rounded-lg py-8 px-4 shadow-md max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Subscription Plan</h2>
        <p className="text-gray-600 mb-4">
          Choose the plan that fits your volume. See overage charges for scaling.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={
              `relative bg-white border px-6 py-8 rounded-lg shadow-sm flex flex-col items-center ${getPlanHighlight(plan.name)}`
            }
          >
            {plan.name.toLowerCase() === currentPlan && (
              <Badge className="absolute top-3 right-3 bg-blue-500 text-white text-xs">
                Current Plan
              </Badge>
            )}
            <h3 className="text-xl font-bold mb-2 flex items-center">
              {plan.name === "Pro" && <Crown className="mr-1 h-5 w-5 text-yellow-500" />}
              {plan.name}
            </h3>
            <div className="text-3xl font-bold mb-2">{plan.price}
              <span className="ml-1 text-sm text-gray-500 font-normal">/mo</span>
            </div>
            <div className="text-gray-500 text-sm mb-4">{plan.seats} seat{plan.seats !== 1 ? "s" : ""} included</div>
            <ul className="text-gray-700 text-sm space-y-2 mb-5 w-full">
              <li>
                <Check className="inline-block w-4 h-4 text-green-500 mr-1" />
                <b>Jobs (scrapes)/day:</b> {plan.jobsPerDay}
              </li>
              <li>
                <Check className="inline-block w-4 h-4 text-green-500 mr-1" />
                <b>Classifications/month:</b> {plan.classificationsPerMonth}
              </li>
              {plan.keyFeatures.map((feature, i) => (
                <li key={feature + i}>
                  <Check className="inline-block w-4 h-4 text-green-500 mr-1" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="text-xs text-gray-600 mb-4">
              <span>Overage: </span>
              <span>
                {plan.overage.job}/job, {plan.overage.classification}/classification
              </span>
            </div>
            <Button
              className="w-full mt-auto"
              variant={plan.name.toLowerCase() === currentPlan ? "outline" : "default"}
              disabled={plan.name.toLowerCase() === currentPlan}
              onClick={() => handleUpgrade(plan.name)}
            >
              {plan.name.toLowerCase() === currentPlan ? "Your Plan" : `Upgrade to ${plan.name}`}
            </Button>
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-400 text-center mt-8">
        Overage charges apply if you exceed plan limits. Switching plans affects your next billing cycle.
      </div>
    </div>
  );
}
