import api from "@/lib/axios";

const examService = {
  getAllExams: async () => {
    try {
      const res = await api.get("/exams");
      return res.data;
    } catch (error) {
      console.error("Lỗi getAllExams tại examService: ", error);
      throw error;
    }
  },

  getExamById: async (id) => {
    try {
      const res = await api.get(`/exams/${id}`);
      return res.data;
    } catch (error) {
      console.error("Lỗi getExamById tại examService: ", error);
      throw error;
    }
  },
};

export default examService;
