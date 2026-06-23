import axios from "axios";

const examService = {
  getAllExams: async () => {
    try {
      const res = await axios.get("http://localhost:3000/exams");
      return res.data;
    } catch (error) {
      console.error("Lỗi getAllExams tại examService: ", error);
      throw error;
    }
  },
};

export default examService;
