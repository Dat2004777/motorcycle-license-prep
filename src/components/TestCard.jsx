import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "@/components/ui/button";
import useQuestion from "@/hooks/useQuestion";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useEffect } from "react";

const TestCard = ({ exam, isRandom = false }) => {
  const navigate = useNavigate();
  const { questions, fetchQuestions } = useQuestion("TestCard");

  useEffect(() => {
    if (isRandom) {
      fetchQuestions();
    }
  }, [isRandom, fetchQuestions]);

  const handleStartRandomExam = () => {
    if (questions.length < 10) {
      toast.error("Kho câu hỏi hiện tại chưa đủ 10 câu để tạo đề ngẫu nhiên");
      return;
    }

    const shuffled = [...questions].sort(() => 0.5 - Math.random());

    const randomQuestionIds = shuffled
      .slice(0, 10)
      .map((question) => question.id);

    navigate("/exam-test/random", { state: { randomQuestionIds } });
  };

  return (
    <>
      <Card className="transition-all duration-250 hover:-translate-y-1.5">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <h2 className="text-xl font-semibold">
              {isRandom ? "Đề thi ngẫu nhiên" : exam.title}
            </h2>
          </CardTitle>
          <CardDescription>
            {isRandom
              ? "Đề thi được tạo ngẫu nhiên, tăng khả năng tiếp thu kiến thức, hỗ trợ ôn tập hiệu quả"
              : "Cấu trúc đề thi chuẩn, thời gian 10 phút. Bao gồm các câu hỏi hay gặp."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isRandom ? (
            <Button className="w-full p-6" onClick={handleStartRandomExam}>
              Bắt đầu làm bài
            </Button>
          ) : (
            <Link to={`/exam-test/${exam.id}`}>
              <Button className="w-full p-6">Bắt đầu làm bài</Button>
            </Link>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default TestCard;
