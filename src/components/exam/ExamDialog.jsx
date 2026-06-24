import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { AlertTriangle } from "lucide-react";

const ExamDialog = ({
  isConfirmOpen,
  setIsConfirmOpen,
  completedCount,
  totalQuestions,
  onExecuteSubmit,
}) => {
  return (
    <>
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent className="sm:max-w-112.5 rounded-2xl p-6">
          <DialogHeader className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-red-500 mb-2">
              <AlertTriangle size={28} />
            </div>
            <DialogTitle className="text-xl font-bold">
              Xác nhận nộp bài thi?
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-2">
              Bạn mới làm được{" "}
              <span className="font-bold text-primary">
                {completedCount}/{totalQuestions} câu
              </span>
              . Sau khi nộp, bạn sẽ không thể chỉnh sửa lại các đáp án đã chọn
              nữa!
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="grid grid-cols-2 gap-3 mt-4 sm:space-x-0">
            <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>
              Tiếp tục làm
            </Button>
            <Button onClick={onExecuteSubmit}>Xác nhận nộp</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExamDialog;
