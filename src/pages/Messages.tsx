import { useEffect, useState, useRef } from "react";
import { Search, Send, Phone, Video, MoreVertical, Paperclip, Smile, Image as ImageIcon, Mic } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ChatBubble } from "@/components/ui/ChatBubble";
import { cn } from "@/lib/utils";

const patients = [
  { id: 1, name: "John Smith", lastMessage: "Thank you, Doctor! I'll follow your advice.", time: "2m ago", unread: 2, online: true, avatar: "JS" },
  { id: 2, name: "Emma Johnson", lastMessage: "I'll schedule an appointment for next week.", time: "15m ago", unread: 0, online: true, avatar: "EJ" },
  { id: 3, name: "Michael Brown", lastMessage: "The new medication is working well, thank you!", time: "1h ago", unread: 1, online: false, avatar: "MB" },
  { id: 4, name: "Sarah Davis", lastMessage: "See you next week for the follow-up.", time: "3h ago", unread: 0, online: false, avatar: "SD" },
  { id: 5, name: "Robert Wilson", lastMessage: "Got it, thanks for the quick response!", time: "Yesterday", unread: 0, online: true, avatar: "RW" },
  { id: 6, name: "Jennifer Martinez", lastMessage: "When should I come for the test results?", time: "Yesterday", unread: 3, online: false, avatar: "JM" },
  { id: 7, name: "David Lee", lastMessage: "The pain has reduced significantly.", time: "2 days ago", unread: 0, online: false, avatar: "DL" },
  { id: 8, name: "Lisa Anderson", lastMessage: "Thank you for fitting me in today!", time: "3 days ago", unread: 0, online: false, avatar: "LA" },
];

type MessageStatus = "sent" | "delivered" | "read";

interface Message {
  id: number;
  message: string;
  time: string;
  isOwn: boolean;
  status: MessageStatus;
}

const initialMessages: Message[] = [
  { id: 1, message: "Good morning, Doctor. I wanted to ask about my medication.", time: "9:30 AM", isOwn: false, status: "read" },
  { id: 2, message: "Good morning, John! Of course, what would you like to know?", time: "9:32 AM", isOwn: true, status: "read" },
  { id: 3, message: "I've been experiencing some dizziness after taking Lisinopril in the morning. Is this something I should be concerned about?", time: "9:35 AM", isOwn: false, status: "read" },
  { id: 4, message: "Dizziness can be a common side effect, especially when starting the medication or if your blood pressure drops too quickly. Make sure you're taking it with food and staying well hydrated.", time: "9:38 AM", isOwn: true, status: "read" },
  { id: 5, message: "If the dizziness persists for more than a few days or gets significantly worse, please let me know immediately. We may need to adjust your dosage or try a different medication.", time: "9:38 AM", isOwn: true, status: "read" },
  { id: 6, message: "I understand. Should I continue taking it as prescribed, or should I stop until the dizziness goes away?", time: "9:42 AM", isOwn: false, status: "read" },
  { id: 7, message: "Yes, please continue taking it as prescribed. Stopping abruptly can cause your blood pressure to spike, which is dangerous. If you feel very dizzy, try lying down for a few minutes and getting up slowly.", time: "9:45 AM", isOwn: true, status: "read" },
  { id: 8, message: "Also, try taking the medication in the evening instead of morning if the dizziness is affecting your daily activities. Let me know how you feel after a week.", time: "9:46 AM", isOwn: true, status: "read" },
  { id: 9, message: "That's very helpful advice. I'll try taking it in the evening and see if that helps. Thank you so much, Doctor!", time: "9:47 AM", isOwn: false, status: "read" },
  { id: 10, message: "Thank you, Doctor! I'll follow your advice.", time: "9:48 AM", isOwn: false, status: "read" },
];

