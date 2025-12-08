import { Bell, Search, Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopbarProps {
  sidebarCollapsed: boolean;
  onMenuClick: () => void;
  pageTitle: string;
}

export function Topbar({ sidebarCollapsed, onMenuClick, pageTitle }: TopbarProps) {
  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-[72px] bg-card/90 backdrop-blur-xl border-b border-border/40 flex items-center justify-between px-6 transition-all duration-300",
        sidebarCollapsed ? "left-20" : "left-64"
      )}
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden icon-btn"
        >
          <Menu className="w-5 h-5 text-muted-foreground" />
        </button>
        <div>
          <h2 className="font-display font-bold text-xl text-foreground">{pageTitle}</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Welcome back, Dr. Wilson</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-secondary/60 hover:bg-secondary rounded-xl px-4 py-2.5 transition-colors group cursor-pointer">
          <Search className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          <input
            type="text"
            placeholder="Search anything..."
            className="bg-transparent text-sm w-52 focus:outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 bg-card rounded-md text-[10px] font-medium text-muted-foreground border border-border">
            ⌘K
          </kbd>
        </div>

        {/* Notifications */}
        <button className="relative icon-btn">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-card animate-pulse-soft" />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-3 pl-3 pr-2 py-1.5 rounded-xl hover:bg-secondary/60 transition-colors group">
          <div className="avatar-container">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center" style={{ boxShadow: 'var(--shadow-sm)' }}>
              <span className="text-sm font-bold text-primary-foreground">SW</span>
            </div>
            <span className="avatar-status-online" />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold text-foreground">Dr. Sarah Wilson</p>
            <p className="text-xs text-muted-foreground">Cardiologist</p>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block group-hover:text-foreground transition-colors" />
        </button>
      </div>
    </header>
  );
}