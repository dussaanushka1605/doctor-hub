import { Clock, User, MoreVertical, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppointmentCardProps {
  patientName: string;
  patientImage?: string;
  time: string;
  date?: string;
  type: string;
  status: "upcoming" | "completed" | "cancelled" | "pending" | "in-progress";
  onClick?: () => void;
}

const statusLabels = {
  upcoming: "Upcoming",
  completed: "Completed",
  cancelled: "Cancelled",
  pending: "Pending",
  "in-progress": "In Progress",
};

const statusClasses = {
  upcoming: "badge-upcoming",
  completed: "badge-completed",
  cancelled: "badge-cancelled",
  pending: "badge-pending",
  "in-progress": "badge-in-progress",
};

export function AppointmentCard({
  patientName,
  patientImage,
  time,
  date,
  type,
  status,
  onClick,
}: AppointmentCardProps) {
  const initials = patientName.split(" ").map((n) => n[0]).join("");

  return (
    <div
      className="card-medical p-5 cursor-pointer animate-slide-in group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-4">
          {patientImage ? (
            <img
              src={patientImage}
              alt={patientName}
              className="w-12 h-12 rounded-xl object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <span className="text-sm font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                {initials}
              </span>
            </div>
          )}
          <div className="min-w-0">
            <h4 className="font-semibold text-foreground truncate">{patientName}</h4>
            <p className="text-sm text-muted-foreground mt-0.5">{type}</p>
          </div>
        </div>
        <button 
          className="p-1.5 rounded-lg hover:bg-secondary transition-colors opacity-0 group-hover:opacity-100"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="font-medium">{time}</span>
          </div>
          {date && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{date}</span>
            </div>
          )}
        </div>
        <span className={statusClasses[status]}>{statusLabels[status]}</span>
      </div>
    </div>
  );
}