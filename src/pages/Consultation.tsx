import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, FileText, Upload, Save, Printer, Pill, Activity, Heart, Thermometer } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Dialog } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { appointments } from "@/data/appointments";
import { patients } from "@/data/patients";
import { getConsultationsByPatientId } from "@/data/consultations";
import { medications } from "@/data/prescriptions";
import PrescriptionModal from "@/components/PrescriptionModal";

type Vitals = {
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  respRate: string;
  spo2: string;
  weight: string;
};

type PrescriptionItem = {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
};

type FormState = {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  vitals: Vitals;
  attachments: { name: string; size: number }[];
  prescriptions: PrescriptionItem[];
  patientId?: number;
};

type Action =
  | { type: "set_field"; field: keyof FormState; value: FormState[keyof FormState] }
  | { type: "set_vitals"; field: keyof Vitals; value: string }
  | { type: "add_attachment"; file: { name: string; size: number } }
  | { type: "remove_attachment"; index: number }
  | { type: "add_prescription"; item: PrescriptionItem }
  | { type: "remove_prescription"; index: number }
  | { type: "hydrate"; payload: Partial<FormState> };

function reducer(state: FormState, action: Action): FormState {
  if (action.type === "set_field") return { ...state, [action.field]: action.value };
  if (action.type === "set_vitals") return { ...state, vitals: { ...state.vitals, [action.field]: action.value } };
  if (action.type === "add_attachment") return { ...state, attachments: [...state.attachments, action.file] };
  if (action.type === "remove_attachment") return { ...state, attachments: state.attachments.filter((_, i) => i !== action.index) };
  if (action.type === "add_prescription") return { ...state, prescriptions: [...state.prescriptions, action.item] };
  if (action.type === "remove_prescription") return { ...state, prescriptions: state.prescriptions.filter((_, i) => i !== action.index) };
  if (action.type === "hydrate") return { ...state, ...action.payload, vitals: { ...state.vitals, ...(action.payload.vitals || {}) } };
  return state;
}

