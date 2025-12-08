import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, ChevronLeft, ChevronRight, Plus, Calendar, Clock, User } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const appointments = [
  { id: 1, patientName: "John Smith", age: 45, date: "Dec 8, 2024", time: "09:00 AM", type: "General Checkup", status: "completed", phone: "+1 (555) 123-4567" },
  { id: 2, patientName: "Emma Johnson", age: 32, date: "Dec 8, 2024", time: "10:30 AM", type: "Follow-up Visit", status: "in-progress", phone: "+1 (555) 234-5678" },
  { id: 3, patientName: "Michael Brown", age: 58, date: "Dec 8, 2024", time: "11:45 AM", type: "ECG Test", status: "upcoming", phone: "+1 (555) 345-6789" },
  { id: 4, patientName: "Sarah Davis", age: 41, date: "Dec 8, 2024", time: "02:00 PM", type: "Cardiology Review", status: "upcoming", phone: "+1 (555) 456-7890" },
  { id: 5, patientName: "Robert Wilson", age: 67, date: "Dec 8, 2024", time: "03:30 PM", type: "Blood Pressure Check", status: "pending", phone: "+1 (555) 567-8901" },
  { id: 6, patientName: "Jennifer Martinez", age: 29, date: "Dec 8, 2024", time: "04:15 PM", type: "Annual Physical", status: "upcoming", phone: "+1 (555) 678-9012" },
  { id: 7, patientName: "David Lee", age: 53, date: "Dec 7, 2024", time: "09:30 AM", type: "Stress Test", status: "completed", phone: "+1 (555) 789-0123" },
  { id: 8, patientName: "Lisa Anderson", age: 38, date: "Dec 7, 2024", time: "11:00 AM", type: "Lab Review", status: "completed", phone: "+1 (555) 890-1234" },
  { id: 9, patientName: "James Taylor", age: 62, date: "Dec 7, 2024", time: "02:30 PM", type: "Heart Monitoring", status: "completed", phone: "+1 (555) 901-2345" },
  { id: 10, patientName: "Patricia White", age: 44, date: "Dec 6, 2024", time: "10:00 AM", type: "Cholesterol Check", status: "completed", phone: "+1 (555) 012-3456" },
  { id: 11, patientName: "Christopher Harris", age: 51, date: "Dec 6, 2024", time: "03:00 PM", type: "Consultation", status: "cancelled", phone: "+1 (555) 123-4568" },
  { id: 12, patientName: "Nancy Clark", age: 36, date: "Dec 5, 2024", time: "09:00 AM", type: "Preventive Care", status: "completed", phone: "+1 (555) 234-5679" },
];

const statusConfig = {
  upcoming: { label: "Upcoming", class: "badge-upcoming" },
  completed: { label: "Completed", class: "badge-completed" },
  cancelled: { label: "Cancelled", class: "badge-cancelled" },
  pending: { label: "Pending", class: "badge-pending" },
  "in-progress": { label: "In Progress", class: "badge-in-progress" },
};

export default function Appointments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Appointments | Doctor Portal";
  }, []);

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch = apt.patientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || apt.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout pageTitle="Appointments">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          {/* Search */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-medical pl-11 w-full sm:w-72"
            />
          </div>

          {/* Filter */}
          <div className="relative group">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-medical pl-11 pr-10 appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <Button className="btn-medical-primary">
          <Plus className="w-4 h-4" />
          New Appointment
        </Button>
      </div>

      {/* Appointments Table */}
      <div className="card-medical-static overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-medical">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date & Time</th>
                <th>Appointment Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment, index) => (
                <tr
                  key={appointment.id}
                  onClick={() => navigate(`/appointments/${appointment.id}`)}
                  className="animate-slide-in"
                  style={{ animationDelay: `${index * 0.03}s`, animationFillMode: 'both' }}
                >
                  <td>
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center">
                        <span className="text-sm font-semibold text-muted-foreground">
                          {appointment.patientName.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{appointment.patientName}</p>
                        <p className="text-sm text-muted-foreground">{appointment.age} years old</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Calendar className="w-4 h-4 text-primary" />
                        {appointment.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {appointment.time}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="font-medium text-foreground">{appointment.type}</span>
                  </td>
                  <td>
                    <span className={statusConfig[appointment.status as keyof typeof statusConfig].class}>
                      {statusConfig[appointment.status as keyof typeof statusConfig].label}
                    </span>
                  </td>
                  <td>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary/80 font-semibold hover:bg-primary/10 rounded-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/appointments/${appointment.id}`);
                      }}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border/50 bg-secondary/20">
          <p className="text-sm text-muted-foreground font-medium">
            Showing <span className="text-foreground">1-{filteredAppointments.length}</span> of <span className="text-foreground">{appointments.length}</span> appointments
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled className="rounded-lg">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button size="sm" className="rounded-lg gradient-primary text-primary-foreground px-4">
              1
            </Button>
            <Button variant="outline" size="sm" className="rounded-lg">
              2
            </Button>
            <Button variant="outline" size="sm" className="rounded-lg">
              3
            </Button>
            <Button variant="outline" size="sm" className="rounded-lg">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}