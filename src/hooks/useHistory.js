import historyService from "@/services/historyService";
import { useCallback, useState } from "react";
import { toast } from "sonner";

const useHistory = (usingPage) => {
  const [histories, setHistories] = useState([]);

  const fetchHistoryByUserId = useCallback(
    async (userId) => {
      try {
        const historiesData = await historyService.getHistoryByUserId(userId);
        setHistories(historiesData);
      } catch (error) {
        console.log(`Lỗi khi tải lịch sử tại ${usingPage}: `, error);
        toast.error("Lỗi khi tải lịch sử");
      }
    },
    [usingPage],
  );

  return {
    histories,
    fetchHistoryByUserId,
  };
};

export default useHistory;
