
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, FileText, Search } from "lucide-react";
import ClaimsTable from "@/components/claims/ClaimsTable";
import ClaimDetailsModal from "@/components/claims/ClaimDetailsModal";
import NewClaimModal from "@/components/claims/NewClaimModal";

// Mock data for claims
const mockClaims = [
  {
    id: "CLM-2023-001",
    clientName: "John Smith",
    policyNumber: "POL-1234",
    date: "2023-05-10",
    amount: 1500.00,
    status: "Approved",
    description: "Car accident damage repair",
    documents: ["accident_report.pdf", "repair_estimate.pdf"]
  },
  {
    id: "CLM-2023-002",
    clientName: "Sarah Johnson",
    policyNumber: "POL-5678",
    date: "2023-05-15",
    amount: 750.00,
    status: "Pending",
    description: "Medical expenses from injury",
    documents: ["medical_report.pdf"]
  },
  {
    id: "CLM-2023-003",
    clientName: "Michael Brown",
    policyNumber: "POL-9012",
    date: "2023-05-20",
    amount: 3000.00,
    status: "Rejected",
    description: "Property damage from storm",
    documents: ["property_photos.pdf", "contractor_estimate.pdf"]
  },
  {
    id: "CLM-2023-004",
    clientName: "Emily Davis",
    policyNumber: "POL-3456",
    date: "2023-05-25",
    amount: 2000.00,
    status: "In Review",
    description: "Home theft insurance claim",
    documents: ["police_report.pdf", "item_list.pdf"]
  },
  {
    id: "CLM-2023-005",
    clientName: "David Wilson",
    policyNumber: "POL-7890",
    date: "2023-05-30",
    amount: 1200.00,
    status: "Approved",
    description: "Travel insurance claim for lost luggage",
    documents: ["airline_report.pdf"]
  }
];

const Claims = () => {
  const [claims] = useState(mockClaims);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [newClaimModalOpen, setNewClaimModalOpen] = useState(false);

  // Filter claims based on search term and status
  const filteredClaims = claims.filter((claim) => {
    const matchesSearch = 
      claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.policyNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || claim.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewClaim = (claim) => {
    setSelectedClaim(claim);
    setDetailsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Claims Management</h1>
        <Button className="flex gap-2" onClick={() => setNewClaimModalOpen(true)}>
          <FileText className="h-4 w-4" />
          New Claim
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Claims Overview</CardTitle>
          <CardDescription>
            View, filter, and manage all insurance claims
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search claims by ID, client or policy..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Review">In Review</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="w-full md:w-auto">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
          
          <ClaimsTable claims={filteredClaims} onViewClaim={handleViewClaim} />
        </CardContent>
      </Card>

      <ClaimDetailsModal 
        claim={selectedClaim}
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
      />
      
      <NewClaimModal
        open={newClaimModalOpen}
        onOpenChange={setNewClaimModalOpen}
      />
    </div>
  );
};

export default Claims;
