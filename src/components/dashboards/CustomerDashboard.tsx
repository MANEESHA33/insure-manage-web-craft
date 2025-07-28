import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ArrowUpRight, ArrowDownRight, FileText, DollarSign, Shield, AlertCircle, CreditCard, Phone } from "lucide-react";

// Customer-specific data
const customerStatsData = [
  {
    title: "Active Policies",
    value: "3",
    change: "+1 this year",
    trend: "up",
    icon: FileText,
    color: "bg-insurance-primary/10 text-insurance-primary",
  },
  {
    title: "Total Coverage",
    value: "$485,000",
    change: "+$50,000",
    trend: "up",
    icon: Shield,
    color: "bg-emerald-500/10 text-emerald-500",
  },
  {
    title: "Annual Premium",
    value: "$3,240",
    change: "-$180",
    trend: "down",
    icon: DollarSign,
    color: "bg-amber-500/10 text-amber-500",
  },
  {
    title: "Open Claims",
    value: "1",
    change: "In progress",
    trend: "up",
    icon: AlertCircle,
    color: "bg-red-500/10 text-red-500",
  },
];

const premiumData = [
  { month: "Jan", auto: 120, home: 85, life: 45 },
  { month: "Feb", auto: 120, home: 85, life: 45 },
  { month: "Mar", auto: 120, home: 85, life: 45 },
  { month: "Apr", auto: 135, home: 90, life: 45 },
  { month: "May", auto: 135, home: 90, life: 45 },
  { month: "Jun", auto: 135, home: 90, life: 45 },
];

const claimHistoryData = [
  { year: "2022", auto: 1, home: 0, life: 0 },
  { year: "2023", auto: 0, home: 1, life: 0 },
  { year: "2024", auto: 2, home: 0, life: 0 },
  { year: "2025", auto: 1, home: 0, life: 0 },
];

const CustomerDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Insurance Portal</h1>
          <p className="text-muted-foreground">Manage your policies and claims</p>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <div className="text-sm text-muted-foreground">
            Last updated: May 14, 2025, 10:24 AM
          </div>
        </div>
      </div>

      {/* Customer Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {customerStatsData.map((stat) => {
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
                    {stat.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <Tabs defaultValue="premiums" className="space-y-4">
        <TabsList>
          <TabsTrigger value="premiums">Premium Payments</TabsTrigger>
          <TabsTrigger value="claims">Claim History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="premiums" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Premium Breakdown</CardTitle>
              <CardDescription>
                Your premium payments by policy type
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={premiumData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, '']} />
                  <Legend />
                  <Line type="monotone" dataKey="auto" stroke="#8B5CF6" strokeWidth={2} />
                  <Line type="monotone" dataKey="home" stroke="#0EA5E9" strokeWidth={2} />
                  <Line type="monotone" dataKey="life" stroke="#F97316" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="claims" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Claim History</CardTitle>
              <CardDescription>
                Your claim submissions over the years
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={claimHistoryData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="auto" fill="#8B5CF6" />
                  <Bar dataKey="home" fill="#0EA5E9" />
                  <Bar dataKey="life" fill="#F97316" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Customer Information */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>My Policies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { type: "Auto Insurance", policy: "POL-2024-AUTO-001", premium: "$1,620/year", status: "Active" },
              { type: "Home Insurance", policy: "POL-2023-HOME-045", premium: "$1,080/year", status: "Active" },
              { type: "Life Insurance", policy: "POL-2022-LIFE-123", premium: "$540/year", status: "Active" },
            ].map((policy, i) => (
              <div key={i} className="flex justify-between items-start pb-3 border-b last:border-0 last:pb-0">
                <div>
                  <p className="font-medium">{policy.type}</p>
                  <p className="text-sm text-muted-foreground">{policy.policy}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {policy.status}
                  </span>
                </div>
                <span className="text-sm font-medium">{policy.premium}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { action: "Premium payment received", type: "Auto Insurance", time: "2 days ago", status: "success" },
              { action: "Claim submitted", type: "Auto Insurance", time: "1 week ago", status: "pending" },
              { action: "Policy renewed", type: "Home Insurance", time: "2 weeks ago", status: "success" },
              { action: "Document uploaded", type: "Life Insurance", time: "1 month ago", status: "success" },
            ].map((activity, i) => (
              <div key={i} className="flex justify-between items-start pb-3 border-b last:border-0 last:pb-0">
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.type}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      activity.status === "success"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                    }`}
                  >
                    {activity.status}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { title: "Submit New Claim", icon: AlertCircle, type: "primary" },
              { title: "Make Payment", icon: CreditCard, type: "secondary" },
              { title: "Download Policy Docs", icon: FileText, type: "secondary" },
              { title: "Contact Agent", icon: Phone, type: "outline" },
            ].map((action, i) => {
              const Icon = action.icon;
              return (
                <button
                  key={i}
                  className={`w-full p-3 text-sm rounded-md transition-colors flex items-center ${
                    action.type === "primary"
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : action.type === "secondary"
                      ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {action.title}
                </button>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerDashboard;