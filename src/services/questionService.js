import api from "@/lib/axios";

const questionService = {
  getAllQuestions: async () => {
    try {
      const res = await api.get(`/questions/`);
      return res.data;
    } catch (error) {
      console.error("Lỗi getAllQuestions tại questionService: ", error);
      throw error;
    }
  },

  getAllCategories: async () => {
    try {
      const res = await api.get(`/categories`);
      return res.data;
    } catch (error) {
      console.error("Lỗi getAllCategories tại questionService: ", error);
      throw error;
    }
  },

  addQuestion: async (questionData) => {
    const { questionText, category, isCritical, options, correctOption } =
      questionData;

    try {
      const res = await api.post("/questions/", {
        questionText,
        category,
        isCritical,
        options,
        correctOption,
      });
      return res.data;
    } catch (error) {
      console.error("Lỗi addQuestion tại questionService: ", error);
      throw error;
    }
  },

  deleteQuestion: async (questionId) => {
    try {
      const res = await api.delete(`/questions/${questionId}`);
      return res.data;
    } catch (error) {
      console.log("Lỗi deleteQuestion tại questionService: ", error);
      throw error;
    }
  },

  getQuestionById: async (questionId) => {
    try {
      const res = await api.get(`/questions/${questionId}`);
      return res.data;
    } catch (error) {
      console.log("Lỗi getQuestionById tại questionService: ", error);
      throw error;
    }
  },

  updateQuestion: async (questionId, questionData) => {
    const { questionText, category, isCritical, options, correctOption } =
      questionData;

    try {
      const res = await api.put(`/questions/${questionId}`, {
        questionText,
        category,
        isCritical,
        options,
        correctOption,
      });
      return res.data;
    } catch (error) {
      console.log("Lỗi updateQuestion tại questionService: ", error);
      throw error;
    }
  },
};

export default questionService;