export default function Consultation() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPrescOpen, setIsPrescOpen] = useState(false);
  const [validation, setValidation] = useState<{ subjective?: string; objective?: string; assessment?: string }>({});

  const [state, dispatch] = useReducer(reducer, {
    subjective: "",
    objective: "",
    assessment: "",
    plan: "",
    vitals: { bloodPressure: "", heartRate: "", temperature: "", respRate: "", spo2: "", weight: "" },
    attachments: [],
    prescriptions: [],
    patientId: undefined,
  });

  const draftKey = useMemo(() => `consultation-draft-${appointmentId || "new"}`, [appointmentId]);

  const appointment = useMemo(() => {
    if (!appointmentId) return undefined;
    const idNum = Number(appointmentId);
    if (Number.isNaN(idNum)) return undefined;
    return appointments.find((a) => a.id === idNum);
  }, [appointmentId]);

  const patient = useMemo(() => {
    const pid = appointment?.patientId ?? state.patientId;
    if (!pid) return undefined;
    return patients.find((p) => p.id === pid);
  }, [appointment?.patientId, state.patientId]);

  useEffect(() => {
    document.title = "Consultation | Doctor Portal";
  }, []);

  useEffect(() => {
    const raw = localStorage.getItem(draftKey);
    if (raw) {
      try {
        const parsed: FormState = JSON.parse(raw);
        dispatch({ type: "hydrate", payload: parsed });
      } catch {
        localStorage.removeItem(draftKey);
      }
    } else if (appointment?.patientId) {
      dispatch({ type: "set_field", field: "patientId", value: appointment.patientId });
    }
  }, [draftKey, appointment?.patientId]);

  const handleSaveDraft = useCallback(() => {
    setIsSaving(true);
    localStorage.setItem(draftKey, JSON.stringify(state));
    setTimeout(() => {
      setIsSaving(false);
      toast({ title: "Draft Saved", description: "Consultation draft saved locally." });
    }, 600);
  }, [draftKey, state, toast]);

  const handleSubmit = useCallback(async () => {
    const errs: typeof validation = {};
    if (!state.subjective && !state.objective) errs.subjective = "Required";
    if (!state.assessment) errs.assessment = "Required";
    setValidation(errs);
    if (Object.keys(errs).length) {
      toast({ title: "Validation Error", description: "Please fill required fields.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    toast({ title: "Consultation Submitted", description: "Consultation saved successfully." });
    localStorage.removeItem(draftKey);
    setIsSubmitting(false);
  }, [draftKey, state.assessment, state.objective, state.subjective, toast]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        handleSaveDraft();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleSaveDraft, handleSubmit]);

  const recentConsultations = useMemo(() => {
    if (!patient?.id) return [] as ReturnType<typeof getConsultationsByPatientId>;
    return getConsultationsByPatientId(patient.id);
  }, [patient?.id]);

  

  const onFileChoose = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((f) => dispatch({ type: "add_attachment", file: { name: f.name, size: f.size } }));
  };

  return (
    <DashboardLayout pageTitle="Consultation">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Go back">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/appointments">Appointments</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Consultation{appointmentId ? ` #${appointmentId}` : ""}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-2 print:hidden">
          <Button variant="outline" onClick={handleSaveDraft} aria-label="Save draft" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Draft"}
          </Button>
          <Button className="gradient-primary" onClick={handleSubmit} aria-label="Submit consultation" disabled={isSubmitting}>
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? "Submitting..." : "Submit Consultation"}
          </Button>
          <Button variant="outline" onClick={() => window.print()} aria-label="Print consultation">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="card-medical p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center">
                  <span className="text-xl font-semibold text-foreground">{(patient?.name || "Patient").split(" ").map((n) => n[0]).join("")}</span>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-foreground">{patient?.name || "Select Patient"}</h3>
                  <p className="text-sm text-muted-foreground">
                    {patient ? `${patient.age} years • ${patient.gender}` : "No patient selected"}
                  </p>
                </div>
              </div>
              <Badge variant="secondary">Active Consultation</Badge>
            </div>
            {!patient && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patient" className="mb-2 block">Patient</Label>
                  <Select value={state.patientId ? String(state.patientId) : undefined} onValueChange={(v) => dispatch({ type: "set_field", field: "patientId", value: Number(v) })}>
                    <SelectTrigger aria-label="Select patient">
                      <SelectValue placeholder="Choose patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((p) => (
                        <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="card-medical p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">Subjective</h3>
                  <p className="text-sm text-muted-foreground">Patient reported symptoms</p>
                </div>
              </div>
              <Textarea aria-label="Subjective notes" placeholder="Describe patient-reported symptoms" value={state.subjective} onChange={(e) => dispatch({ type: "set_field", field: "subjective", value: e.target.value })} className="min-h-[120px] resize-none" />
              {validation.subjective && <p className="text-destructive text-xs mt-2">{validation.subjective}</p>}
            </div>

            <div className="card-medical p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">Objective</h3>
                  <p className="text-sm text-muted-foreground">Exam findings and vitals</p>
                </div>
              </div>
              <Textarea aria-label="Objective notes" placeholder="Enter exam findings" value={state.objective} onChange={(e) => dispatch({ type: "set_field", field: "objective", value: e.target.value })} className="min-h-[120px] resize-none" />
            </div>

            <div className="card-medical p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">Assessment</h3>
                  <p className="text-sm text-muted-foreground">Diagnosis</p>
                </div>
              </div>
              <Textarea aria-label="Assessment" placeholder="Enter diagnosis" value={state.assessment} onChange={(e) => dispatch({ type: "set_field", field: "assessment", value: e.target.value })} className="min-h-[100px] resize-none" />
              {validation.assessment && <p className="text-destructive text-xs mt-2">{validation.assessment}</p>}
            </div>

            <div className="card-medical p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-medical-purple/10 flex items-center justify-center">
                  <Pill className="w-5 h-5 text-medical-purple" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">Plan</h3>
                  <p className="text-sm text-muted-foreground">Treatment plan and next steps</p>
                </div>
              </div>
              <Textarea aria-label="Plan" placeholder="Enter treatment plan and follow-up" value={state.plan} onChange={(e) => dispatch({ type: "set_field", field: "plan", value: e.target.value })} className="min-h-[100px] resize-none" />
              <div className="mt-4">
                <Button variant="outline" onClick={() => setIsPrescOpen(true)} aria-label="Add prescription">Quick Prescription</Button>
              </div>
              {state.prescriptions.length > 0 && (
                <div className="mt-4 space-y-2">
                  {state.prescriptions.map((p, i) => (
                    <div key={i} className="flex items-start justify-between p-3 rounded-lg bg-secondary/40">
                      <div>
                        <p className="font-medium text-foreground">{p.name} • {p.dosage}</p>
                        <p className="text-xs text-muted-foreground">{p.frequency} • {p.duration}</p>
                        {p.instructions && <p className="text-xs text-muted-foreground mt-1">{p.instructions}</p>}
                      </div>
                      <Button variant="ghost" onClick={() => dispatch({ type: "remove_prescription", index: i })}>Remove</Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="card-medical p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Thermometer className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">Vitals</h3>
                  <p className="text-sm text-muted-foreground">Enter vital signs</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="bp">Blood Pressure</Label>
                  <Input id="bp" aria-label="Blood Pressure" placeholder="120/80 mmHg" value={state.vitals.bloodPressure} onChange={(e) => dispatch({ type: "set_vitals", field: "bloodPressure", value: e.target.value })} />
                  <p className="text-xs text-muted-foreground mt-1">mmHg</p>
                </div>
                <div>
                  <Label htmlFor="hr">Heart Rate</Label>
                  <Input id="hr" aria-label="Heart Rate" placeholder="72 bpm" value={state.vitals.heartRate} onChange={(e) => dispatch({ type: "set_vitals", field: "heartRate", value: e.target.value })} />
                  <p className="text-xs text-muted-foreground mt-1">bpm</p>
                </div>
                <div>
                  <Label htmlFor="temp">Temperature</Label>
                  <Input id="temp" aria-label="Temperature" placeholder="98.6 °F" value={state.vitals.temperature} onChange={(e) => dispatch({ type: "set_vitals", field: "temperature", value: e.target.value })} />
                  <p className="text-xs text-muted-foreground mt-1">°F</p>
                </div>
                <div>
                  <Label htmlFor="rr">Resp Rate</Label>
                  <Input id="rr" aria-label="Respiratory Rate" placeholder="16 rpm" value={state.vitals.respRate} onChange={(e) => dispatch({ type: "set_vitals", field: "respRate", value: e.target.value })} />
                  <p className="text-xs text-muted-foreground mt-1">rpm</p>
                </div>
                <div>
                  <Label htmlFor="spo2">SpO2</Label>
                  <Input id="spo2" aria-label="SpO2" placeholder="98 %" value={state.vitals.spo2} onChange={(e) => dispatch({ type: "set_vitals", field: "spo2", value: e.target.value })} />
                  <p className="text-xs text-muted-foreground mt-1">%</p>
                </div>
                <div>
                  <Label htmlFor="wt">Weight</Label>
                  <Input id="wt" aria-label="Weight" placeholder="185 lbs" value={state.vitals.weight} onChange={(e) => dispatch({ type: "set_vitals", field: "weight", value: e.target.value })} />
                  <p className="text-xs text-muted-foreground mt-1">lbs</p>
                </div>
              </div>
            </div>

            <div className="card-medical p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-medical-teal/10 flex items-center justify-center">
                  <Upload className="w-5 h-5 text-medical-teal" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">Attachments</h3>
                  <p className="text-sm text-muted-foreground">Upload relevant files</p>
                </div>
              </div>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <Upload className="w-7 h-7 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Click to choose files</p>
                <input ref={fileInputRef} type="file" className="hidden" multiple onChange={(e) => onFileChoose(e.target.files)} />
              </div>
              {state.attachments.length > 0 && (
                <div className="mt-4 space-y-2">
                  {state.attachments.map((f, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/40">
                      <div className="text-sm text-foreground">{f.name}</div>
                      <Button variant="ghost" onClick={() => dispatch({ type: "remove_attachment", index: i })}>Remove</Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 print:hidden">
              <Button variant="outline" onClick={() => navigate(-1)} aria-label="Cancel">Cancel</Button>
              <Button className="gradient-primary" onClick={handleSubmit} aria-label="Submit" disabled={isSubmitting}>
                <Save className="w-4 h-4 mr-2" />
                {isSubmitting ? "Submitting..." : "Submit Consultation"}
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-medical p-6">
            <h3 className="font-display font-semibold text-foreground mb-4">Recent Consultations</h3>
            <div className="space-y-3 max-h-80 overflow-auto scrollbar-thin">
              {recentConsultations.length === 0 && <p className="text-sm text-muted-foreground">No recent consultations</p>}
              {recentConsultations.map((c) => (
                <div key={c.id} className="p-3 rounded-lg bg-secondary/40">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{c.date}</span>
                    <Badge variant="outline">{c.diagnosis}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{c.notes.slice(0, 160)}{c.notes.length > 160 ? "..." : ""}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-medical p-6">
            <h3 className="font-display font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={() => toast({ title: "Follow-up Added", description: "Follow-up noted." })}>Add follow-up</Button>
              <Button variant="outline" onClick={() => toast({ title: "Marked Urgent", description: "Consultation flagged as urgent." })}>Mark as urgent</Button>
              <Button variant="outline" onClick={() => toast({ title: "Note Added", description: "Additional note recorded." })} className="col-span-2">Add note</Button>
            </div>
          </div>

          <div className="card-medical p-6">
            <h3 className="font-display font-semibold text-foreground mb-4">Quick Prescriptions</h3>
            <Button onClick={() => setIsPrescOpen(true)} aria-label="Open prescription modal">Add Prescription</Button>
          </div>
        </div>
      </div>

      <Dialog open={isPrescOpen} onOpenChange={setIsPrescOpen}>
        <PrescriptionModal
          onSave={(item) => {
            dispatch({ type: "add_prescription", item });
            setIsPrescOpen(false);
            toast({ title: "Prescription Added", description: item.name });
          }}
          medications={medications.map((m) => m.name)}
        />
      </Dialog>

      <style>{`@media print{header,nav,.print:hidden{display:none!important} body{background:white} .card-medical{box-shadow:none;border-color:#ddd}}`}</style>
    </DashboardLayout>
  );
}
