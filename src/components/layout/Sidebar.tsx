
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  ClipboardCheck, 
  CreditCard, 
  Settings, 
  HelpCircle,
  LogOut
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Policies", href: "/policies", icon: FileText },
  { name: "Claims", href: "/claims", icon: ClipboardCheck },
  { name: "Payments", href: "/payments", icon: CreditCard },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
];

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <div className="hidden md:flex flex-col w-64 border-r border-border bg-sidebar">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-insurance-primary">InsureManage</h1>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "bg-sidebar-accent text-insurance-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border">
        <button className="flex items-center px-4 py-2 text-sm font-medium text-red-500 rounded-md hover:bg-sidebar-accent/50 w-full">
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
