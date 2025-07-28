
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import AdminDashboard from "@/components/dashboards/AdminDashboard";
import AgentDashboard from "@/components/dashboards/AgentDashboard";
import CustomerDashboard from "@/components/dashboards/CustomerDashboard";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  switch (user.role) {
    case "admin":
      return <AdminDashboard />;
    case "agent":
      return <AgentDashboard />;
    case "customer":
      return <CustomerDashboard />;
    default:
      return <CustomerDashboard />;
  }
};

export default Dashboard;
