
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
import { Badge } from "@/components/ui/badge";
import { Search, Plus, PlusCircle, Filter, FileText, Download } from "lucide-react";

// Sample policy data
const policiesData = [
  {
    id: "POL-2501",
    client: "Robert Johnson",
    type: "Auto Insurance",
    policyNumber: "AUTO-2023-1001",
    startDate: "Apr 15, 2023",
    endDate: "Apr 15, 2024",
    premium: "$1,200.00",
    status: "Active",
  },
  {
    id: "POL-2502",
    client: "Emma Wilson",
    type: "Home Insurance",
    policyNumber: "HOME-2023-4532",
    startDate: "Jul 22, 2023",
    endDate: "Jul 22, 2024",
    premium: "$2,450.00",
    status: "Active",
  },
  {
    id: "POL-2503",
    client: "Michael Brown",
    type: "Life Insurance",
    policyNumber: "LIFE-2024-0087",
    startDate: "Jan 10, 2024",
    endDate: "Jan 10, 2025",
    premium: "$3,600.00",
    status: "Active",
  },
  {
    id: "POL-2504",
    client: "Sarah Davis",
    type: "Health Insurance",
    policyNumber: "HLTH-2023-7765",
    startDate: "Sep 5, 2023",
    endDate: "Sep 5, 2024",
    premium: "$4,800.00",
    status: "Expiring Soon",
  },
  {
    id: "POL-2505",
    client: "James Miller",
    type: "Auto Insurance",
    policyNumber: "AUTO-2024-1287",
    startDate: "Feb 28, 2024",
    endDate: "Feb 28, 2025",
    premium: "$950.00",
    status: "Active",
  },
  {
    id: "POL-2506",
    client: "Jennifer Taylor",
    type: "Business Insurance",
    policyNumber: "BUSI-2024-3321",
    startDate: "Mar 12, 2024",
    endDate: "Mar 12, 2025",
    premium: "$5,200.00",
    status: "Active",
  },
  {
    id: "POL-2507",
    client: "David Anderson",
    type: "Travel Insurance",
    policyNumber: "TRVL-2023-5543",
    startDate: "Nov 19, 2023",
    endDate: "Nov 19, 2024",
    premium: "$350.00",
    status: "Expired",
  },
];

const policyTypes = [
  "All Types",
  "Auto Insurance",
  "Home Insurance",
  "Life Insurance",
  "Health Insurance",
  "Business Insurance",
  "Travel Insurance",
];

const Policies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  
  const filteredPolicies = policiesData.filter((policy) => {
    const matchesSearch = 
      policy.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === "All Types" || policy.type === selectedType;
    
    return matchesSearch && matchesType;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Policies</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Policy
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Policy Management</CardTitle>
          <CardDescription>
            View and manage all insurance policies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search policies..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="w-full sm:w-[180px]">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  {policyTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
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
                  <TableHead>Policy #</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead className="hidden md:table-cell">Type</TableHead>
                  <TableHead className="hidden lg:table-cell">Start Date</TableHead>
                  <TableHead className="hidden lg:table-cell">End Date</TableHead>
                  <TableHead>Premium</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPolicies.length > 0 ? (
                  filteredPolicies.map((policy) => (
                    <TableRow key={policy.id}>
                      <TableCell className="font-medium">{policy.policyNumber}</TableCell>
                      <TableCell>{policy.client}</TableCell>
                      <TableCell className="hidden md:table-cell">{policy.type}</TableCell>
                      <TableCell className="hidden lg:table-cell">{policy.startDate}</TableCell>
                      <TableCell className="hidden lg:table-cell">{policy.endDate}</TableCell>
                      <TableCell>{policy.premium}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={
                            policy.status === "Active" 
                              ? "bg-green-100 text-green-800 hover:bg-green-100" 
                              : policy.status === "Expiring Soon"
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                          }
                        >
                          {policy.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No policies found matching your criteria.
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

export default Policies;
