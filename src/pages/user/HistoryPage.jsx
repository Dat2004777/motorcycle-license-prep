import CommonPagination from "@/components/CommonPagination";
import Header from "@/components/layouts/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/hooks/useAuth";
import useHistory from "@/hooks/useHistory";
import usePagination from "@/hooks/usePagination";
import { historyDate, historyResult } from "@/lib/utils";
import { useEffect } from "react";
import { Link } from "react-router";

const HistoryPage = () => {
  const { user } = useAuth();
  const { histories, fetchHistoryByUserId } = useHistory("HistoryPage");
  const {
    page,
    totalPages,
    visibleData,
    handlePrev,
    handleNext,
    handlePageChange,
  } = usePagination(histories);

  useEffect(() => {
    fetchHistoryByUserId(user.id);
  }, [fetchHistoryByUserId, user.id]);

  return (
    <>
      <Header />

      <main className="container mx-auto px-10">
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Lịch sử làm bài
              </CardTitle>
              <CardDescription>
                Xem lại các bài thi đã thực hiện và kết quả của bạn
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow w-full p-8 mt-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left uppercase">STT</TableHead>
                <TableHead className="text-left uppercase">
                  Ngày/ giờ thi
                </TableHead>
                <TableHead className="text-center uppercase">
                  Tên bộ đề
                </TableHead>
                <TableHead className="text-center uppercase">Điểm số</TableHead>
                <TableHead className="text-center uppercase">Kết quả</TableHead>
                <TableHead className="text-center uppercase">
                  Hành động
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {visibleData.map((history, index) => (
                <TableRow key={history.id}>
                  <TableCell className="text-left">{index + 1}</TableCell>
                  <TableCell className="text-left">
                    {historyDate(history.date)}
                  </TableCell>
                  <TableCell className="text-center">
                    {history.examTitle}
                  </TableCell>
                  <TableCell className="text-center">{history.score}</TableCell>
                  <TableCell className="text-center">
                    {historyResult(history.isPassed)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Link to={`/history/detail/${history.id}`}>
                      <Button>Chi tiết</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter className="bg-slate-50/50 border-t border-slate-200">
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="p-4 text-sm text-muted-foreground font-normal"
                >
                  Hiển thị 1-5 trên tổng số 10 lịch sử làm bài
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
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
      </main>
    </>
  );
};

export default HistoryPage;
