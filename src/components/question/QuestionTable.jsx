import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Link } from "react-router";

const QuestionTable = ({ questions, onDeleteClick }) => {
  const questionLength = questions.length;
  return (
    <>
      <div className="rounded-xl border border-slate-200 bg-white shadow w-full p-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-15 uppercase">ID</TableHead>
              <TableHead className="max-w-62.5 uppercase">
                Nội dung câu hỏi
              </TableHead>
              <TableHead className="text-center uppercase">Danh mục</TableHead>
              <TableHead className="text-center uppercase">Phân Loại</TableHead>
              <TableHead className="text-center uppercase">Hành động</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {questions.map((question) => (
              <TableRow key={question.id}>
                <TableCell className="w-15">{question.id}</TableCell>
                <TableCell className="max-w-62.5 whitespace-normal wrap-break-word text-justify">
                  {question.questionText}
                </TableCell>
                <TableCell className="text-center">
                  {question.category}
                </TableCell>
                <TableCell className="text-center">
                  {question.isCritical ? "Điểm liệt" : "Thường"}
                </TableCell>
                <TableCell className="flex gap-2 justify-center">
                  <Link to={`/admin/questions/update/:id`}>
                    <Button variant="outline">Sửa</Button>
                  </Link>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      onDeleteClick(question.id);
                    }}
                  >
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter className="bg-slate-50/50 border-t border-slate-200">
            <TableRow>
              <TableCell
                colSpan={5}
                className="p-4 text-sm text-muted-foreground font-normal"
              >
                Hiển thị 1-5 trên tổng số {questionLength} câu hỏi
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  );
};

export default QuestionTable;
