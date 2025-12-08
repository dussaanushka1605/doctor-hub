import { Patient } from "./patients";

export interface Medication {
  id: number;
  name: string;
  genericName: string;
  dosage: string;
  form: string;
  manufacturer: string;
  description: string;
  category: string;
}

export interface Prescription {
  id: number;
  patientId: number;
  medicationId: number;
  datePrescribed: string;
  instructions: string;
  refills: number;
  status: 'active' | 'completed' | 'cancelled' | 'expired';
  startDate: string;
  endDate?: string;
  prescribedBy: string;
  notes?: string;
  patient?: Patient;
  medication?: Medication;
}

export const medications: Medication[] = [
  {
    id: 1,
    name: "Lisinopril",
    genericName: "Lisinopril",
    dosage: "10mg",
    form: "Tablet",
    manufacturer: "Various",
    description: "ACE inhibitor used to treat high blood pressure and heart failure.",
    category: "Hypertension"
  },
  {
    id: 2,
    name: "Hydrochlorothiazide",
    genericName: "Hydrochlorothiazide",
    dosage: "12.5mg",
    form: "Tablet",
    manufacturer: "Various",
    description: "Thiazide diuretic used to treat high blood pressure and fluid retention.",
    category: "Hypertension"
  },
  {
    id: 3,
    name: "Amlodipine",
    genericName: "Amlodipine Besylate",
    dosage: "5mg",
    form: "Tablet",
    manufacturer: "Various",
    description: "Calcium channel blocker used to treat high blood pressure and chest pain.",
    category: "Hypertension"
  },
  {
    id: 4,
    name: "Metformin",
    genericName: "Metformin HCl",
    dosage: "500mg",
    form: "Tablet",
    manufacturer: "Various",
    description: "Oral diabetes medicine that helps control blood sugar levels.",
    category: "Diabetes"
  },
  {
    id: 5,
    name: "Atorvastatin",
    genericName: "Atorvastatin Calcium",
    dosage: "40mg",
    form: "Tablet",
    manufacturer: "Pfizer",
    description: "Statin medication used to lower cholesterol and reduce the risk of heart disease.",
    category: "Cholesterol"
  },
  {
    id: 6,
    name: "Clopidogrel",
    genericName: "Clopidogrel Bisulfate",
    dosage: "75mg",
    form: "Tablet",
    manufacturer: "Various",
    description: "Anti-platelet drug used to prevent blood clots.",
    category: "Cardiovascular"
  },
  {
    id: 7,
    name: "Metoprolol",
    genericName: "Metoprolol Succinate",
    dosage: "25mg",
    form: "Extended-release tablet",
    manufacturer: "Various",
    description: "Beta-blocker used to treat high blood pressure and prevent heart attacks.",
    category: "Hypertension"
  },
  {
    id: 8,
    name: "Albuterol",
    genericName: "Albuterol Sulfate",
    dosage: "90mcg/actuation",
    form: "Inhalation aerosol",
    manufacturer: "Various",
    description: "Bronchodilator used to treat or prevent bronchospasm in people with asthma or COPD.",
    category: "Respiratory"
  },
  {
    id: 9,
    name: "Levothyroxine",
    genericName: "Levothyroxine Sodium",
    dosage: "50mcg",
    form: "Tablet",
    manufacturer: "Various",
    description: "Thyroid hormone used to treat hypothyroidism.",
    category: "Endocrine"
  },
  {
    id: 10,
    name: "Sertraline",
    genericName: "Sertraline HCl",
    dosage: "50mg",
    form: "Tablet",
    manufacturer: "Various",
    description: "SSRI antidepressant used to treat depression, anxiety, and other mood disorders.",
    category: "Mental Health"
  }
];

