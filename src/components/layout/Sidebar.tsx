
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard, roles: ["admin", "agent", "customer"] },
  { name: "Clients", href: "/clients", icon: Users, roles: ["admin", "agent"] },
  { name: "Policies", href: "/policies", icon: FileText, roles: ["admin", "agent", "customer"] },
  { name: "Claims", href: "/claims", icon: ClipboardCheck, roles: ["admin", "agent", "customer"] },
  { name: "Payments", href: "/payments", icon: CreditCard, roles: ["admin", "agent", "customer"] },
  { name: "Settings", href: "/settings", icon: Settings, roles: ["admin", "agent", "customer"] },
  { name: "Help", href: "/help", icon: HelpCircle, roles: ["admin", "agent", "customer"] },
];

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };

  // Filter navigation items based on user role
  const filteredNavItems = user 
    ? navItems.filter(item => item.roles.includes(user.role))
    : navItems;
  
  return (
    <div className="hidden md:flex flex-col w-64 border-r border-border bg-sidebar">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-insurance-primary">InsureManage</h1>
        {user && (
          <div className="mt-2 text-sm text-muted-foreground">
            Logged in as <span className="font-medium">{user.name}</span>
            <div className="text-xs">Role: {user.role}</div>
          </div>
        )}
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {filteredNavItems.map((item) => {
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
        <button 
          className="flex items-center px-4 py-2 text-sm font-medium text-red-500 rounded-md hover:bg-sidebar-accent/50 w-full"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
