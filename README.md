📘 Doctor Portal – Frontend Assignment
A fully responsive, modern, and feature-rich Doctor Portal built using React + TypeScript + TailwindCSS + ShadCN UI, based on the provided Figma design and assignment requirements.

This project implements all 10 required pages, follows a clean component architecture, uses well-structured dummy medical data, includes modals and filters, SEO page titles, responsive layouts, and delivers a polished real-world healthcare UI/UX.

🚀 Live Demo
👉 https://doctor-s-hub-main-dpxmtxbt6.vercel.app

🧠 Project Idea & Approach
Idea
I selected the Doctor Portal from the assignment options.
The objective was to build a complete doctor-facing dashboard with essential pages such as patient management, appointment workflow, consultation notes, messaging, and prescriptions.

Approach
Planned and designed 10 core pages based on the Figma flow.
Built reusable UI components (cards, tables, sidebar, topbar, buttons, modals).
Implemented clean routing with React Router.
Added mock data for patients, appointments, consultations, and messages.
Ensured responsiveness using Tailwind breakpoints.
Added SEO with document.title for every page.
Used LocalStorage for consultation draft saving.
Deployed the project on Vercel.

📂 Repository Structure
src/
 ├── components/
 │     ├── ui/ (buttons, inputs, cards, dialog, etc.)
 │     ├── Sidebar.tsx
 │     ├── Topbar.tsx
 │     ├── ChatBubble.tsx
 │     └── AppointmentCard.tsx
 ├── pages/
 │     ├── Login.tsx
 │     ├── Dashboard.tsx
 │     ├── Appointments.tsx
 │     ├── AppointmentDetail.tsx
 │     ├── Patients.tsx
 │     ├── PatientProfile.tsx
 │     ├── Consultation.tsx
 │     ├── Prescriptions.tsx
 │     ├── Messages.tsx
 │     └── Settings.tsx
 ├── data/
 │     ├── patients.ts
 │     ├── appointments.ts
 │     ├── consultations.ts
 │     ├── prescriptions.ts
 │     ├── messages.ts
 │     └── index.ts
 ├── routes/
 │     └── AppRoutes.tsx
 ├── App.tsx
 └── main.tsx

🧩 Features Implemented
✔ All 10 required pages
Login
Dashboard
Appointments
Appointment Details
Patients
Patient Profile
Consultation
Prescriptions
Messages
Settings

🧠 Key Functionalities
🏥 Dashboard
Today’s appointments
Patient statistics
Earnings summary
Quick actions
Fully responsive layout

📅 Appointments & Details
Appointment list with search and filters
Status badges (Upcoming / Completed / In Progress)
Appointment detail panel
Patient history integration

👤 Patient Profile
Demographics & contact details
Allergies, conditions, medical history
Appointment records
Documents section
Tabbed navigation (Overview / Appointments / Documents)

📝 Consultation (Advanced Page)
Full SOAP notes implementation
Vitals (BP, HR, Temp, etc.)
Prescription creation modal
Save Draft → stored in LocalStorage
Restore Draft → auto-loading
Submit consultation
Keyboard shortcuts:
  Ctrl/Cmd + S → Save Draft
  Ctrl/Cmd + Enter → Submit
Print-friendly mode
Inline validation + error states

💊 Prescriptions
Active & previous prescriptions
Add new prescription modal
Dummy medication list

💬 Messages
Inbox-style UI
Left conversation list
Main chat window
Chat bubbles
Scrollable message area

🛠 Settings
Profile edit
Notification preferences
Password change
Billing placeholder

🔐 Login Page
Email + password
Forgot password
Fully responsive
Error handling

🧱 Tech Stack
Frontend
React
TypeScript
React Router
TailwindCSS
ShadCN UI
Lucide Icons

Development Tools
Vite
ESLint
Prettier
LocalStorage for draft persistence

📊 Data Layer
Mock data for:
Patients
Appointments
Consultation notes
Prescriptions
Messages
Stored in /src/data/ for easy access and reusability.

🔍 SEO

All pages include:

useEffect(() => {
  document.title = "Page Name | Doctor Portal";
}, []);

⚙️ Installation & Setup
1️⃣ Clone Repo
git clone https://github.com/dussaanushka1605/doctor-hub.git
cd doctor-hub

2️⃣ Install Dependencies
npm install

3️⃣ Run Project
npm run dev

4️⃣ Build for Production
npm run build

🚀 Deployment (Vercel)
npm run build
vercel


The project is deployed at:
👉 https://doctor-s-hub-main-dpxmtxbt6.vercel.app

🖼 Screenshots (Optional)

You can add screenshots under:

/screenshots


Recommended screenshots:

Dashboard

Appointments

Appointment Detail

Patients

Patient Profile

Consultation

Prescriptions

Messages

Settings

Login

📌 Assignment Requirements – Completed

✔ 10 pages
✔ Responsive UI
✔ Clean code
✔ Figma-style design
✔ SEO optimized
✔ No backend required
✔ LocalStorage for drafts
✔ Proper routing
✔ Popups, filters, modals
✔ Accessibility (ARIA labels)
✔ Deployment completed

🙌 Thank You

This project demonstrates strong skills in:
UI/UX development
Frontend architecture
Component-based design
State management
Healthcare dashboard patterns
TypeScript best practices
Clean, scalable code
