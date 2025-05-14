
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
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MoreHorizontal, FileText, ClipboardCheck, CreditCard } from "lucide-react";

// Sample client data
const clientsData = [
  { 
    id: "CL-1001",
    name: "Robert Johnson",
    email: "robert.j@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, New York, NY",
    policies: 2,
    status: "Active",
    joinDate: "Apr 15, 2023"
  },
  { 
    id: "CL-1002",
    name: "Emma Wilson",
    email: "emma.w@example.com",
    phone: "(555) 234-5678",
    address: "456 Oak Ave, Chicago, IL",
    policies: 1,
    status: "Active",
    joinDate: "Jul 22, 2023"
  },
  { 
    id: "CL-1003",
    name: "Michael Brown",
    email: "michael.b@example.com",
    phone: "(555) 345-6789",
    address: "789 Pine Rd, Los Angeles, CA",
    policies: 3,
    status: "Active",
    joinDate: "Jan 10, 2024"
  },
  { 
    id: "CL-1004",
    name: "Sarah Davis",
    email: "sarah.d@example.com",
    phone: "(555) 456-7890",
    address: "321 Elm St, Houston, TX",
    policies: 1,
    status: "Inactive",
    joinDate: "Sep 5, 2023"
  },
  { 
    id: "CL-1005",
    name: "James Miller",
    email: "james.m@example.com",
    phone: "(555) 567-8901",
    address: "654 Maple Dr, Phoenix, AZ",
    policies: 2,
    status: "Active",
    joinDate: "Feb 28, 2024"
  },
  { 
    id: "CL-1006",
    name: "Jennifer Taylor",
    email: "jennifer.t@example.com",
    phone: "(555) 678-9012",
    address: "987 Cedar Ln, Philadelphia, PA",
    policies: 1,
    status: "Active",
    joinDate: "Mar 12, 2024"
  },
  { 
    id: "CL-1007",
    name: "David Anderson",
    email: "david.a@example.com",
    phone: "(555) 789-0123",
    address: "258 Birch Blvd, San Antonio, TX",
    policies: 0,
    status: "Inactive",
    joinDate: "Nov 19, 2023"
  },
];

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredClients = clientsData.filter((client) => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
        <Button className="sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add New Client
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Client Management</CardTitle>
          <CardDescription>
            View and manage all your insurance clients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, email, or ID..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden lg:table-cell">Phone</TableHead>
                  <TableHead className="hidden lg:table-cell">Policies</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.length > 0 ? (
                  filteredClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">{client.id}</TableCell>
                      <TableCell>{client.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{client.email}</TableCell>
                      <TableCell className="hidden lg:table-cell">{client.phone}</TableCell>
                      <TableCell className="hidden lg:table-cell">{client.policies}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={client.status === "Active" ? "default" : "secondary"}
                          className={
                            client.status === "Active" 
                              ? "bg-green-100 text-green-800 hover:bg-green-100" 
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          }
                        >
                          {client.status}
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
                              <ClipboardCheck className="mr-2 h-4 w-4" /> View Policies
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CreditCard className="mr-2 h-4 w-4" /> Payment History
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              Delete Client
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No clients found matching your search.
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

export default Clients;
