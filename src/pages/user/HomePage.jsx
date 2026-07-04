import CommonPagination from "@/components/CommonPagination";
import Header from "@/components/layouts/Header";
import TestCard from "@/components/TestCard";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useExam from "@/hooks/useExam";
import usePagination from "@/hooks/usePagination";
import { useEffect } from "react";

const HomePage = () => {
  const { exams, fetchExams } = useExam("HomePage");
  const {
    page,
    totalPages,
    visibleData,
    handlePrev,
    handleNext,
    handlePageChange,
  } = usePagination(exams);

  useEffect(() => {
    fetchExams();
  }, [fetchExams]);

  return (
    <>
      <Header />

      <main className="container mx-auto px-10">
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Luyện tập thi thử lý thuyết bằng lái xe
              </CardTitle>
              <CardDescription>
                {" "}
                Chọn bộ đề để bắt đầu thi thử hoặc ôn tập theo cấu trúc chuẩn
                của Bộ GTVT
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="mt-8">
          <div>
            <Tabs>
              <TabsList className="flex w-full">
                <TabsTrigger value="exam-sets">Đề Thi Theo Bộ</TabsTrigger>
                <TabsTrigger value="other-exams">Đề Thi Khác</TabsTrigger>
                {/* <TabsTrigger value="categories-exams">
                  Học Theo Danh Mục
                </TabsTrigger> */}
              </TabsList>
              <TabsContent value="exam-sets">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 mt-4">
                  {visibleData.map((exam) => (
                    <TestCard key={exam.id} exam={exam} />
                  ))}
                </div>

                <div className="mt-8 flex justify-center">
                  <CommonPagination
                    page={page}
                    totalPages={totalPages}
                    onClickPrev={handlePrev}
                    onClickNext={handleNext}
                    onClickPageChange={handlePageChange}
                  />
                </div>
              </TabsContent>
              <TabsContent value="other-exams">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 mt-4">
                  <TestCard isRandom={true} />
                </div>
              </TabsContent>
              {/* <TabsContent value="categories-exams">Category</TabsContent> */}
            </Tabs>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
