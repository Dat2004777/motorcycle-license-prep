import { Routes, Route } from "react-router";
import HomePage from "./pages/user/HomePage";
import HistoryPage from "./pages/user/HistoryPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import AdminQuestionsPage from "./pages/admin/AdminQuestionsPage";
import AdminQuestionCreatePage from "./pages/admin/AdminQuestionCreatePage";
import AdminQuestionUpdatePage from "./pages/admin/AdminQuestionUpdatePage";
import ExamTest from "./pages/user/ExamTest";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/history" element={<HistoryPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/exam-test/:examId" element={<ExamTest />} />

        <Route path="/admin/questions" element={<AdminQuestionsPage />} />
        <Route
          path="/admin/questions/create"
          element={<AdminQuestionCreatePage />}
        />
        <Route
          path="/admin/questions/update/:questionId"
          element={<AdminQuestionUpdatePage />}
        />
      </Routes>
    </>
  );
}

export default App;
