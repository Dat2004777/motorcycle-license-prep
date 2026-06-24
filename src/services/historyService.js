import api from "@/lib/axios";

const historyService = {
  getAllHistories: async () => {
    try {
      const res = await api.get("/histories/");
      return res.data;
    } catch (error) {
      console.error("Lỗi getAllHistories tại historyService: ", error);
      throw error;
    }
  },
};

export default historyService;
