import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  Activity,
  Heart,
  Thermometer,
  Weight,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";

const patientData = {
  id: 1,
  name: "John Smith",
  age: 45,
  gender: "Male",
  dateOfBirth: "March 15, 1979",
  phone: "+1 (555) 123-4567",
  email: "john.smith@email.com",
  address: "123 Main Street, New York, NY 10001",
  bloodType: "A+",
  allergies: ["Penicillin", "Peanuts"],
  medicalHistory: [
    "Hypertension (diagnosed 2018, controlled)",
    "Type 2 Diabetes (diagnosed 2020)",
    "Previous cardiac event (2020, fully recovered)",
  ],
  appointments: [
    { date: "Dec 8, 2024", type: "General Checkup", doctor: "Dr. Sarah Wilson" },
    { date: "Nov 15, 2024", type: "Follow-up", doctor: "Dr. Sarah Wilson" },
    { date: "Oct 20, 2024", type: "Cardiology Review", doctor: "Dr. James Lee" },
  ],
  documents: [
    { name: "Lab Results - Dec 2024.pdf", date: "Dec 5, 2024" },
    { name: "ECG Report - Oct 2024.pdf", date: "Oct 20, 2024" },
    { name: "X-Ray Chest - Sep 2024.pdf", date: "Sep 12, 2024" },
  ],
  vitals: {
    bloodPressure: "128/82",
    heartRate: "72 bpm",
    temperature: "98.6°F",
    weight: "185 lbs",
  },
};

export default function PatientProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${patientData.name} | Doctor Portal`;
  }, []);

  return (
    <DashboardLayout pageTitle="Patient Profile">
      {/* Back Button */}
      <button
        onClick={() => navigate("/patients")}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back to Patients</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Details */}
        <div className="card-medical p-6">
          <div className="text-center mb-6">
            <div className="w-24 h-24 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="font-display font-semibold text-xl text-foreground">
              {patientData.name}
            </h3>
            <p className="text-muted-foreground">
              {patientData.age} years • {patientData.gender}
            </p>
            <span className="inline-block mt-2 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
              Blood Type: {patientData.bloodType}
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">DOB: {patientData.dateOfBirth}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{patientData.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{patientData.email}</span>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
              <span className="text-foreground">{patientData.address}</span>
            </div>
          </div>

          {/* Allergies */}
          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="font-semibold text-foreground mb-3">Allergies</h4>
            <div className="flex flex-wrap gap-2">
              {patientData.allergies.map((allergy, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-medium rounded-full"
                >
                  {allergy}
                </span>
              ))}
            </div>
          </div>

          <Button className="w-full mt-6 gradient-primary" onClick={() => navigate("/consultation")}>
            Start Consultation
          </Button>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Health Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card-medical p-4 text-center">
              <Heart className="w-6 h-6 text-destructive mx-auto mb-2" />
              <p className="text-xl font-bold text-foreground">{patientData.vitals.bloodPressure}</p>
              <p className="text-xs text-muted-foreground">Blood Pressure</p>
            </div>
            <div className="card-medical p-4 text-center">
              <Activity className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-xl font-bold text-foreground">{patientData.vitals.heartRate}</p>
              <p className="text-xs text-muted-foreground">Heart Rate</p>
            </div>
            <div className="card-medical p-4 text-center">
              <Thermometer className="w-6 h-6 text-warning mx-auto mb-2" />
              <p className="text-xl font-bold text-foreground">{patientData.vitals.temperature}</p>
              <p className="text-xs text-muted-foreground">Temperature</p>
            </div>
            <div className="card-medical p-4 text-center">
              <Weight className="w-6 h-6 text-success mx-auto mb-2" />
              <p className="text-xl font-bold text-foreground">{patientData.vitals.weight}</p>
              <p className="text-xs text-muted-foreground">Weight</p>
            </div>
          </div>

          {/* Medical History */}
          <div className="card-medical p-6">
            <h3 className="font-display font-semibold text-lg text-foreground mb-4">
              Medical History
            </h3>
            <ul className="space-y-3">
              {patientData.medicalHistory.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Previous Appointments */}
          <div className="card-medical p-6">
            <h3 className="font-display font-semibold text-lg text-foreground mb-4">
              Previous Appointments
            </h3>
            <div className="space-y-3">
              {patientData.appointments.map((apt, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/30"
                >
                  <div>
                    <p className="font-medium text-foreground">{apt.type}</p>
                    <p className="text-sm text-muted-foreground">{apt.doctor}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{apt.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div className="card-medical p-6">
            <h3 className="font-display font-semibold text-lg text-foreground mb-4">
              Documents & Attachments
            </h3>
            <div className="space-y-3">
              {patientData.documents.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <span className="font-medium text-foreground">{doc.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{doc.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
