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
import { Clock } from "lucide-react";
import { useState } from "react";

const currentQuestion = {
  id: 101,
  questionText: "Biển nào báo hiệu nguy hiểm đường giao nhau?",
  options: {
    A: "Biển 1",
    B: "Biển 2",
    C: "Cả hai biển",
    D: "Không biển nào",
  },
};

const ExamTest = () => {
  const [userAnswer, setUserAnswer] = useState("");

  return (
    <>
      <ExamHeader />

      <main className="container mx-auto px-10">
        <div className="mt-8">
          <div className="grid grid-cols-12 gap-6">
            <Card className="col-span-8">
              <CardHeader>
                <CardDescription>Câu hỏi 1/25</CardDescription>
                <CardTitle>{currentQuestion.questionText}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  {Object.entries(currentQuestion.options).map(
                    ([key, value]) => (
                      <ExamAnswerItem
                        key={key}
                        text={value}
                        isSelected={userAnswer === key} // Nếu key trùng với mã đang chọn -> chuyển màu xanh
                        onSelect={() => setUserAnswer(key)} // Bấm vào dòng nào -> Lưu mã dòng đó (A, B, C, D)
                      />
                    ),
                  )}
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  Đáp án đang chọn:{" "}
                  <span className="font-bold text-primary">
                    {userAnswer || "Chưa chọn"}
                  </span>
                </p>
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
                  <span className="text-primary">1/25 đã làm</span>
                </CardHeader>
                <CardContent className="grid grid-cols-5 gap-2">
                  <Button
                    type="button"
                    className={`relative flex items-center justify-center h-12 rounded-xl border font-semibold text-sm transition-all`}
                  >
                    1
                  </Button>
                  <Button
                    type="button"
                    className={`relative flex items-center justify-center h-12 rounded-xl border font-semibold text-sm transition-all`}
                  >
                    1
                  </Button>
                  <Button
                    type="button"
                    className={`relative flex items-center justify-center h-12 rounded-xl border font-semibold text-sm transition-all`}
                  >
                    1
                  </Button>
                  <Button
                    type="button"
                    className={`relative flex items-center justify-center h-12 rounded-xl border font-semibold text-sm transition-all`}
                  >
                    1
                  </Button>
                  <Button
                    type="button"
                    className={`relative flex items-center justify-center h-12 rounded-xl border font-semibold text-sm transition-all`}
                  >
                    1
                  </Button>
                  <Button
                    type="button"
                    className={`relative flex items-center justify-center h-12 rounded-xl border font-semibold text-sm transition-all`}
                  >
                    1
                  </Button>
                  <Button
                    type="button"
                    className={`relative flex items-center justify-center h-12 rounded-xl border font-semibold text-sm transition-all`}
                  >
                    1
                  </Button>
                  <Button
                    type="button"
                    className={`relative flex items-center justify-center h-12 rounded-xl border font-semibold text-sm transition-all`}
                  >
                    1
                  </Button>
                  <Button
                    type="button"
                    className={`relative flex items-center justify-center h-12 rounded-xl border font-semibold text-sm transition-all`}
                  >
                    1
                  </Button>
                  <Button
                    type="button"
                    className={`relative flex items-center justify-center h-12 rounded-xl border font-semibold text-sm transition-all`}
                  >
                    1
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Card>
            <CardContent className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button>Câu trước</Button>
                <Button>Câu tiếp theo</Button>
              </div>
              <Button>Nộp bài</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default ExamTest;
