import { Patient } from "./patients";

export interface Consultation {
  id: number;
  patientId: number;
  date: string;
  diagnosis: string;
  symptoms: string[];
  notes: string;
  prescriptionIds: number[];
  followUpDate?: string;
  followUpNotes?: string;
  vitals: {
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    weight: number;
    height: number;
    bmi: number;
  };
  patient?: Patient;
}

export const consultations: Consultation[] = [
  {
    id: 1,
    patientId: 1,
    date: "2024-11-15",
    diagnosis: "Essential (primary) hypertension",
    symptoms: ["Elevated blood pressure", "Mild headache"],
    notes: "Patient reports occasional headaches. BP remains elevated despite current medication. Recommended lifestyle changes including reduced sodium intake and regular exercise. Will adjust medication and follow up in 4 weeks.",
    prescriptionIds: [1, 2],
    followUpDate: "2024-12-13",
    followUpNotes: "Schedule BP check and medication review",
    vitals: {
      bloodPressure: "142/92",
      heartRate: 78,
      temperature: 98.2,
      weight: 185,
      height: 70,
      bmi: 26.5
    }
  },
  {
    id: 2,
    patientId: 1,
    date: "2024-10-10",
    diagnosis: "Hypertension follow-up",
    symptoms: ["Occasional dizziness", "Mild fatigue"],
    notes: "Patient reports feeling better with current medication but experiences occasional dizziness. BP improved but still above target. Increased dosage of current medication. Advised to monitor BP at home twice daily.",
    prescriptionIds: [1],
    vitals: {
      bloodPressure: "138/88",
      heartRate: 72,
      temperature: 98.0,
      weight: 183,
      height: 70,
      bmi: 26.3
    }
  },
  {
    id: 3,
    patientId: 1,
    date: "2024-09-05",
    diagnosis: "Initial hypertension diagnosis",
    symptoms: ["Headaches", "Nosebleeds", "Shortness of breath"],
    notes: "Patient presents with persistent headaches and occasional nosebleeds. BP significantly elevated. Started on initial antihypertensive therapy. Ordered blood work to rule out secondary causes. Recommended low-sodium diet and regular exercise.",
    prescriptionIds: [3],
    followUpDate: "2024-10-10",
    vitals: {
      bloodPressure: "156/98",
      heartRate: 82,
      temperature: 98.4,
      weight: 187,
      height: 70,
      bmi: 26.8
    }
  },
  {
    id: 4,
    patientId: 2,
    date: "2024-11-20",
    diagnosis: "Type 2 Diabetes Mellitus",
    symptoms: ["Increased thirst", "Frequent urination", "Fatigue"],
    notes: "Newly diagnosed type 2 diabetes. Patient educated about condition, diet, and blood sugar monitoring. Started on metformin. Referred to diabetes education program.",
    prescriptionIds: [4],
    followUpDate: "2024-12-18",
    vitals: {
      bloodPressure: "130/84",
      heartRate: 76,
      temperature: 98.2,
      weight: 210,
      height: 66,
      bmi: 33.9
    }
  },
  {
    id: 5,
    patientId: 3,
    date: "2024-11-18",
    diagnosis: "Coronary artery disease, post-CABG",
    symptoms: ["Chest discomfort", "Shortness of breath"],
    notes: "Post-CABG follow-up. Patient reports improved exercise tolerance but occasional chest discomfort. Adjusted medications. Cardiac rehab progressing well. Will continue current treatment plan.",
    prescriptionIds: [5, 6, 7],
    followUpDate: "2025-01-15",
    vitals: {
      bloodPressure: "124/78",
      heartRate: 68,
      temperature: 98.1,
      weight: 195,
      height: 72,
      bmi: 26.4
    }
  }
];

export const getConsultationsByPatientId = (patientId: number): Consultation[] => {
  return consultations
    .filter(consult => consult.patientId === patientId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getConsultationById = (id: number): Consultation | undefined => {
  return consultations.find(consult => consult.id === id);
};