export const prescriptions: Prescription[] = [
  {
    id: 1,
    patientId: 1,
    medicationId: 1,
    datePrescribed: "2024-11-15",
    instructions: "Take 1 tablet by mouth once daily in the morning",
    refills: 3,
    status: "active",
    startDate: "2024-11-15",
    endDate: "2025-02-15",
    prescribedBy: "Dr. Sarah Johnson",
    notes: "Monitor blood pressure regularly. Report any persistent dry cough."
  },
  {
    id: 2,
    patientId: 1,
    medicationId: 2,
    datePrescribed: "2024-11-15",
    instructions: "Take 1 tablet by mouth once daily in the morning with food",
    refills: 2,
    status: "active",
    startDate: "2024-11-15",
    endDate: "2025-01-15",
    prescribedBy: "Dr. Sarah Johnson",
    notes: "Take in the morning to avoid nighttime urination. Report dizziness or muscle cramps."
  },
  {
    id: 3,
    patientId: 1,
    medicationId: 3,
    datePrescribed: "2024-09-05",
    instructions: "Take 1 tablet by mouth once daily in the evening",
    refills: 0,
    status: "completed",
    startDate: "2024-09-05",
    endDate: "2024-11-15",
    prescribedBy: "Dr. Sarah Johnson",
    notes: "Discontinued on 11/15/2024 - replaced with Lisinopril"
  },
  {
    id: 4,
    patientId: 2,
    medicationId: 4,
    datePrescribed: "2024-11-20",
    instructions: "Take 1 tablet by mouth twice daily with meals",
    refills: 5,
    status: "active",
    startDate: "2024-11-20",
    endDate: "2025-05-20",
    prescribedBy: "Dr. Sarah Johnson",
    notes: "Start with one tablet daily for first week, then increase to twice daily. Monitor blood sugar levels."
  },
  {
    id: 5,
    patientId: 3,
    medicationId: 5,
    datePrescribed: "2024-10-15",
    instructions: "Take 1 tablet by mouth at bedtime",
    refills: 11,
    status: "active",
    startDate: "2024-10-15",
    endDate: "2025-10-15",
    prescribedBy: "Dr. Michael Chen",
    notes: "Routine cholesterol management. Report any muscle pain or weakness."
  },
  {
    id: 6,
    patientId: 3,
    medicationId: 6,
    datePrescribed: "2024-10-10",
    instructions: "Take 1 tablet by mouth once daily in the morning",
    refills: 5,
    status: "active",
    startDate: "2024-10-10",
    endDate: "2025-04-10",
    prescribedBy: "Dr. Michael Chen",
    notes: "Post-CABG medication. Do not stop without consulting your doctor."
  },
  {
    id: 7,
    patientId: 3,
    medicationId: 7,
    datePrescribed: "2024-10-10",
    instructions: "Take 1 tablet by mouth twice daily",
    refills: 5,
    status: "active",
    startDate: "2024-10-10",
    endDate: "2025-04-10",
    prescribedBy: "Dr. Michael Chen",
    notes: "Heart rate control. Monitor heart rate and blood pressure."
  },
  {
    id: 8,
    patientId: 6,
    medicationId: 8,
    datePrescribed: "2024-11-25",
    instructions: "Inhale 1-2 puffs every 4-6 hours as needed for wheezing or shortness of breath",
    refills: 2,
    status: "active",
    startDate: "2024-11-25",
    endDate: "2025-02-25",
    prescribedBy: "Dr. Sarah Johnson",
    notes: "Rescue inhaler for asthma. Use before exercise if needed."
  },
  {
    id: 9,
    patientId: 8,
    medicationId: 9,
    datePrescribed: "2024-10-01",
    instructions: "Take 1 tablet by mouth every morning on an empty stomach, 30-60 minutes before breakfast",
    refills: 5,
    status: "active",
    startDate: "2024-10-01",
    endDate: "2025-04-01",
    prescribedBy: "Dr. Sarah Johnson",
    notes: "For hypothyroidism. Take consistently at the same time each day."
  },
  {
    id: 10,
    patientId: 10,
    medicationId: 10,
    datePrescribed: "2024-11-10",
    instructions: "Take 1 tablet by mouth once daily in the morning with or without food",
    refills: 2,
    status: "active",
    startDate: "2024-11-10",
    endDate: "2025-02-10",
    prescribedBy: "Dr. Sarah Johnson",
    notes: "For anxiety. May take 2-4 weeks to feel full effect. Avoid alcohol."
  }
];

export const getPrescriptionsByPatientId = (patientId: number): Prescription[] => {
  return prescriptions
    .filter(prescription => prescription.patientId === patientId)
    .map(prescription => ({
      ...prescription,
      medication: medications.find(med => med.id === prescription.medicationId)
    }))
    .sort((a, b) => new Date(b.datePrescribed).getTime() - new Date(a.datePrescribed).getTime());
};

export const getActivePrescriptions = (patientId: number): Prescription[] => {
  return getPrescriptionsByPatientId(patientId)
    .filter(prescription => prescription.status === 'active');
};

export const getPrescriptionById = (id: number): (Prescription & { medication?: Medication }) | undefined => {
  const prescription = prescriptions.find(p => p.id === id);
  if (!prescription) return undefined;
  
  return {
    ...prescription,
    medication: medications.find(med => med.id === prescription.medicationId)
  };
};
