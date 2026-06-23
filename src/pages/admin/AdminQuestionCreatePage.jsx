import AdminSidebar from "@/components/layouts/AdminSidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import QuestionContent from "@/components/question/QuestionContent";
import QuestionAnswer from "@/components/question/QuestionAnswer";
import QuestionFilter from "@/components/question/QuestionFilter";
import { useEffect } from "react";
import { ListChecks } from "lucide-react";
import useQuestion from "@/hooks/useQuestion";
import { toast } from "sonner";

const AdminQuestionCreatePage = () => {
  const navigate = useNavigate();

  const {
    categories,
    questionContent,
    selectedCategory,
    isCritical,
    optionA,
    optionB,
    optionC,
    optionD,
    correctOption,
    setCorrectOption,
    fetchCategories,
    handleAddAnswer,
    handleSetQuestionContent,
    handleSetCategory,
    handleSetCritical,
    handleSetOptionA,
    handleSetOptionB,
    handleSetOptionC,
    handleSetOptionD,
  } = useQuestion("AdminQuestionCreatePage");

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const validateForm = () => {
    if (!questionContent || questionContent.trim() === "") {
      toast.error("Vui lòng nhập nội dung câu hỏi");
      return false;
    }

    if (!selectedCategory) {
      toast.error("Vui lòng chọn danh mục cho câu hỏi");
      return false;
    }

    if (
      !optionA.trim() ||
      !optionB.trim() ||
      !optionC.trim() ||
      !optionD.trim()
    ) {
      toast.error("Vui lòng điền đầy đủ nội dung cho cả 4 đáp án A, B, C, D");
      return false;
    }

    if (!correctOption) {
      toast.error("Vui lòng chọn đáp án đúng cho câu hỏi");
      return false;
    }

    return true;
  };

  const handleSubmitQuestion = () => {
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    handleAddAnswer();
    navigate("/admin/questions");
  };

  return (
    <>
      <SidebarProvider>
        <AdminSidebar />

        <main className="w-full grow p-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Tạo câu hỏi mới
                </CardTitle>
                <CardDescription>
                  Thêm câu hỏi mới vào trong ngân hàng đề thi
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="p-8 rounded-xl border border-slate-200 bg-white shadow mt-8">
            <div className="grid grid-cols-12 gap-8">
              <div className="flex flex-col gap-8 col-span-8">
                <div>
                  <QuestionContent
                    questionContent={questionContent}
                    onChangeSetQuestionContent={handleSetQuestionContent}
                  />
                </div>

                <div>
                  <Card className="w-full rounded-xl p-6">
                    <CardContent className="flex flex-col gap-6">
                      <div className="flex items-center gap-2">
                        <ListChecks className="text-primary" size={16} />
                        <p className="font-semibold text-lg">Các đáp án</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <QuestionAnswer
                          label="A"
                          value={optionA}
                          onChangeAnswerText={handleSetOptionA}
                          isSelected={correctOption === "A"}
                          onSelectCorrect={setCorrectOption}
                        />

                        <QuestionAnswer
                          label="B"
                          value={optionB}
                          onChangeAnswerText={handleSetOptionB}
                          isSelected={correctOption === "B"}
                          onSelectCorrect={setCorrectOption}
                        />

                        <QuestionAnswer
                          label="C"
                          value={optionC}
                          onChangeAnswerText={handleSetOptionC}
                          isSelected={correctOption === "C"}
                          onSelectCorrect={setCorrectOption}
                        />

                        <QuestionAnswer
                          label="D"
                          value={optionD}
                          onChangeAnswerText={handleSetOptionD}
                          isSelected={correctOption === "D"}
                          onSelectCorrect={setCorrectOption}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="col-span-4">
                <QuestionFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  isCritical={isCritical}
                  onChangeSetCategory={handleSetCategory}
                  onChangeSetCritical={handleSetCritical}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <Button
                onClick={() => navigate("/admin/questions")}
                variant="outline"
              >
                Hủy
              </Button>
              <Button onClick={handleSubmitQuestion} variant="default">
                Thêm câu hỏi
              </Button>
            </div>
          </div>
        </main>
      </SidebarProvider>
    </>
  );
};

export default AdminQuestionCreatePage;
