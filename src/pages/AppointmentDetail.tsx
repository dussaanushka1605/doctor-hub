import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Calendar,
  Clock,
  FileText,
  Activity,
  Stethoscope,
  Phone,
  Mail,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";

const appointmentData = {
  id: 1,
  patientName: "John Smith",
  patientAge: 45,
  patientGender: "Male",
  patientPhone: "+1 (555) 123-4567",
  patientEmail: "john.smith@email.com",
  date: "December 8, 2024",
  time: "09:00 AM",
  type: "General Checkup",
  status: "upcoming",
  symptoms: "Persistent headache, mild fever, fatigue",
  medicalHistory: "Hypertension (controlled), Type 2 Diabetes, Previous cardiac event (2020)",
  pastConsultations: [
    { date: "Nov 15, 2024", doctor: "Dr. Sarah Wilson", notes: "Routine follow-up, BP stable" },
    { date: "Oct 20, 2024", doctor: "Dr. Sarah Wilson", notes: "Medication adjustment for diabetes" },
    { date: "Sep 5, 2024", doctor: "Dr. James Lee", notes: "Annual cardiac check, ECG normal" },
  ],
};

export default function AppointmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Appointment Details | Doctor Portal";
  }, []);

  return (
    <DashboardLayout pageTitle="Appointment Details">
      {/* Back Button */}
      <button
        onClick={() => navigate("/appointments")}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back to Appointments</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Info */}
        <div className="card-medical p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center">
              <User className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg text-foreground">
                {appointmentData.patientName}
              </h3>
              <p className="text-sm text-muted-foreground">
                {appointmentData.patientAge} years • {appointmentData.patientGender}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{appointmentData.patientPhone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{appointmentData.patientEmail}</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="font-semibold text-foreground mb-3">Appointment Info</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-foreground">{appointmentData.date}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-foreground">{appointmentData.time}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Stethoscope className="w-4 h-4 text-primary" />
                <span className="text-foreground">{appointmentData.type}</span>
              </div>
            </div>
          </div>

          <Button
            className="w-full mt-6 gradient-primary"
            onClick={() => navigate(`/consultation/${id}`)}
          >
            Start Consultation
          </Button>
        </div>

        {/* Medical History & Symptoms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Symptoms */}
          <div className="card-medical p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground">
                Symptoms / Reason for Visit
              </h3>
            </div>
            <p className="text-foreground leading-relaxed">{appointmentData.symptoms}</p>
          </div>

          {/* Medical History */}
          <div className="card-medical p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-warning" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground">
                Medical History
              </h3>
            </div>
            <p className="text-foreground leading-relaxed">{appointmentData.medicalHistory}</p>
          </div>

          {/* Past Consultations */}
          <div className="card-medical p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground">
                Past Consultations
              </h3>
            </div>
            <div className="space-y-4">
              {appointmentData.pastConsultations.map((consultation, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-secondary/30 border border-border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">{consultation.date}</span>
                    <span className="text-sm text-muted-foreground">{consultation.doctor}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{consultation.notes}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
