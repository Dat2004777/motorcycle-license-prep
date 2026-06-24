import examService from "@/services/examService";
import historyService from "@/services/historyService";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export default function useExam(usingPage) {
  const [exams, setExams] = useState([]);
  const [currentExam, setCurrentExam] = useState();

  const fetchExams = useCallback(async () => {
    try {
      const res = await examService.getAllExams();
      setExams(res);
    } catch (error) {
      console.log(`Lỗi fetchExams tại ${usingPage}: `, error);
      toast.error("Lỗi khi lấy danh sách đề thi");
    }
  }, [usingPage]);

  const fetchExamById = useCallback(
    async (id) => {
      try {
        const res = await examService.getExamById(id);
        setCurrentExam(res);
      } catch (error) {
        console.log(`Lỗi fetchExamById tại ${usingPage}: `, error);
        toast.error("Lỗi khi lấy thông tin đề thi");
      }
    },
    [usingPage],
  );

  const handleSubmitExam = useCallback(
    async (examData) => {
      try {
        const res = await historyService.saveHistory(examData);
        return res;
      } catch (error) {
        console.log(`Lỗi handleSubmitExam tại ${usingPage}: `, error);
        toast.error("Lỗi khi nộp bài thi");
      }
    },
    [usingPage],
  );

  return {
    exams,
    currentExam,
    fetchExams,
    fetchExamById,
    handleSubmitExam,
  };
}
