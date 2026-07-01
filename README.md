# Motorcycle License Prep Application

A web-based application designed to help users prepare for the Vietnamese motorcycle driver's license (A1/A2) theory exam. The application supports user authentication, mock test attempts under time constraints (incorporating critical question fail conditions), performance tracking, exam history logs, and a comprehensive administrator dashboard for managing mock exams and the question bank.

---

## 🚀 Tech Stack

### Frontend
- **Framework & Tooling**: [React 19](https://react.dev/) + [Vite 8](https://vite.dev/) + [React Router v8](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (using the official `@tailwindcss/vite` plugin)
- **UI Components & Icons**: [Shadcn UI](https://ui.shadcn.com/) (built with Base UI / Radix primitives), [Lucide React](https://lucide.dev/) (icons), and [Sonner](https://react-sonner.js.org/) (toasts)
- **State Management**: React Context (`AuthContext` for session state) + Custom Hooks
- **HTTP Client**: [Axios](https://axios-http.com/)

### Backend (Mock Database)
- **Server**: [json-server](https://github.com/typicode/json-server) (watching `database.json` on port 3000 to provide a full REST API wrapper)

---

## 📁 Folder Structure

```text
assignment/
├── database.json          # Mock JSON database schema (users, questions, tests, histories)
├── package.json           # Project dependencies, scripts, and details
├── vite.config.js         # Vite configuration with Tailwind CSS v4 integration
├── components.json        # Shadcn UI configuration file
├── public/                # Static public assets
└── src/
    ├── assets/            # App assets (images, logos, etc.)
    ├── components/        # Reusable React components
    │   ├── layouts/       # Shared layout components (Header, AdminSidebar, ExamHeader)
    │   ├── ui/            # Shadcn UI elements (Button, Card, Badge, Dialog, Select, etc.)
    │   ├── exam/          # Exam-specific UI (ExamAnswerItem, ExamDialog)
    │   ├── question/      # Question management elements (QuestionTable, QuestionFilter)
    │   └── test/          # Test management tables/renders
    ├── context/           # React Context providers (AuthContext for user login states)
    ├── hooks/             # Custom React hooks (useAuth, useExam, useQuestion, useHistory)
    ├── lib/               # Utilities, Axios instances, and configuration helpers
    │   ├── axios.js       # Base Axios instance configured with a localhost:3000 URL prefix
    │   ├── data.js        # Static data and category configurations
    │   └── utils.js       # Utility scripts (class mergers, time formatters, translations)
    ├── pages/             # Route-level page screens
    │   ├── admin/         # Admin dashboard pages
    │   │   ├── question/  # Question pool dashboard, create, and update forms
    │   │   └── test/      # Test sets dashboard, create, and update forms
    │   ├── auth/          # Authentication pages (LoginPage, RegisterPage)
    │   └── user/          # User-facing pages (HomePage, ExamTestPage, HistoryPage, HistoryDetailPage)
    ├── services/          # Services communicating with the json-server backend
    ├── App.jsx            # Main Router setup with React Router Routes
    ├── main.jsx           # React app mount and entry point
    └── index.css          # Tailwind CSS global styles and configurations
```

---

## ✨ Features

### 👤 User Panel
- **Authentication**: Account registration and login. Session persistence via browser `LocalStorage`.
- **Practice Test Dashboard**: Browse through existing mock tests or take a randomized exam.
- **Realistic Exam Interface**:
  - **10-minute Timer** (600 seconds) automatic countdown.
  - Navigation grid allowing users to easily jump between questions.
  - **Critical Questions Rule**: If a user answers any critical question incorrectly, the exam immediately results in a **Fail**, regardless of the overall score (simulating real-world A1/A2 exam rules in Vietnam).
  - Passing Criteria: Score $\ge$ 7/10 AND 0 incorrect answers on critical questions.
- **Exam History Logs**: View all past exam details, scores, dates, status (Passed/Failed), and warnings if failed on critical questions.
- **Detailed Exam Review**: Review completed exams question-by-question to see correct options versus your selected choices.

### 🔑 Admin Dashboard
- **Question Bank Management (CRUD)**:
  - Add, read, update, and delete questions.
  - Configure question content, options (A, B, C, D), correct option, category classification, and toggles for critical status.
  - Filter questions by categories (Concepts, Signs, Shapes) and critical flags.
  - Instant text-search on question contents.
- **Mock Test Management (CRUD)**:
  - Add, read, update, and delete mock test sets.
  - Choose and select specific questions from the pool to form custom-tailored test structures.

---

## 🛠️ Setup & Running the Project

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version 18+ is recommended).

### 1. Install dependencies
Navigate to the root project folder in your terminal and execute:
```bash
npm install
```

### 2. Run the Mock Backend Server
This project relies on `json-server` to mock REST endpoints and update database logs in `database.json`. Run this command in a separate terminal tab:
```bash
npm run server
```
The API server will run at [http://localhost:3000](http://localhost:3000).

### 3. Run the Frontend React Application
In another terminal tab, start the Vite development server:
```bash
npm run dev
```
The application will launch. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔒 Mock Test Accounts
You can access the system using the pre-configured accounts in `database.json`:

| Role | Username | Password | Full Name |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin` | `admin` | Nguyễn Thành Đạt |
| **User** | `user` | `user` | Nguyễn Thành Đạt |

---
