import questionService from "@/services/questionService";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export default function useQuestion(usingPage) {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = useCallback(async () => {
    try {
      const questionsData = await questionService.getAllQuestions();
      setQuestions(questionsData);
    } catch (error) {
      console.log(`Lỗi khi tải câu hỏi tại ${usingPage}: `, error);
      toast.error;
      ("Lỗi khi tải câu hỏi");
    }
  }, [usingPage]);

  const handleDeleteQuestion = useCallback(
    async (questionId) => {
      try {
        const result = await questionService.deleteQuestion(questionId);

        if (result) {
          toast.success("Xóa câu hỏi thành công");
        }
      } catch (error) {
        console.log(`Lỗi khi xóa câu hỏi tại ${usingPage}: `, error);
        toast.error;
        ("Lỗi khi xóa câu hỏi");
      }
    },
    [usingPage],
  );

  return {
    questions,
    setQuestions,
    fetchQuestions,
    handleDeleteQuestion,
  };
}
