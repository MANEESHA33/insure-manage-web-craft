
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MoreHorizontal, FileText, ClipboardCheck, AlertCircle } from "lucide-react";

// Sample claims data
const claimsData = [
  {
    id: "CLM-2025-0482",
    client: "Robert Johnson",
    policyNumber: "AUTO-2023-1001",
    type: "Auto Insurance",
    date: "May 10, 2025",
    amount: "$3,450.00",
    status: "Pending",
    description: "Vehicle damage due to accident"
  },
  {
    id: "CLM-2025-0475",
    client: "Emma Wilson",
    policyNumber: "HOME-2023-4532",
    type: "Home Insurance",
    date: "May 8, 2025",
    amount: "$7,800.00",
    status: "Under Review",
    description: "Water damage from plumbing leak"
  },
  {
    id: "CLM-2025-0468",
    client: "Michael Brown",
    policyNumber: "LIFE-2024-0087",
    type: "Life Insurance",
    date: "May 5, 2025",
    amount: "$50,000.00",
    status: "Approved",
    description: "Critical illness claim"
  },
  {
    id: "CLM-2025-0461",
    client: "Sarah Davis",
    policyNumber: "HLTH-2023-7765",
    type: "Health Insurance",
    date: "May 3, 2025",
    amount: "$1,250.00",
    status: "Paid",
    description: "Hospital stay for surgery"
  },
  {
    id: "CLM-2025-0453",
    client: "James Miller",
    policyNumber: "AUTO-2024-1287",
    type: "Auto Insurance",
    date: "Apr 29, 2025",
    amount: "$2,100.00",
    status: "Denied",
    description: "Windshield damage repair"
  },
  {
    id: "CLM-2025-0442",
    client: "Jennifer Taylor",
    policyNumber: "BUSI-2024-3321",
    type: "Business Insurance",
    date: "Apr 25, 2025",
    amount: "$12,500.00",
    status: "Paid",
    description: "Property damage from storm"
  },
];

const claimStatuses = [
  "All Statuses",
  "Pending",
  "Under Review",
  "Approved",
  "Paid",
  "Denied"
];

const statusColors: Record<string, string> = {
  "Pending": "bg-amber-100 text-amber-800 hover:bg-amber-100",
  "Under Review": "bg-blue-100 text-blue-800 hover:bg-blue-100",
  "Approved": "bg-green-100 text-green-800 hover:bg-green-100",
  "Paid": "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
  "Denied": "bg-red-100 text-red-800 hover:bg-red-100"
};

const Claims = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  
  const filteredClaims = claimsData.filter((claim) => {
    const matchesSearch = 
      claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.policyNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === "All Statuses" || claim.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Claims</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Claim
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Claims Management</CardTitle>
          <CardDescription>
            Track and process insurance claims
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search claims..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="w-full sm:w-[180px]">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  {claimStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Claim ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead className="hidden md:table-cell">Policy #</TableHead>
                  <TableHead className="hidden lg:table-cell">Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClaims.length > 0 ? (
                  filteredClaims.map((claim) => (
                    <TableRow key={claim.id}>
                      <TableCell className="font-medium">{claim.id}</TableCell>
                      <TableCell>{claim.client}</TableCell>
                      <TableCell className="hidden md:table-cell">{claim.policyNumber}</TableCell>
                      <TableCell className="hidden lg:table-cell">{claim.date}</TableCell>
                      <TableCell>{claim.amount}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={statusColors[claim.status]}
                        >
                          {claim.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ClipboardCheck className="mr-2 h-4 w-4" /> Process Claim
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <AlertCircle className="mr-2 h-4 w-4" /> Escalate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No claims found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Claims;
