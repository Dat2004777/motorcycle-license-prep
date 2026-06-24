import api from "@/lib/axios";

const historyService = {
  saveHistory: async (historyData) => {
    const {
      studentId,
      examId,
      examTitle,
      date,
      score,
      totalQuestions,
      isPassed,
      failedOnCritical,
      userAnswers,
    } = historyData;
    try {
      const res = await api.post("/histories/", {
        studentId,
        examId,
        examTitle,
        date,
        score,
        totalQuestions,
        isPassed,
        failedOnCritical,
        userAnswers,
      });
      return res.data;
    } catch (error) {
      console.error("Lỗi saveHistory tại historyService: ", error);
      throw error;
    }
  },
};

export default historyService;
