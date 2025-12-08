import { Pill, Clock, User, MoreHorizontal, Check } from "lucide-react";

interface PrescriptionCardProps {
  medicineName: string;
  dosage: string;
  instructions: string;
  patientName?: string;
  date?: string;
  isActive?: boolean;
}

export function PrescriptionCard({
  medicineName,
  dosage,
  instructions,
  patientName,
  date,
  isActive = true,
}: PrescriptionCardProps) {
  return (
    <div className="card-medical p-6 animate-slide-in group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
            <Pill className="w-7 h-7 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-foreground text-lg">{medicineName}</h4>
              {isActive && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/10 text-success text-xs font-medium">
                  <Check className="w-3 h-3" />
                  Active
                </span>
              )}
            </div>
            <p className="text-sm font-semibold text-primary mt-1.5">{dosage}</p>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{instructions}</p>
          </div>
        </div>
        <button className="p-2 rounded-xl hover:bg-secondary transition-colors opacity-0 group-hover:opacity-100">
          <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
      
      {(patientName || date) && (
        <div className="flex items-center gap-5 mt-5 pt-5 border-t border-border/50">
          {patientName && (
            <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center">
                <User className="w-3.5 h-3.5" />
              </div>
              <span>{patientName}</span>
            </div>
          )}
          {date && (
            <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <span>{date}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}