import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Stethoscope,
  Pill,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Calendar, label: "Appointments", path: "/appointments" },
  { icon: Users, label: "Patients", path: "/patients" },
  { icon: Stethoscope, label: "Consultation", path: "/consultation" },
  { icon: Pill, label: "Prescriptions", path: "/prescriptions" },
  { icon: MessageSquare, label: "Messages", path: "/messages" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
      style={{ boxShadow: 'var(--shadow-lg)' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-sidebar-border/50">
        <div className="w-11 h-11 rounded-2xl gradient-primary flex items-center justify-center flex-shrink-0 shadow-primary">
          <Heart className="w-5 h-5 text-primary-foreground" fill="currentColor" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden animate-fade-in">
            <h1 className="font-display font-bold text-xl text-foreground tracking-tight">MediCare</h1>
            <p className="text-xs text-muted-foreground font-medium">Doctor Portal</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto scrollbar-thin">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path || 
            (item.path !== "/dashboard" && location.pathname.startsWith(item.path));
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                isActive
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
              )}
              style={isActive ? { 
                background: 'var(--gradient-primary)',
                boxShadow: 'var(--shadow-primary)'
              } : undefined}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-foreground rounded-r-full" />
              )}
              <item.icon className={cn(
                "w-5 h-5 flex-shrink-0 transition-transform duration-200",
                !isActive && "group-hover:scale-110"
              )} />
              {!collapsed && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
              {collapsed && (
                <div className="absolute left-full ml-3 px-3 py-2 bg-foreground text-background text-sm font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                  {item.label}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-foreground rotate-45" />
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3.5 top-24 w-7 h-7 bg-card border border-border rounded-full flex items-center justify-center transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:border-primary group"
        style={{ boxShadow: 'var(--shadow-md)' }}
      >
        {collapsed ? (
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
        )}
      </button>

      {/* User & Logout */}
      <div className="p-3 border-t border-sidebar-border/50">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200 group"
        >
          <LogOut className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
          {!collapsed && <span className="font-medium text-sm">Logout</span>}
        </NavLink>
      </div>
    </aside>
  );
}