import axios from "axios";

const questionService = {
  getAllQuestions: async () => {
    try {
      const res = await axios.get(`http://localhost:3000/questions/`);
      return res.data;
    } catch (error) {
      console.error("Lỗi getAllQuestions tại questionService: ", error);
      throw error;
    }
  },

  getAllCategories: async () => {
    try {
      const res = await axios.get(`http://localhost:3000/categories`);
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
      const res = await axios.post("http://localhost:3000/questions/", {
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
      const res = await axios.delete(
        `http://localhost:3000/questions/${questionId}`,
      );
      return res.data;
    } catch (error) {
      console.log("Lỗi deleteQuestion tại questionService: ", error);
      throw error;
    }
  },
};

export default questionService;
