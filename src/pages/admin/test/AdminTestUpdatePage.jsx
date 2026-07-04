import CommonPagination from "@/components/CommonPagination";
import AdminSidebar from "@/components/layouts/AdminSidebar";
import QuestionTable from "@/components/question/QuestionTable";
import TestContent from "@/components/test/TestContent";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import useExam from "@/hooks/useExam";
import usePagination from "@/hooks/usePagination";
import useQuestion from "@/hooks/useQuestion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const AdminTestUpdatePage = () => {
  const navigate = useNavigate();
  const { testId } = useParams();

  const { questions, fetchQuestions } = useQuestion("AdminTestUpdatePage");
  const { currentExam, fetchExamById, handleUpdateTest } = useExam(
    "AdminTestUpdatePage",
  );

  const {
    page,
    totalPages,
    visibleData,
    handlePrev,
    handleNext,
    handlePageChange,
  } = usePagination(questions);

  const [examTitle, setExamTitle] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
    fetchExamById(testId);
  }, [fetchQuestions, fetchExamById, testId]);

  useEffect(() => {
    if (currentExam) {
      setExamTitle(currentExam?.title || "");
      setSelectedQuestions(currentExam?.questionIds || []);
    }
  }, [currentExam]);

  const handleToggleSelectQuestion = (questionId) => {
    setSelectedQuestions((prev) => {
      if (prev.includes(questionId)) {
        return prev.filter((id) => id !== questionId);
      } else {
        if (prev.length >= 10) {
          toast.warning("Chỉ được phép chọn tối đa 10 câu hỏi");
          return prev;
        }
        return [...prev, questionId];
      }
    });
  };

  const handleUpdateExam = async () => {
    if (!examTitle.trim()) {
      toast.error("Chưa nhập tiêu đề cho bộ đề thi");
      return;
    }

    if (selectedQuestions.length !== 10) {
      toast.error(`Chưa chọn đủ 10 câu hỏi cho đề thi`);
      return;
    }

    const newExamData = {
      title: examTitle,
      questionIds: selectedQuestions,
    };

    handleUpdateTest(testId, newExamData);

    navigate("/admin/tests");
  };

  return (
    <>
      <SidebarProvider>
        {/* <SidebarTrigger className="p-2 border rounded-lg hover:bg-slate-100 transition-colors shadow-sm" />{" "} */}
        <AdminSidebar />
        <main className="w-full grow p-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Cập nhật đề thi
                </CardTitle>
                <CardDescription>
                  Chỉnh sửa thông tin đề thi ôn tập GPLX
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="p-8 rounded-xl border border-slate-200 bg-white shadow mt-8">
            <div>
              <div className="flex flex-col gap-8">
                <div>
                  <Card className="w-full rounded-xl p-6">
                    <CardContent>
                      <div>
                        <TestContent
                          examTitle={examTitle}
                          setExamTitle={setExamTitle}
                          selectedIds={selectedQuestions}
                          onToggleSelect={handleToggleSelectQuestion}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <QuestionTable
                  questions={visibleData}
                  isSelectionMode={true}
                  selectedIds={selectedQuestions}
                  onToggleSelect={handleToggleSelectQuestion}
                />
              </div>
            </div>

            <div className="mt-8 justify-center items-center flex">
              <CommonPagination
                page={page}
                totalPages={totalPages}
                onClickPrev={handlePrev}
                onClickNext={handleNext}
                onClickPageChange={handlePageChange}
              />
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <Button onClick={() => navigate(-1)} variant="outline">
                Hủy
              </Button>
              <Button variant="default" onClick={handleUpdateExam}>
                Cập nhật đề thi
              </Button>
            </div>
          </div>
        </main>
      </SidebarProvider>
    </>
  );
};

export default AdminTestUpdatePage;
