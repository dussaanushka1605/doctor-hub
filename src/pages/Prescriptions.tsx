import { useEffect, useState } from "react";
import { Plus, Search, X, Pill, Calendar } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PrescriptionCard } from "@/components/ui/PrescriptionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const initialPrescriptions = [
  { id: 1, medicineName: "Lisinopril", dosage: "10mg - Once daily", instructions: "Take in the morning with a full glass of water. Monitor blood pressure regularly and report any persistent cough.", patientName: "John Smith", date: "Dec 8, 2024", isActive: true },
  { id: 2, medicineName: "Metformin", dosage: "500mg - Twice daily", instructions: "Take with breakfast and dinner to reduce stomach upset. Avoid alcohol consumption.", patientName: "Emma Johnson", date: "Dec 8, 2024", isActive: true },
  { id: 3, medicineName: "Amoxicillin", dosage: "500mg - Three times daily", instructions: "Complete the full 7-day course even if symptoms improve. Take with or without food.", patientName: "Michael Brown", date: "Dec 7, 2024", isActive: true },
  { id: 4, medicineName: "Omeprazole", dosage: "20mg - Once daily", instructions: "Take 30 minutes before breakfast on empty stomach. Do not crush or chew.", patientName: "Sarah Davis", date: "Dec 6, 2024", isActive: true },
  { id: 5, medicineName: "Atorvastatin", dosage: "40mg - Once daily", instructions: "Take in the evening for best results. Avoid grapefruit and grapefruit juice.", patientName: "Robert Wilson", date: "Dec 5, 2024", isActive: true },
  { id: 6, medicineName: "Aspirin", dosage: "81mg - Once daily", instructions: "Take with food to reduce stomach irritation. Do not take with ibuprofen.", patientName: "Jennifer Martinez", date: "Dec 4, 2024", isActive: true },
  { id: 7, medicineName: "Amlodipine", dosage: "5mg - Once daily", instructions: "May cause ankle swelling. Take at the same time each day.", patientName: "David Lee", date: "Dec 3, 2024", isActive: true },
  { id: 8, medicineName: "Levothyroxine", dosage: "50mcg - Once daily", instructions: "Take on empty stomach, 30-60 minutes before breakfast. Avoid calcium supplements within 4 hours.", patientName: "Lisa Anderson", date: "Dec 2, 2024", isActive: false },
  { id: 9, medicineName: "Hydrochlorothiazide", dosage: "25mg - Once daily", instructions: "Take in the morning to avoid nighttime urination. Stay hydrated.", patientName: "James Taylor", date: "Dec 1, 2024", isActive: true },
];

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPrescription, setNewPrescription] = useState({
    medicineName: "",
    dosage: "",
    instructions: "",
    patientName: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Prescriptions | Doctor Portal";
  }, []);

  const filteredPrescriptions = prescriptions.filter(
    (p) =>
      p.medicineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddPrescription = (e: React.FormEvent) => {
    e.preventDefault();
    const prescription = {
      id: prescriptions.length + 1,
      ...newPrescription,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      isActive: true,
    };
    setPrescriptions([prescription, ...prescriptions]);
    setNewPrescription({ medicineName: "", dosage: "", instructions: "", patientName: "" });
    setShowAddForm(false);
    toast({
      title: "Prescription Created",
      description: "The prescription has been added successfully.",
    });
  };

  const activePrescriptions = prescriptions.filter(p => p.isActive).length;

  return (
    <DashboardLayout pageTitle="Prescriptions">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search prescriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-medical pl-11 w-full sm:w-80"
            />
          </div>
        </div>

        <Button className="btn-medical-primary" onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4" />
          New Prescription
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="card-medical-static p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Pill className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold text-foreground">{prescriptions.length}</p>
          <p className="text-sm text-muted-foreground mt-1">Total Prescriptions</p>
        </div>
        <div className="card-medical-static p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          </div>
          <p className="text-3xl font-bold text-success">{activePrescriptions}</p>
          <p className="text-sm text-muted-foreground mt-1">Active</p>
        </div>
        <div className="card-medical-static p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-accent" />
          </div>
          <p className="text-3xl font-bold text-foreground">3</p>
          <p className="text-sm text-muted-foreground mt-1">Today</p>
        </div>
        <div className="card-medical-static p-4 text-center">
          <p className="text-3xl font-bold text-medical-purple">12</p>
          <p className="text-sm text-muted-foreground mt-1">This Week</p>
        </div>
      </div>

      {/* Add Prescription Form */}
      {showAddForm && (
        <div className="card-medical-static p-8 mb-6 animate-scale-in">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                <Pill className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-foreground">
                  New Prescription
                </h3>
                <p className="text-sm text-muted-foreground">Fill in the prescription details</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(false)}
              className="icon-btn text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleAddPrescription} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="patientName" className="text-sm font-semibold">Patient Name</Label>
              <Input
                id="patientName"
                placeholder="Enter patient name"
                value={newPrescription.patientName}
                onChange={(e) =>
                  setNewPrescription({ ...newPrescription, patientName: e.target.value })
                }
                className="h-12 rounded-xl"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medicineName" className="text-sm font-semibold">Medicine Name</Label>
              <Input
                id="medicineName"
                placeholder="Enter medicine name"
                value={newPrescription.medicineName}
                onChange={(e) =>
                  setNewPrescription({ ...newPrescription, medicineName: e.target.value })
                }
                className="h-12 rounded-xl"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dosage" className="text-sm font-semibold">Dosage</Label>
              <Input
                id="dosage"
                placeholder="e.g., 10mg - Once daily"
                value={newPrescription.dosage}
                onChange={(e) =>
                  setNewPrescription({ ...newPrescription, dosage: e.target.value })
                }
                className="h-12 rounded-xl"
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="instructions" className="text-sm font-semibold">Instructions</Label>
              <Textarea
                id="instructions"
                placeholder="Enter detailed prescription instructions..."
                value={newPrescription.instructions}
                onChange={(e) =>
                  setNewPrescription({ ...newPrescription, instructions: e.target.value })
                }
                className="resize-none min-h-[100px] rounded-xl"
                required
              />
            </div>

            <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-border/50">
              <Button type="button" variant="outline" onClick={() => setShowAddForm(false)} className="rounded-xl px-6">
                Cancel
              </Button>
              <Button type="submit" className="btn-medical-primary px-8">
                <Plus className="w-4 h-4" />
                Create Prescription
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Prescriptions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrescriptions.map((prescription, index) => (
          <div 
            key={prescription.id}
            className="animate-slide-in"
            style={{ animationDelay: `${index * 0.03}s`, animationFillMode: 'both' }}
          >
            <PrescriptionCard
              medicineName={prescription.medicineName}
              dosage={prescription.dosage}
              instructions={prescription.instructions}
              patientName={prescription.patientName}
              date={prescription.date}
              isActive={prescription.isActive}
            />
          </div>
        ))}
      </div>

      {filteredPrescriptions.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
            <Pill className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-lg font-semibold text-foreground">No prescriptions found</p>
          <p className="text-muted-foreground mt-1">Try adjusting your search or add a new prescription</p>
        </div>
      )}
    </DashboardLayout>
  );
}