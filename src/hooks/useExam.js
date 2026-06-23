import examService from "@/services/examService";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export default function useExam(usingPage) {
  const [exams, setExams] = useState([]);

  const fetchExams = useCallback(async () => {
    try {
      const res = await examService.getAllExams();
      setExams(res);
    } catch (error) {
      console.log(`Lỗi fetchExams tại ${usingPage}: `, error);
      toast.error("Lỗi khi lấy danh sách đề thi");
    }
  }, [usingPage]);

  return {
    exams,
    fetchExams,
  };
}
