import { cn } from "@/lib/utils";
import { Check, CheckCheck } from "lucide-react";

interface ChatBubbleProps {
  message: string;
  time: string;
  isOwn: boolean;
  senderName?: string;
  status?: "sent" | "delivered" | "read";
  isNew?: boolean;
}

export function ChatBubble({ 
  message, 
  time, 
  isOwn, 
  senderName, 
  status = "read",
  isNew = false 
}: ChatBubbleProps) {
  return (
    <div 
      className={cn(
        "flex flex-col max-w-[75%]",
        isOwn ? "ml-auto items-end" : "items-start",
        isNew ? "animate-message-in" : "animate-fade-in"
      )}
    >
      {senderName && !isOwn && (
        <span className="text-xs font-semibold text-primary mb-1.5 ml-3">{senderName}</span>
      )}
      <div
        className={cn(
          "relative px-4 py-3 max-w-full",
          isOwn
            ? "bg-primary text-primary-foreground rounded-2xl rounded-br-md"
            : "bg-secondary text-foreground rounded-2xl rounded-bl-md"
        )}
        style={isOwn ? { 
          background: 'var(--gradient-primary)',
          boxShadow: '0 2px 8px 0 hsl(217 91% 55% / 0.15)'
        } : undefined}
      >
        <p className="text-sm leading-relaxed">{message}</p>
      </div>
      <div className={cn(
        "flex items-center gap-1.5 mt-1.5 mx-3",
        isOwn ? "flex-row-reverse" : "flex-row"
      )}>
        <span className="text-[11px] text-muted-foreground font-medium">{time}</span>
        {isOwn && (
          <span className="text-primary">
            {status === "read" ? (
              <CheckCheck className="w-3.5 h-3.5" />
            ) : status === "delivered" ? (
              <CheckCheck className="w-3.5 h-3.5 text-muted-foreground" />
            ) : (
              <Check className="w-3.5 h-3.5 text-muted-foreground" />
            )}
          </span>
        )}
      </div>
    </div>
  );
}