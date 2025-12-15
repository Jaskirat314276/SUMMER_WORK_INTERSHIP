
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface UsageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  usage: {
    jobsThisMonth: number;
    jobsLimit: number;
    classesThisMonth: number;
    classesLimit: number;
    seatsUsed: number;
    seatsTotal: number;
  };
}

export const UsageDialog: React.FC<UsageDialogProps> = ({
  open,
  onOpenChange,
  usage,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Your Current Usage</DialogTitle>
          <DialogDescription>
            Track your resource usage this billing period. Overage will be charged as per plan.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <div className="flex items-center justify-between">
              <span>Jobs this month</span>
              <Badge>
                {usage.jobsThisMonth}/{usage.jobsLimit}
              </Badge>
            </div>
            <Progress value={Math.min(100, (usage.jobsThisMonth / usage.jobsLimit) * 100)} className="h-2 mt-2" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <span>Classifications this month</span>
              <Badge>
                {usage.classesThisMonth}/{usage.classesLimit}
              </Badge>
            </div>
            <Progress value={Math.min(100, (usage.classesThisMonth / usage.classesLimit) * 100)} className="h-2 mt-2" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <span>Seats used</span>
              <Badge>
                {usage.seatsUsed}/{usage.seatsTotal}
              </Badge>
            </div>
            <Progress value={Math.min(100, (usage.seatsUsed / usage.seatsTotal) * 100)} className="h-2 mt-2" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

