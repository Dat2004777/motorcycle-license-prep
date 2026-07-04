import ExamAnswerItem from "@/components/exam/ExamAnswerItem";
import ExamHeader from "@/components/layouts/ExamHeader";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useHistory from "@/hooks/useHistory";
import useQuestion from "@/hooks/useQuestion";
import { useEffect } from "react";
import { useParams } from "react-router";

const HistoryDetail = () => {
  const { historyId } = useParams();

  const { currentHistory, fetchHistoryById } = useHistory("historyDetail");
  const { questions, fetchQuestions } = useQuestion("historyDetail");
  console.log(currentHistory);

  useEffect(() => {
    fetchHistoryById(historyId);
    fetchQuestions();
  }, [fetchQuestions, fetchHistoryById, historyId]);

  const hasSnapshot =
    currentHistory?.userAnswers?.[0]?.questionText !== undefined;

  let examQuestions = [];
  if (hasSnapshot) {
    examQuestions =
      currentHistory?.userAnswers?.map((answer) => ({
        id: answer.qId,
        questionText: answer.questionText,
        options: answer.options,
        correctOption: answer.correctOption,
        isCritical: answer.isCritical,
        selected: answer.selected,
        isCorrect: answer.isCorrect,
      })) || [];
  } else {
    const targetQuestionIds =
      currentHistory?.userAnswers?.map((answer) => answer.questionId) || [];
    examQuestions =
      questions.length > 0 && targetQuestionIds.length > 0
        ? questions
            .filter((question) => targetQuestionIds.includes(question.id))
            .map((question) => {
              const answer = currentHistory.userAnswers.find(
                (ans) => ans.questionId === question.id,
              );
              return {
                id: question.id,
                questionText: question.questionText,
                options: question.options,
                correctOption: question.correctOption,
                isCritical: question.isCritical,
                selected: answer?.selected || "",
                isCorrect: answer?.isCorrect || false,
              };
            })
        : [];
  }

  if (
    !currentHistory ||
    (currentHistory && !hasSnapshot && questions.length === 0)
  ) {
    return (
      <div className="flex h-screen items-center justify-center text-muted-foreground">
        Đang tải chi tiết bài làm...
      </div>
    );
  }

  return (
    <>
      <ExamHeader />

      <main className="container mx-auto px-10 mt-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">
            Chi tiết kết quả: {currentHistory?.examTitle}
          </h2>

          <p className="font-bold">
            Điểm số:{" "}
            <span className="text-red-500">{currentHistory?.score}</span>
          </p>

          <p className="font-bold">
            Kết quả:{" "}
            <span
              className={`font-bold ${currentHistory?.isPassed === true ? "text-green-500" : "text-red-500"}`}
            >
              {currentHistory?.isPassed === true ? "Đạt" : "Không đạt"}
            </span>
          </p>
        </div>

        <div className="flex flex-col gap-8 my-8">
          {examQuestions.map((question, index) => {
            const userSelectedAnswer = question.selected || "";

            return (
              <Card key={question.id} className="w-full shadow-sm">
                <CardHeader>
                  <CardDescription className="flex items-center gap-2 font-semibold">
                    <span>
                      Câu hỏi {index + 1}/{examQuestions.length}
                    </span>

                    {question.isCorrect ? (
                      <Badge variant="secondary" className="font-bold">
                        Đúng
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="font-bold">
                        Sai
                      </Badge>
                    )}
                  </CardDescription>
                  <CardTitle>{question.questionText}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2 pointer-events-none opacity-90">
                    {Object.entries(question?.options || {}).map(
                      ([key, value]) => {
                        const isUserPicked = userSelectedAnswer === key;

                        return (
                          <div key={key} className="relative">
                            <ExamAnswerItem
                              text={value}
                              isSelected={isUserPicked}
                            />

                            {key === question.correctOption && (
                              <Badge
                                variant="secondary"
                                className="absolute right-4 top-1/2 -translate-y-1/2 font-bold"
                              >
                                Đáp án đúng
                              </Badge>
                            )}
                          </div>
                        );
                      },
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default HistoryDetail;
