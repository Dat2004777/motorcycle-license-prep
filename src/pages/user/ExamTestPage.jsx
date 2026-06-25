import ExamAnswerItem from "@/components/exam/ExamAnswerItem";
import ExamDialog from "@/components/exam/ExamDialog";
import ExamHeader from "@/components/layouts/ExamHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import useExam from "@/hooks/useExam";
import useQuestion from "@/hooks/useQuestion";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { toast } from "sonner";

const ExamTestPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { examId } = useParams();

  const {
    currentExam,
    fetchExamById,
    handleSubmitExam: submitExam,
  } = useExam("ExamTestPage");
  const { questions, fetchQuestions } = useQuestion("ExamTestPage");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const [randomQuestions, setRandomQuestions] = useState(
    location.state?.randomQuestionIds || [],
  );

  const questionList =
    examId === "random"
      ? questions.length > 0 && randomQuestions.length > 0
        ? randomQuestions
            .map((id) => questions.find((q) => q.id === id))
            .filter(Boolean)
        : []
      : currentExam?.questionIds && questions.length > 0
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
    if (examId !== "random") {
      fetchExamById(examId);
    }
    fetchQuestions();
  }, [fetchExamById, fetchQuestions, examId]);

  useEffect(() => {
    if (
      examId === "random" &&
      questions.length > 0 &&
      randomQuestions.length === 0
    ) {
      const shuffled = [...questions].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 10).map((question) => question.id);
      setTimeout(() => {
        setRandomQuestions(selected);
      }, 0);
    }
  }, [examId, questions, randomQuestions]);

  if (questionList.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center text-muted-foreground">
        Đang tải câu hỏi đề thi ...
      </div>
    );
  }

  const handleSubmitExam = async () => {
    setIsConfirmOpen(false);

    let correctCount = 0;
    let hasFailedCritical = false;
    const userAnswersLog = [];

    questionList.forEach((question) => {
      const userAnswer = answers[question.id];
      const isCorrect = userAnswer === question.correctOption;

      if (isCorrect) correctCount++;
      if (!isCorrect && question.isCritical) hasFailedCritical = true;

      userAnswersLog.push({
        questionId: question.id,
        selected: userAnswer || "",
        isCorrect: isCorrect,
      });
    });

    const isPassed = correctCount >= 7 && !hasFailedCritical;

    const historyData = {
      studentId: user.id,
      examId: examId === "random" ? "random" : Number(examId),
      examTitle: examId === "random" ? "Đề thi ngẫu nhiên" : currentExam.title,
      date: new Date().toISOString(),
      score: correctCount,
      totalQuestions: questionList.length,
      isPassed: isPassed,
      failedOnCritical: hasFailedCritical,
      userAnswers: userAnswersLog,
    };

    try {
      const res = await submitExam(historyData);
      if (res) {
        toast.success("Nộp bài thành công");
        navigate("/");
      }
    } catch (error) {
      console.log("Lỗi khi nộp bài tại ExamTestPage: ", error);
      toast.error("Lỗi khi nộp bài");
    }
  };

  return (
    <>
      <ExamHeader setIsConfirmOpen={setIsConfirmOpen} />

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
                  <Button onClick={() => setIsConfirmOpen(true)}>
                    Nộp bài
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <ExamDialog
          isConfirmOpen={isConfirmOpen}
          setIsConfirmOpen={setIsConfirmOpen}
          completedCount={completedCount}
          totalQuestions={questionList.length}
          onExecuteSubmit={handleSubmitExam}
        />
      </main>
    </>
  );
};

export default ExamTestPage;
