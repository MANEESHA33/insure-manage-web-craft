
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, FileText, Download, ArrowUpRight, ArrowDownRight } from "lucide-react";

// Sample payment data
const paymentsData = [
  {
    id: "TRX-4562",
    client: "Robert Johnson",
    policyNumber: "AUTO-2023-1001",
    date: "May 10, 2025",
    amount: "$450.00",
    type: "Premium Payment",
    method: "Credit Card",
    status: "Successful"
  },
  {
    id: "TRX-4561",
    client: "Emma Wilson",
    policyNumber: "HOME-2023-4532",
    date: "May 8, 2025",
    amount: "$612.50",
    type: "Premium Payment",
    method: "Bank Transfer",
    status: "Successful"
  },
  {
    id: "TRX-4558",
    client: "Sarah Davis",
    policyNumber: "HLTH-2023-7765",
    date: "May 5, 2025",
    amount: "$1,250.00",
    type: "Claim Payout",
    method: "Bank Transfer",
    status: "Pending"
  },
  {
    id: "TRX-4556",
    client: "Michael Brown",
    policyNumber: "LIFE-2024-0087",
    date: "May 3, 2025",
    amount: "$900.00",
    type: "Premium Payment",
    method: "Direct Debit",
    status: "Successful"
  },
  {
    id: "TRX-4551",
    client: "James Miller",
    policyNumber: "AUTO-2024-1287",
    date: "Apr 29, 2025",
    amount: "$237.50",
    type: "Premium Payment",
    method: "Credit Card",
    status: "Failed"
  },
  {
    id: "TRX-4548",
    client: "Jennifer Taylor",
    policyNumber: "BUSI-2024-3321",
    date: "Apr 28, 2025",
    amount: "$1,300.00",
    type: "Premium Payment",
    method: "Bank Transfer",
    status: "Successful"
  },
  {
    id: "TRX-4546",
    client: "David Anderson",
    policyNumber: "TRVL-2023-5543",
    date: "Apr 25, 2025",
    amount: "$700.00",
    type: "Refund",
    method: "Bank Transfer",
    status: "Processing"
  },
];

const paymentStatuses = [
  "All Statuses",
  "Successful",
  "Pending",
  "Processing",
  "Failed"
];

const paymentTypes = [
  "All Types",
  "Premium Payment",
  "Claim Payout",
  "Refund"
];

const statusColors: Record<string, string> = {
  "Successful": "bg-green-100 text-green-800 hover:bg-green-100",
  "Pending": "bg-amber-100 text-amber-800 hover:bg-amber-100",
  "Processing": "bg-blue-100 text-blue-800 hover:bg-blue-100",
  "Failed": "bg-red-100 text-red-800 hover:bg-red-100"
};

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [selectedType, setSelectedType] = useState("All Types");
  
  const filteredPayments = paymentsData.filter((payment) => {
    const matchesSearch = 
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.policyNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === "All Statuses" || payment.status === selectedStatus;
    const matchesType = selectedType === "All Types" || payment.type === selectedType;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  // Calculate summary data
  const totalIncoming = paymentsData
    .filter(p => p.type === "Premium Payment" && p.status !== "Failed")
    .reduce((sum, payment) => sum + parseFloat(payment.amount.replace(/[$,]/g, "")), 0);
  
  const totalOutgoing = paymentsData
    .filter(p => (p.type === "Claim Payout" || p.type === "Refund") && p.status !== "Failed")
    .reduce((sum, payment) => sum + parseFloat(payment.amount.replace(/[$,]/g, "")), 0);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Download Report
          </Button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Incoming Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-insurance-primary">${totalIncoming.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <div className="flex items-center pt-1 text-xs">
              <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
              <span className="text-emerald-500">
                +5.2% from last month
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Outgoing Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-insurance-red">${totalOutgoing.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <div className="flex items-center pt-1 text-xs">
              <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />
              <span className="text-red-500">
                +12.8% from last month
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Payment Transactions</CardTitle>
          <CardDescription>
            View and manage all payment transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Transactions</TabsTrigger>
              <TabsTrigger value="incoming">Incoming</TabsTrigger>
              <TabsTrigger value="outgoing">Outgoing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search payments..."
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
                      {paymentStatuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-full sm:w-[180px]">
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentTypes.map((type) => (
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
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead className="hidden md:table-cell">Policy #</TableHead>
                      <TableHead className="hidden lg:table-cell">Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="hidden md:table-cell">Type</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.length > 0 ? (
                      filteredPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.id}</TableCell>
                          <TableCell>{payment.client}</TableCell>
                          <TableCell className="hidden md:table-cell">{payment.policyNumber}</TableCell>
                          <TableCell className="hidden lg:table-cell">{payment.date}</TableCell>
                          <TableCell 
                            className={payment.type === "Premium Payment" ? "text-insurance-primary" : "text-insurance-red"}
                          >
                            {payment.amount}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{payment.type}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline"
                              className={statusColors[payment.status]}
                            >
                              {payment.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          No payments found matching your criteria.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="incoming" className="space-y-4">
              {/* Same structure as "all" tab but filtered for incoming payments */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead className="hidden md:table-cell">Policy #</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentsData
                      .filter(p => p.type === "Premium Payment")
                      .map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.id}</TableCell>
                          <TableCell>{payment.client}</TableCell>
                          <TableCell className="hidden md:table-cell">{payment.policyNumber}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell className="text-insurance-primary">{payment.amount}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline"
                              className={statusColors[payment.status]}
                            >
                              {payment.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="outgoing" className="space-y-4">
              {/* Same structure as "all" tab but filtered for outgoing payments */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead className="hidden md:table-cell">Policy #</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentsData
                      .filter(p => p.type === "Claim Payout" || p.type === "Refund")
                      .map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.id}</TableCell>
                          <TableCell>{payment.client}</TableCell>
                          <TableCell className="hidden md:table-cell">{payment.policyNumber}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell className="text-insurance-red">{payment.amount}</TableCell>
                          <TableCell>{payment.type}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline"
                              className={statusColors[payment.status]}
                            >
                              {payment.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;
