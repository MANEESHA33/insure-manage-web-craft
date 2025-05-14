
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ArrowUpRight, ArrowDownRight, Activity, Users, FileText, DollarSign } from "lucide-react";

// Mock data for charts
const policyData = [
  { month: "Jan", active: 1200, expired: 320, new: 245 },
  { month: "Feb", active: 1350, expired: 290, new: 267 },
  { month: "Mar", active: 1460, expired: 310, new: 230 },
  { month: "Apr", active: 1590, expired: 285, new: 250 },
  { month: "May", active: 1650, expired: 300, new: 270 },
  { month: "Jun", active: 1720, expired: 270, new: 290 },
];

const claimData = [
  { month: "Jan", claims: 67, paid: 45, pending: 22 },
  { month: "Feb", claims: 55, paid: 42, pending: 13 },
  { month: "Mar", claims: 80, paid: 60, pending: 20 },
  { month: "Apr", claims: 63, paid: 47, pending: 16 },
  { month: "May", claims: 71, paid: 53, pending: 18 },
  { month: "Jun", claims: 82, paid: 62, pending: 20 },
];

// Stats cards data
const statsData = [
  {
    title: "Total Clients",
    value: "2,865",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "bg-insurance-blue/10 text-insurance-blue",
  },
  {
    title: "Active Policies",
    value: "1,720",
    change: "+5.3%",
    trend: "up",
    icon: FileText,
    color: "bg-insurance-primary/10 text-insurance-primary",
  },
  {
    title: "Pending Claims",
    value: "58",
    change: "+2.9%",
    trend: "up",
    icon: Activity,
    color: "bg-amber-500/10 text-amber-500",
  },
  {
    title: "Monthly Revenue",
    value: "$284,546",
    change: "-1.5%",
    trend: "down",
    icon: DollarSign,
    color: "bg-emerald-500/10 text-emerald-500",
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="hidden md:flex items-center space-x-2">
          <div className="text-sm text-muted-foreground">
            Last updated: May 14, 2025, 10:24 AM
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-full ${stat.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center pt-1 text-xs">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
                  ) : (
                    <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />
                  )}
                  <span className={stat.trend === "up" ? "text-emerald-500" : "text-red-500"}>
                    {stat.change} from last month
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <Tabs defaultValue="policies" className="space-y-4">
        <TabsList>
          <TabsTrigger value="policies">Policies</TabsTrigger>
          <TabsTrigger value="claims">Claims</TabsTrigger>
        </TabsList>
        
        <TabsContent value="policies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Policy Overview</CardTitle>
              <CardDescription>
                View policy distribution and trends over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={policyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="active" stroke="#8B5CF6" strokeWidth={2} />
                  <Line type="monotone" dataKey="expired" stroke="#ea384c" strokeWidth={2} />
                  <Line type="monotone" dataKey="new" stroke="#0EA5E9" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="claims" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Claims Analysis</CardTitle>
              <CardDescription>
                Monthly claim submissions and processing status
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={claimData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="claims" fill="#8B5CF6" />
                  <Bar dataKey="paid" fill="#0EA5E9" />
                  <Bar dataKey="pending" fill="#F97316" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Activities and Tasks */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "New claim submitted", client: "Robert Johnson", time: "10:24 AM", type: "claim" },
              { title: "Policy renewed", client: "Emma Wilson", time: "Yesterday", type: "policy" },
              { title: "Payment received", client: "Michael Brown", time: "Yesterday", type: "payment" },
              { title: "New client registered", client: "Sarah Davis", time: "May 13, 2025", type: "client" },
            ].map((activity, i) => (
              <div key={i} className="flex justify-between items-start pb-3 border-b last:border-0 last:pb-0">
                <div>
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.client}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "Review claim #CLM-2025-0482", priority: "High", due: "Today" },
              { title: "Call client about policy renewal", priority: "Medium", due: "Today" },
              { title: "Process payment refund", priority: "Medium", due: "Tomorrow" },
              { title: "Update policy terms", priority: "Low", due: "May 18, 2025" },
            ].map((task, i) => (
              <div key={i} className="flex justify-between items-start pb-3 border-b last:border-0 last:pb-0">
                <div>
                  <p className="font-medium">{task.title}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      task.priority === "High"
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        : task.priority === "Medium"
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{task.due}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
