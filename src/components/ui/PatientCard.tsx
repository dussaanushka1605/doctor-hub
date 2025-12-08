import { User, Calendar, Phone, Mail, ArrowRight } from "lucide-react";

interface PatientCardProps {
  name: string;
  age: number;
  gender: string;
  lastVisit: string;
  image?: string;
  phone?: string;
  email?: string;
  condition?: string;
  onClick?: () => void;
}

export function PatientCard({
  name,
  age,
  gender,
  lastVisit,
  image,
  phone,
  email,
  condition,
  onClick,
}: PatientCardProps) {
  const initials = name.split(" ").map((n) => n[0]).join("");

  return (
    <div
      className="card-medical p-6 cursor-pointer animate-slide-in group"
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-16 h-16 rounded-2xl object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
            <span className="text-lg font-bold text-muted-foreground group-hover:text-primary transition-colors">
              {initials}
            </span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-foreground truncate text-lg">{name}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {age} years • {gender}
              </p>
            </div>
            <div className="p-2 rounded-xl bg-secondary group-hover:bg-primary group-hover:text-primary-foreground transition-all opacity-0 group-hover:opacity-100">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
          
          {condition && (
            <div className="mt-3">
              <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">
                {condition}
              </span>
            </div>
          )}
          
          <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Last visit: {lastVisit}</span>
          </div>
        </div>
      </div>
      
      {(phone || email) && (
        <div className="mt-5 pt-5 border-t border-border/50 grid grid-cols-1 gap-2.5">
          {phone && (
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                <Phone className="w-4 h-4 text-muted-foreground" />
              </div>
              <span className="text-muted-foreground">{phone}</span>
            </div>
          )}
          {email && (
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                <Mail className="w-4 h-4 text-muted-foreground" />
              </div>
              <span className="text-muted-foreground truncate">{email}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}