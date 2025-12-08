📘 Doctor Portal – Frontend Assignment

A fully responsive, modern, and feature-rich Doctor Portal built using React + TypeScript + Tailwind + ShadCN UI, based on the provided Figma design and assignment requirements.

This project implements all 10 required pages, uses a clean component architecture, includes dummy medical data, supports navigation, modals, SEO titles, and offers a polished UI/UX suitable for real-world healthcare applications.

🚀 Live Demo

(Replace with your deployed Vercel link)

👉 https://your-project.vercel.app

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
Earnings card
Quick actions

Fully responsive design

📅 Appointments & Details

List + search + filter

Status badges (Upcoming, Completed, In Progress)

Appointment detail panel

Patient info + history

👤 Patient Profile

Demographics

Medical history

Allergies, conditions

Appointment history

Documents section

Tabs: Overview / Appointments / Documents

📝 Consultation Page (Advanced)

Fully implemented SOAP notes

Vitals input (BP, HR, Temp, etc.)

Prescription creation modal

Save Draft → localStorage

Restore Draft → auto load

Submit Consultation

Keyboard shortcuts

Ctrl/Cmd + S → Save Draft

Ctrl/Cmd + Enter → Submit

Print mode

Validation + error messages

💊 Prescriptions

Active & past prescriptions

Add new prescription modal

Dummy medication data

💬 Messages

Inbox view

Left sidebar → conversations

Chat window

Chat bubbles

Scrollable area

Message input

🛠 Settings

Profile update

Notifications toggle

Password change

Billing placeholder section

🔐 Login Page

Email + password

Forgot password

Fully responsive and centered

Error states

🧱 Tech Stack
Frontend

React

TypeScript

React Router

Tailwind CSS

ShadCN UI Components

Lucide Icons

Development Tools

Vite

ESLint

Prettier

LocalStorage for persistent drafts

📊 Data Layer

Fake/sample data provided for:

Patients

Appointments

Consultation history

Prescriptions

Messages

All stored in /src/data/*.

🔍 SEO

Every page includes:

useEffect(() => {
  document.title = "Page Name | Doctor Portal";
}, []);

⚙️ Installation & Setup
1️⃣ Clone Repo
git clone https://github.com/your-repo-name.git
cd your-repo-name

2️⃣ Install Dependencies
npm install

3️⃣ Run Project
npm run dev

4️⃣ Build
npm run build

🚀 Deployment (Vercel)
npm run build
vercel


After deployment, add the final link to README.

🖼 Screenshots

Add the following (required for submission):

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

(You can add them by uploading PNGs into /screenshots folder.)

📌 Assignment Requirements – All Completed

✔ 10 pages
✔ Responsive UI
✔ Clean code
✔ Figma-style design
✔ SEO optimized
✔ No backend required
✔ LocalStorage for drafts
✔ Proper routing
✔ Popups, filters, tables
✔ Accessibility / ARIA
✔ Deployment ready

🙌 Thank You

This project showcases strong skills in:

UI/UX

Frontend architecture

Component design

State management

Healthcare UI design patterns

Code quality + TypeScript best practices