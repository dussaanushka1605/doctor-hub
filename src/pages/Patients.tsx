import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Grid, List, Filter } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PatientCard } from "@/components/ui/PatientCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const patients = [
  { id: 1, name: "John Smith", age: 45, gender: "Male", lastVisit: "Dec 8, 2024", phone: "+1 (555) 123-4567", email: "john.smith@email.com", condition: "Hypertension" },
  { id: 2, name: "Emma Johnson", age: 32, gender: "Female", lastVisit: "Dec 7, 2024", phone: "+1 (555) 234-5678", email: "emma.j@email.com", condition: "Diabetes Type 2" },
  { id: 3, name: "Michael Brown", age: 58, gender: "Male", lastVisit: "Dec 6, 2024", phone: "+1 (555) 345-6789", email: "m.brown@email.com", condition: "Heart Disease" },
  { id: 4, name: "Sarah Davis", age: 41, gender: "Female", lastVisit: "Dec 5, 2024", phone: "+1 (555) 456-7890", email: "sarah.d@email.com", condition: "Arrhythmia" },
  { id: 5, name: "Robert Wilson", age: 67, gender: "Male", lastVisit: "Dec 4, 2024", phone: "+1 (555) 567-8901", email: "r.wilson@email.com", condition: "COPD" },
  { id: 6, name: "Emily Thompson", age: 29, gender: "Female", lastVisit: "Dec 3, 2024", phone: "+1 (555) 678-9012", email: "emily.t@email.com", condition: "Asthma" },
  { id: 7, name: "David Lee", age: 53, gender: "Male", lastVisit: "Dec 2, 2024", phone: "+1 (555) 789-0123", email: "david.lee@email.com", condition: "High Cholesterol" },
  { id: 8, name: "Jessica Martinez", age: 38, gender: "Female", lastVisit: "Dec 1, 2024", phone: "+1 (555) 890-1234", email: "jessica.m@email.com", condition: "Thyroid" },
  { id: 9, name: "William Taylor", age: 62, gender: "Male", lastVisit: "Nov 30, 2024", phone: "+1 (555) 901-2345", email: "w.taylor@email.com", condition: "Arthritis" },
  { id: 10, name: "Amanda White", age: 44, gender: "Female", lastVisit: "Nov 29, 2024", phone: "+1 (555) 012-3456", email: "amanda.w@email.com", condition: "Migraine" },
  { id: 11, name: "Christopher Harris", age: 51, gender: "Male", lastVisit: "Nov 28, 2024", phone: "+1 (555) 123-4568", email: "c.harris@email.com", condition: "Obesity" },
  { id: 12, name: "Jennifer Clark", age: 36, gender: "Female", lastVisit: "Nov 27, 2024", phone: "+1 (555) 234-5679", email: "jen.clark@email.com", condition: "Anxiety" },
  { id: 13, name: "Daniel Lewis", age: 48, gender: "Male", lastVisit: "Nov 26, 2024", phone: "+1 (555) 345-6780", email: "d.lewis@email.com", condition: "Depression" },
  { id: 14, name: "Michelle Robinson", age: 55, gender: "Female", lastVisit: "Nov 25, 2024", phone: "+1 (555) 456-7891", email: "m.robinson@email.com", condition: "Osteoporosis" },
  { id: 15, name: "Kevin Walker", age: 39, gender: "Male", lastVisit: "Nov 24, 2024", phone: "+1 (555) 567-8902", email: "k.walker@email.com", condition: "Allergies" },
];

export default function Patients() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Patients | Doctor Portal";
  }, []);

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.condition?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout pageTitle="Patients">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search patients or conditions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-medical pl-11 w-full sm:w-80"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-secondary/60 rounded-xl p-1.5">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-2.5 rounded-lg transition-all duration-200",
                viewMode === "grid" 
                  ? "bg-card shadow-sm text-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-2.5 rounded-lg transition-all duration-200",
                viewMode === "list" 
                  ? "bg-card shadow-sm text-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <Button className="btn-medical-primary">
            <Plus className="w-4 h-4" />
            Add Patient
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="card-medical-static p-4 text-center">
          <p className="text-3xl font-bold text-foreground">{patients.length}</p>
          <p className="text-sm text-muted-foreground mt-1">Total Patients</p>
        </div>
        <div className="card-medical-static p-4 text-center">
          <p className="text-3xl font-bold text-success">12</p>
          <p className="text-sm text-muted-foreground mt-1">Active This Week</p>
        </div>
        <div className="card-medical-static p-4 text-center">
          <p className="text-3xl font-bold text-primary">8</p>
          <p className="text-sm text-muted-foreground mt-1">New This Month</p>
        </div>
        <div className="card-medical-static p-4 text-center">
          <p className="text-3xl font-bold text-medical-purple">95%</p>
          <p className="text-sm text-muted-foreground mt-1">Retention Rate</p>
        </div>
      </div>

      {/* Patients Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPatients.map((patient, index) => (
            <div 
              key={patient.id} 
              className="animate-slide-in"
              style={{ animationDelay: `${index * 0.03}s`, animationFillMode: 'both' }}
            >
              <PatientCard
                name={patient.name}
                age={patient.age}
                gender={patient.gender}
                lastVisit={patient.lastVisit}
                phone={patient.phone}
                email={patient.email}
                condition={patient.condition}
                onClick={() => navigate(`/patients/${patient.id}`)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="card-medical-static overflow-hidden">
          <table className="table-medical">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Condition</th>
                <th>Last Visit</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient, index) => (
                <tr
                  key={patient.id}
                  onClick={() => navigate(`/patients/${patient.id}`)}
                  className="animate-slide-in"
                  style={{ animationDelay: `${index * 0.03}s`, animationFillMode: 'both' }}
                >
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                        <span className="text-sm font-semibold text-muted-foreground">
                          {patient.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <span className="font-semibold text-foreground">{patient.name}</span>
                    </div>
                  </td>
                  <td className="text-muted-foreground">{patient.age} yrs</td>
                  <td className="text-muted-foreground">{patient.gender}</td>
                  <td>
                    <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">
                      {patient.condition}
                    </span>
                  </td>
                  <td className="text-muted-foreground">{patient.lastVisit}</td>
                  <td className="text-muted-foreground">{patient.phone}</td>
                  <td>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 font-semibold hover:bg-primary/10 rounded-lg">
                      View Profile
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredPatients.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-lg font-semibold text-foreground">No patients found</p>
          <p className="text-muted-foreground mt-1">Try adjusting your search query</p>
        </div>
      )}
    </DashboardLayout>
  );
}