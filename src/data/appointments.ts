import { Patient } from "./patients";

export interface Appointment {
  id: number;
  patientId: number;
  patientName: string;
  date: string;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress' | 'no-show';
  duration: number;
  notes?: string;
  reason: string;
  patient?: Patient;
}

export const appointments: Appointment[] = [
  {
    id: 1,
    patientId: 1,
    patientName: "John Smith",
    date: "2024-12-15",
    time: "09:00",
    type: "Follow-up",
    status: "scheduled",
    duration: 30,
    reason: "Hypertension check-up",
    notes: "Needs BP medication adjustment"
  },
  {
    id: 2,
    patientId: 2,
    patientName: "Emma Johnson",
    date: "2024-12-15",
    time: "10:00",
    type: "New Patient",
    status: "scheduled",
    duration: 45,
    reason: "Initial diabetes consultation"
  },
  {
    id: 3,
    patientId: 3,
    patientName: "Michael Brown",
    date: "2024-12-15",
    time: "11:00",
    type: "Follow-up",
    status: "scheduled",
    duration: 30,
    reason: "Post-surgery check"
  },
  {
    id: 4,
    patientId: 4,
    patientName: "Sarah Davis",
    date: "2024-12-15",
    time: "14:00",
    type: "Follow-up",
    status: "scheduled",
    duration: 30,
    reason: "Heart rhythm check"
  },
  {
    id: 5,
    patientId: 5,
    patientName: "Robert Wilson",
    date: "2024-12-16",
    time: "09:30",
    type: "Follow-up",
    status: "scheduled",
    duration: 30,
    reason: "COPD management"
  },
  {
    id: 6,
    patientId: 6,
    patientName: "Emily Thompson",
    date: "2024-12-16",
    time: "10:30",
    type: "Follow-up",
    status: "scheduled",
    duration: 20,
    reason: "Asthma control check"
  },
  {
    id: 7,
    patientId: 7,
    patientName: "David Lee",
    date: "2024-12-16",
    time: "11:30",
    type: "Follow-up",
    status: "scheduled",
    duration: 30,
    reason: "Cholesterol recheck"
  },
  {
    id: 8,
    patientId: 8,
    patientName: "Jessica Martinez",
    date: "2024-12-17",
    time: "09:00",
    type: "Follow-up",
    status: "scheduled",
    duration: 30,
    reason: "Thyroid function test review"
  },
  {
    id: 9,
    patientId: 9,
    patientName: "William Taylor",
    date: "2024-12-17",
    time: "10:30",
    type: "Follow-up",
    status: "scheduled",
    duration: 30,
    reason: "Joint pain evaluation"
  },
  {
    id: 10,
    patientId: 10,
    patientName: "Amanda White",
    date: "2024-12-17",
    time: "14:00",
    type: "Follow-up",
    status: "scheduled",
    duration: 45,
    reason: "Migraine treatment review"
  }
];

export const getAppointmentsByDate = (date: string): Appointment[] => {
  return appointments.filter(apt => apt.date === date);
};

export const getUpcomingAppointments = (limit = 5): Appointment[] => {
  const today = new Date().toISOString().split('T')[0];
  return appointments
    .filter(apt => apt.date >= today)
    .sort((a, b) => {
      if (a.date === b.date) {
        return a.time.localeCompare(b.time);
      }
      return a.date.localeCompare(b.date);
    })
    .slice(0, limit);
};
