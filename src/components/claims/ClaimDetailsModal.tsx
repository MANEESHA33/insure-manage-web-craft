
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface ClaimDetailsModalProps {
  claim: {
    id: string;
    clientName: string;
    policyNumber: string;
    date: string;
    amount: number;
    status: string;
    description: string;
    documents: string[];
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ClaimDetailsModal: React.FC<ClaimDetailsModalProps> = ({
  claim,
  open,
  onOpenChange,
}) => {
  if (!claim) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Claim Details - {claim.id}</DialogTitle>
          <DialogDescription>
            Complete information about this claim
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">
              Client Information
            </h4>
            <p>
              <strong>Name:</strong> {claim.clientName}
            </p>
            <p>
              <strong>Policy:</strong> {claim.policyNumber}
            </p>
            <p>
              <strong>Date Filed:</strong>{" "}
              {new Date(claim.date).toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">
              Claim Information
            </h4>
            <p>
              <strong>Amount:</strong> ${claim.amount.toFixed(2)}
            </p>
            <p>
              <strong>Status:</strong> {claim.status}
            </p>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">
              Description
            </h4>
            <p>{claim.description}</p>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">
              Documents
            </h4>
            <div className="flex flex-wrap gap-2">
              {claim.documents.map((doc, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  className="flex gap-2"
                >
                  <FileText className="h-4 w-4" />
                  {doc}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <Button variant="outline">Download Claim Details</Button>
          {claim.status === "Pending" || claim.status === "In Review" ? (
            <div className="flex gap-2">
              <Button variant="destructive">Reject</Button>
              <Button variant="default">Approve</Button>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClaimDetailsModal;
