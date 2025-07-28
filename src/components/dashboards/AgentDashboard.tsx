import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ArrowUpRight, ArrowDownRight, Users, FileText, DollarSign, Target, Phone, Calendar } from "lucide-react";

// Agent-specific data
const agentStatsData = [
  {
    title: "My Clients",
    value: "89",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    color: "bg-insurance-blue/10 text-insurance-blue",
  },
  {
    title: "Active Policies",
    value: "156",
    change: "+12.3%",
    trend: "up",
    icon: FileText,
    color: "bg-insurance-primary/10 text-insurance-primary",
  },
  {
    title: "Monthly Commission",
    value: "$8,450",
    change: "+15.7%",
    trend: "up",
    icon: DollarSign,
    color: "bg-emerald-500/10 text-emerald-500",
  },
  {
    title: "Target Progress",
    value: "76%",
    change: "+5.2%",
    trend: "up",
    icon: Target,
    color: "bg-amber-500/10 text-amber-500",
  },
];

const salesData = [
  { month: "Jan", policies: 12, commission: 6200, renewals: 8 },
  { month: "Feb", policies: 15, commission: 7350, renewals: 12 },
  { month: "Mar", policies: 18, commission: 8900, renewals: 14 },
  { month: "Apr", policies: 14, commission: 7100, renewals: 10 },
  { month: "May", policies: 20, commission: 9800, renewals: 16 },
  { month: "Jun", policies: 16, commission: 8450, renewals: 13 },
];

const clientActivityData = [
  { month: "Jan", newClients: 8, followUps: 25, meetings: 18 },
  { month: "Feb", newClients: 12, followUps: 30, meetings: 22 },
  { month: "Mar", newClients: 10, followUps: 28, meetings: 20 },
  { month: "Apr", newClients: 14, followUps: 32, meetings: 24 },
  { month: "May", newClients: 16, followUps: 35, meetings: 26 },
  { month: "Jun", newClients: 11, followUps: 29, meetings: 21 },
];

const AgentDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agent Dashboard</h1>
          <p className="text-muted-foreground">Your sales performance and client management</p>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <div className="text-sm text-muted-foreground">
            Last updated: May 14, 2025, 10:24 AM
          </div>
        </div>
      </div>

      {/* Agent Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {agentStatsData.map((stat) => {
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
      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sales">Sales Performance</TabsTrigger>
          <TabsTrigger value="clients">Client Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Performance</CardTitle>
              <CardDescription>
                Your monthly sales and commission trends
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    name === 'commission' ? `$${value.toLocaleString()}` : value,
                    name
                  ]} />
                  <Legend />
                  <Line type="monotone" dataKey="policies" stroke="#8B5CF6" strokeWidth={2} />
                  <Line type="monotone" dataKey="commission" stroke="#0EA5E9" strokeWidth={2} />
                  <Line type="monotone" dataKey="renewals" stroke="#F97316" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Client Activity</CardTitle>
              <CardDescription>
                Client acquisition and engagement metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={clientActivityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="newClients" fill="#8B5CF6" />
                  <Bar dataKey="followUps" fill="#0EA5E9" />
                  <Bar dataKey="meetings" fill="#F97316" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Agent Activities */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { client: "John Smith", type: "Policy Review", time: "2:00 PM Today", urgent: false },
              { client: "Maria Garcia", type: "New Policy", time: "10:00 AM Tomorrow", urgent: false },
              { client: "Robert Chen", type: "Claim Follow-up", time: "3:30 PM Tomorrow", urgent: true },
              { client: "Lisa Wilson", type: "Renewal Meeting", time: "May 16, 9:00 AM", urgent: false },
            ].map((appointment, i) => (
              <div key={i} className="flex justify-between items-start pb-3 border-b last:border-0 last:pb-0">
                <div>
                  <p className="font-medium">{appointment.client}</p>
                  <p className="text-sm text-muted-foreground">{appointment.type}</p>
                  {appointment.urgent && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                      Urgent
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{appointment.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Client Activities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { client: "Emma Johnson", action: "Policy purchased", value: "$2,400", time: "1 hour ago" },
              { client: "David Brown", action: "Quote requested", value: "Auto", time: "3 hours ago" },
              { client: "Sarah Davis", action: "Payment received", value: "$850", time: "Yesterday" },
              { client: "Mike Wilson", action: "Policy renewed", value: "$1,200", time: "Yesterday" },
            ].map((activity, i) => (
              <div key={i} className="flex justify-between items-start pb-3 border-b last:border-0 last:pb-0">
                <div>
                  <p className="font-medium">{activity.client}</p>
                  <p className="text-sm text-muted-foreground">{activity.action}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{activity.value}</p>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
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
              { title: "Add New Client", icon: Users, type: "primary" },
              { title: "Schedule Appointment", icon: Calendar, type: "secondary" },
              { title: "Generate Quote", icon: FileText, type: "secondary" },
              { title: "Call Client", icon: Phone, type: "outline" },
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

export default AgentDashboard;