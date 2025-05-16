
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import NewClaimForm from "./NewClaimForm";
import { toast } from "@/hooks/use-toast";

interface NewClaimModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewClaimModal: React.FC<NewClaimModalProps> = ({ open, onOpenChange }) => {
  const handleSubmit = async (data) => {
    try {
      // In a real app, this would be an API call
      console.log("Submitting claim data:", data);
      
      // Simulate a delay for API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      toast({
        title: "Claim submitted successfully",
        description: `Claim for ${data.clientName} has been submitted for review.`,
      });
      
      // Close the modal
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error submitting claim",
        description: "There was a problem submitting your claim. Please try again.",
        variant: "destructive",
      });
      console.error("Error submitting claim:", error);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Submit New Claim</DialogTitle>
          <DialogDescription>
            Fill out the form below to submit a new insurance claim
          </DialogDescription>
        </DialogHeader>
        
        <NewClaimForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </DialogContent>
    </Dialog>
  );
};

export default NewClaimModal;
