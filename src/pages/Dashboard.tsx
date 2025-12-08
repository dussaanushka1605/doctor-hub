import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  ArrowRight,
  Clock,
  Activity,
  MessageSquare,
  Pill,
  FileText,
  Zap,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardStatsCard } from "@/components/ui/DashboardStatsCard";
import { AppointmentCard } from "@/components/ui/AppointmentCard";
import { Button } from "@/components/ui/button";

const todayAppointments = [
  {
    id: 1,
    patientName: "John Smith",
    time: "09:00 AM",
    type: "General Checkup",
    status: "completed" as const,
  },
  {
    id: 2,
    patientName: "Emma Johnson",
    time: "10:30 AM",
    type: "Follow-up Visit",
    status: "in-progress" as const,
  },
  {
    id: 3,
    patientName: "Michael Brown",
    time: "11:45 AM",
    type: "ECG Test",
    status: "upcoming" as const,
  },
  {
    id: 4,
    patientName: "Sarah Davis",
    time: "02:00 PM",
    type: "Cardiology Review",
    status: "upcoming" as const,
  },
  {
    id: 5,
    patientName: "Robert Wilson",
    time: "03:30 PM",
    type: "Blood Pressure Check",
    status: "pending" as const,
  },
  {
    id: 6,
    patientName: "Jennifer Martinez",
    time: "04:15 PM",
    type: "Annual Physical",
    status: "upcoming" as const,
  },
];

const quickActions = [
  { label: "Schedule Appointment", icon: Calendar, path: "/appointments", color: "gradient-primary" },
  { label: "Add New Patient", icon: Users, path: "/patients", color: "gradient-success" },
  { label: "Write Prescription", icon: Pill, path: "/prescriptions", color: "gradient-purple" },
  { label: "View Messages", icon: MessageSquare, path: "/messages", color: "gradient-orange" },
];

const recentActivities = [
  {
    action: "Completed consultation",
    patient: "Robert Wilson",
    time: "2 hours ago",
    icon: Activity,
    color: "text-success",
  },
  {
    action: "Prescription issued",
    patient: "Emily Thompson",
    time: "3 hours ago",
    icon: Pill,
    color: "text-primary",
  },
  {
    action: "New appointment scheduled",
    patient: "David Lee",
    time: "5 hours ago",
    icon: Calendar,
    color: "text-accent",
  },
  {
    action: "Lab results reviewed",
    patient: "Jessica Martinez",
    time: "Yesterday",
    icon: FileText,
    color: "text-medical-purple",
  },
  {
    action: "Patient discharged",
    patient: "Thomas Anderson",
    time: "Yesterday",
    icon: Zap,
    color: "text-medical-orange",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Dashboard | Doctor Portal";
  }, []);

  return (
    <DashboardLayout pageTitle="Dashboard">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardStatsCard
          title="Today's Appointments"
          value={16}
          subtitle="4 pending confirmation"
          icon={Calendar}
          trend={{ value: "12%", positive: true }}
          variant="primary"
        />
        <DashboardStatsCard
          title="New Patients"
          value={48}
          subtitle="This month"
          icon={Users}
          trend={{ value: "8%", positive: true }}
          variant="success"
        />
        <DashboardStatsCard
          title="Total Earnings"
          value="$24,580"
          subtitle="This month"
          icon={DollarSign}
          trend={{ value: "15%", positive: true }}
          variant="purple"
        />
        <DashboardStatsCard
          title="Patient Satisfaction"
          value="98%"
          subtitle="Based on 340 reviews"
          icon={TrendingUp}
          trend={{ value: "3%", positive: true }}
          variant="orange"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Appointments */}
        <div className="lg:col-span-2">
          <div className="card-medical-static p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display font-bold text-xl text-foreground">
                  Today's Appointments
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  You have {todayAppointments.length} appointments scheduled
                </p>
              </div>
              <Button
                variant="ghost"
                className="text-primary hover:text-primary/80 font-semibold group"
                onClick={() => navigate("/appointments")}
              >
                View All
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {todayAppointments.map((appointment, index) => (
                <div key={appointment.id} className={`stagger-${index + 1}`} style={{ animationFillMode: 'both' }}>
                  <AppointmentCard
                    patientName={appointment.patientName}
                    time={appointment.time}
                    type={appointment.type}
                    status={appointment.status}
                    onClick={() => navigate(`/appointments/${appointment.id}`)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card-medical-static p-6">
          <h3 className="font-display font-bold text-xl text-foreground mb-6">
            Quick Actions
          </h3>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-secondary/40 hover:bg-secondary transition-all duration-200 text-left group animate-slide-in"
                style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
              >
                <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center transition-transform group-hover:scale-110`} style={{ boxShadow: 'var(--shadow-sm)' }}>
                  <action.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-semibold text-foreground flex-1">{action.label}</span>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 card-medical-static p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display font-bold text-xl text-foreground">
              Recent Activity
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your latest actions and updates
            </p>
          </div>
          <Button variant="outline" size="sm" className="rounded-xl">
            View All
          </Button>
        </div>
        <div className="space-y-1">
          {recentActivities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary/40 transition-colors cursor-pointer group animate-slide-in"
              style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <activity.icon className={`w-5 h-5 ${activity.color}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {activity.action}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Patient: {activity.patient}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground font-medium">{activity.time}</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}