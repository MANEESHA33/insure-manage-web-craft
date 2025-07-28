import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ArrowUpRight, ArrowDownRight, Users, FileText, DollarSign, Shield, TrendingUp, Database } from "lucide-react";

// Admin-specific data
const adminStatsData = [
  {
    title: "Total Users",
    value: "3,245",
    change: "+15.2%",
    trend: "up",
    icon: Users,
    color: "bg-insurance-blue/10 text-insurance-blue",
  },
  {
    title: "System Revenue",
    value: "$1,284,546",
    change: "+8.3%",
    trend: "up",
    icon: DollarSign,
    color: "bg-emerald-500/10 text-emerald-500",
  },
  {
    title: "Active Agents",
    value: "156",
    change: "+5.1%",
    trend: "up",
    icon: Shield,
    color: "bg-insurance-primary/10 text-insurance-primary",
  },
  {
    title: "Total Policies",
    value: "8,720",
    change: "+12.8%",
    trend: "up",
    icon: FileText,
    color: "bg-amber-500/10 text-amber-500",
  },
];

const revenueData = [
  { month: "Jan", revenue: 1120000, policies: 720, agents: 145 },
  { month: "Feb", revenue: 1180000, policies: 780, agents: 148 },
  { month: "Mar", revenue: 1250000, policies: 820, agents: 152 },
  { month: "Apr", revenue: 1190000, policies: 850, agents: 155 },
  { month: "May", revenue: 1320000, policies: 890, agents: 156 },
  { month: "Jun", revenue: 1284000, policies: 920, agents: 156 },
];

const roleDistribution = [
  { name: "Customers", value: 2865, color: "#8B5CF6" },
  { name: "Agents", value: 156, color: "#0EA5E9" },
  { name: "Admins", value: 224, color: "#F97316" },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">System overview and management</p>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <div className="text-sm text-muted-foreground">
            Last updated: May 14, 2025, 10:24 AM
          </div>
        </div>
      </div>

      {/* Admin Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {adminStatsData.map((stat) => {
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
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Growth Trends</CardTitle>
            <CardDescription>
              Monthly revenue and business metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  name === 'revenue' ? `$${value.toLocaleString()}` : value,
                  name
                ]} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8B5CF6" strokeWidth={2} />
                <Line type="monotone" dataKey="policies" stroke="#0EA5E9" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Role Distribution</CardTitle>
            <CardDescription>
              Current user breakdown by role
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roleDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {roleDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* System Management */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "High claim processing volume", level: "Warning", time: "10:24 AM" },
              { title: "Agent performance review due", level: "Info", time: "Yesterday" },
              { title: "System backup completed", level: "Success", time: "Yesterday" },
              { title: "Database optimization needed", level: "Warning", time: "May 13, 2025" },
            ].map((alert, i) => (
              <div key={i} className="flex justify-between items-start pb-3 border-b last:border-0 last:pb-0">
                <div>
                  <p className="font-medium">{alert.title}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      alert.level === "Warning"
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                        : alert.level === "Success"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    }`}
                  >
                    {alert.level}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{alert.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Agents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Sarah Johnson", policies: 245, revenue: "$124,500" },
              { name: "Mike Chen", policies: 230, revenue: "$118,750" },
              { name: "Emma Wilson", policies: 220, revenue: "$112,300" },
              { name: "David Brown", policies: 210, revenue: "$108,900" },
            ].map((agent, i) => (
              <div key={i} className="flex justify-between items-center pb-3 border-b last:border-0 last:pb-0">
                <div>
                  <p className="font-medium">{agent.name}</p>
                  <p className="text-sm text-muted-foreground">{agent.policies} policies</p>
                </div>
                <span className="text-sm font-medium">{agent.revenue}</span>
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
              { title: "Generate monthly report", type: "primary" },
              { title: "Review agent applications", type: "secondary" },
              { title: "System maintenance", type: "secondary" },
              { title: "Backup database", type: "outline" },
            ].map((action, i) => (
              <button
                key={i}
                className={`w-full p-2 text-sm rounded-md transition-colors ${
                  action.type === "primary"
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : action.type === "secondary"
                    ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {action.title}
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;