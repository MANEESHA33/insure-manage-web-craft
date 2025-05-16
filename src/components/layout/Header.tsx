
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Menu, Search, LogOut, Settings, User, LayoutDashboard, Users, FileText, ClipboardCheck, CreditCard, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="sticky top-0 z-10 bg-background border-b border-border h-16">
      <div className="px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <div className="flex items-center md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="flex-1 flex items-center justify-end md:justify-between">
          <div className="relative max-w-md w-full hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search policies, clients..."
              className="pl-8 w-full bg-background"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-insurance-red"></span>
            </Button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar>
                      <AvatarFallback className="bg-insurance-primary text-white">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                  <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                    {user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    <User className="mr-2 h-4 w-4" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    <Settings className="mr-2 h-4 w-4" /> Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border">
          <nav className="flex flex-col px-4 py-3 space-y-2">
            <a href="/" className="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-sidebar-accent/50">
              <LayoutDashboard className="mr-3 h-5 w-5" />
              Dashboard
            </a>
            <a href="/clients" className="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-sidebar-accent/50">
              <Users className="mr-3 h-5 w-5" />
              Clients
            </a>
            <a href="/policies" className="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-sidebar-accent/50">
              <FileText className="mr-3 h-5 w-5" />
              Policies
            </a>
            <a href="/claims" className="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-sidebar-accent/50">
              <ClipboardCheck className="mr-3 h-5 w-5" />
              Claims
            </a>
            <a href="/payments" className="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-sidebar-accent/50">
              <CreditCard className="mr-3 h-5 w-5" />
              Payments
            </a>
            <a href="/settings" className="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-sidebar-accent/50">
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </a>
            <a href="/help" className="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-sidebar-accent/50">
              <HelpCircle className="mr-3 h-5 w-5" />
              Help
            </a>
            {user && (
              <button 
                onClick={handleLogout}
                className="flex items-center px-2 py-2 text-sm font-medium text-red-500 rounded-md hover:bg-sidebar-accent/50"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