export default function Messages() {
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Messages | Doctor Portal";
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const message = {
      id: messages.length + 1,
      message: newMessage,
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      isOwn: true,
      status: "sent" as const,
    };
    
    setMessages([...messages, message]);
    setNewMessage("");
  };

  const totalUnread = patients.reduce((acc, p) => acc + p.unread, 0);

  return (
    <DashboardLayout pageTitle="Messages">
      <div className="card-medical-static overflow-hidden h-[calc(100vh-10rem)]">
        <div className="flex h-full">
          {/* Patient List Sidebar */}
          <div className="w-80 border-r border-border/50 flex flex-col bg-secondary/20">
            {/* Search Header */}
            <div className="p-4 border-b border-border/50 bg-card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground">Messages</h3>
                  <p className="text-sm text-muted-foreground">{totalUnread} unread messages</p>
                </div>
              </div>
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-medical pl-10 w-full py-2.5"
                />
              </div>
            </div>

            {/* Patient List */}
            <div className="flex-1 overflow-y-auto scrollbar-thin">
              {filteredPatients.map((patient) => (
                <button
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient)}
                  className={cn(
                    "w-full p-4 flex items-start gap-3 hover:bg-secondary/60 transition-all duration-200 text-left border-b border-border/30",
                    selectedPatient.id === patient.id && "bg-primary/5 border-l-4 border-l-primary"
                  )}
                >
                  <div className="avatar-container flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                      <span className="text-sm font-semibold text-muted-foreground">{patient.avatar}</span>
                    </div>
                    {patient.online && <span className="avatar-status-online" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-foreground truncate">{patient.name}</span>
                      <span className="text-xs text-muted-foreground flex-shrink-0">{patient.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate pr-2">{patient.lastMessage}</p>
                      {patient.unread > 0 && (
                        <span className="w-5 h-5 rounded-full gradient-primary text-primary-foreground text-xs flex items-center justify-center flex-shrink-0 font-semibold">
                          {patient.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-gradient-subtle">
            {/* Chat Header */}
            <div className="p-4 border-b border-border/50 flex items-center justify-between bg-card">
              <div className="flex items-center gap-4">
                <div className="avatar-container">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                    <span className="text-sm font-semibold text-muted-foreground">{selectedPatient.avatar}</span>
                  </div>
                  {selectedPatient.online && <span className="avatar-status-online" />}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg">{selectedPatient.name}</h3>
                  <p className={cn(
                    "text-sm font-medium",
                    selectedPatient.online ? "text-success" : "text-muted-foreground"
                  )}>
                    {selectedPatient.online ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="icon-btn text-muted-foreground hover:text-primary">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="icon-btn text-muted-foreground hover:text-primary">
                  <Video className="w-5 h-5" />
                </button>
                <button className="icon-btn text-muted-foreground hover:text-foreground">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
              {/* Date Separator */}
              <div className="flex items-center justify-center">
                <span className="px-4 py-1.5 bg-secondary/80 text-muted-foreground text-xs font-medium rounded-full">
                  Today
                </span>
              </div>
              
              {messages.map((msg, index) => (
                <ChatBubble
                  key={msg.id}
                  message={msg.message}
                  time={msg.time}
                  isOwn={msg.isOwn}
                  senderName={msg.isOwn ? undefined : selectedPatient.name}
                  status={msg.status}
                  isNew={index === messages.length - 1}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-border/50 bg-card">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <button type="button" className="icon-btn text-muted-foreground hover:text-primary">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <button type="button" className="icon-btn text-muted-foreground hover:text-primary hidden sm:flex">
                    <ImageIcon className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="input-medical pr-12 py-3"
                  />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
                
                <button type="button" className="icon-btn text-muted-foreground hover:text-primary hidden sm:flex">
                  <Mic className="w-5 h-5" />
                </button>
                
                <button
                  type="submit"
                  className="p-3.5 rounded-xl gradient-primary text-primary-foreground hover:opacity-90 transition-all hover:scale-105 active:scale-95"
                  style={{ boxShadow: 'var(--shadow-primary)' }}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}