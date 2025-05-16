
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, FileText, Eye } from "lucide-react";

interface Claim {
  id: string;
  clientName: string;
  policyNumber: string;
  date: string;
  amount: number;
  status: string;
  description: string;
  documents: string[];
}

interface ClaimsTableProps {
  claims: Claim[];
  onViewClaim: (claim: Claim) => void;
}

const ClaimsTable: React.FC<ClaimsTableProps> = ({ claims, onViewClaim }) => {
  // Function to get status badge with appropriate color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return <Badge className="bg-green-500">{status}</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-500">{status}</Badge>;
      case "Rejected":
        return <Badge className="bg-red-500">{status}</Badge>;
      case "In Review":
        return <Badge className="bg-blue-500">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "Pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "Rejected":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "In Review":
        return <FileText className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Claim ID</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Policy Number</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {claims.map((claim) => (
            <TableRow key={claim.id}>
              <TableCell className="font-medium">{claim.id}</TableCell>
              <TableCell>{claim.clientName}</TableCell>
              <TableCell>{claim.policyNumber}</TableCell>
              <TableCell>{new Date(claim.date).toLocaleDateString()}</TableCell>
              <TableCell>${claim.amount.toFixed(2)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getStatusIcon(claim.status)}
                  {getStatusBadge(claim.status)}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onViewClaim(claim)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {claims.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No claims found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ClaimsTable;
