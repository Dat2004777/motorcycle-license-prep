import ExamAnswerItem from "@/components/exam/ExamAnswerItem";
import ExamHeader from "@/components/layouts/ExamHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useExam from "@/hooks/useExam";
import useQuestion from "@/hooks/useQuestion";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const ExamTestPage = () => {
  const { examId } = useParams();

  const { currentExam, fetchExamById } = useExam("ExamTestPage");
  const { questions, fetchQuestions } = useQuestion("ExamTestPage");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const questionList =
    currentExam?.questionIds && questions.length > 0
      ? questions.filter((question) =>
          currentExam.questionIds.includes(question.id),
        )
      : [];

  const currentQuestion = questionList[currentIndex];

  const currentSelectedAnswer = currentQuestion
    ? answers[currentQuestion.id]
    : "";

  const completedCount = questionList.filter(
    (question) => answers[question.id],
  ).length;

  const handleSelectAnswer = (answer) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }));
  };

  useEffect(() => {
    fetchExamById(examId);
    fetchQuestions();
  }, [fetchExamById, fetchQuestions, examId]);

  if (questionList.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center text-muted-foreground">
        Đang tải câu hỏi đề thi số {examId}
      </div>
    );
  }

  return (
    <>
      <ExamHeader />

      <main className="container mx-auto px-10">
        <div className="mt-8">
          <div className="grid grid-cols-12 gap-6">
            <Card className="col-span-8">
              <CardHeader>
                <CardDescription>
                  Câu hỏi {currentIndex + 1}/{questionList.length}
                </CardDescription>
                <CardTitle>{currentQuestion.questionText}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  {Object.entries(currentQuestion.options).map(
                    ([key, value]) => (
                      <ExamAnswerItem
                        key={key}
                        text={value}
                        isSelected={currentSelectedAnswer === key}
                        onSelect={() => handleSelectAnswer(key)}
                      />
                    ),
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="col-span-4">
              <Card>
                <CardHeader className="text-center">
                  <CardDescription>Thời gian còn lại</CardDescription>
                  <CardTitle className="flex items-center gap-2 justify-center">
                    <Clock />
                    <span className="text-4xl">18:42</span>
                  </CardTitle>
                </CardHeader>
              </Card>

              <Card className="mt-4">
                <CardHeader className="flex justify-between items-center">
                  <CardTitle>Danh sách câu hỏi</CardTitle>
                  <span className="text-primary">
                    {completedCount}/{questionList.length} đã làm
                  </span>
                </CardHeader>
                <CardContent className="grid grid-cols-5 gap-2">
                  {questionList.map((question, index) => {
                    const isCurrent = currentIndex === index;
                    const isAnswered = !!answers[question.id];

                    return (
                      <Button
                        key={question.id}
                        type="button"
                        variant="none"
                        onClick={() => setCurrentIndex(index)}
                        className={`relative flex items-center justify-center h-12 rounded-xl border font-semibold text-sm transition-all duration-200 p-0 ${
                          isCurrent
                            ? "bg-primary text-white border-primary shadow-md"
                            : isAnswered
                              ? "bg-blue-50 text-primary border-blue-200 hover:bg-blue-100"
                              : "bg-slate-50 text-muted-foreground border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {index + 1}
                      </Button>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Card>
            <CardContent className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => prev - 1)}
                >
                  Câu trước
                </Button>
                <Button
                  variant="outline"
                  disabled={currentIndex === questionList.length - 1}
                  onClick={() => setCurrentIndex((prev) => prev + 1)}
                >
                  Câu tiếp theo
                </Button>
              </div>
              <Button>Nộp bài</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default ExamTestPage;
