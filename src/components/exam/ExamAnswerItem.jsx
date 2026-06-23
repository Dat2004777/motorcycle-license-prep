import { Input } from "../ui/input";

const ExamAnswerItem = ({
  label, // "A", "B", "C", "D" hoặc dùng index 1, 2, 3, 4
  text, // Nội dung đáp án (Ví dụ: "Biển 1", "Biển 2")
  isSelected, // Trạng thái ô này có đang được học viên chọn hay không (true/false)
  onSelect, // Hàm kích hoạt khi học viên bấm vào nguyên cái hàng này
}) => {
  return (
    <>
      <div
        onClick={onSelect}
        className={`flex items-center gap-4 px-4 py-3.5 rounded-xl border-2 cursor-pointer transition-all duration-150 select-none ${
          isSelected
            ? "border-primary bg-blue-50/50 shadow-sm"
            : "border-slate-200 bg-white hover:border-slate-200 hover:bg-slate-50/30"
        }`}
      >
        {/* Nút Radio tròn custom đổi màu theo thiết kế */}
        <div className="flex items-center justify-center shrink-0">
          <Input
            type="radio"
            checked={isSelected}
            onChange={onSelect} // Đồng bộ khi bấm thẳng vào nút radio
            className="w-4 h-4 text-primary border-slate-200 focus:ring-primary cursor-pointer accent-primary"
          />
        </div>

        {/* Nội dung đáp án */}
        <span
          className={`text-sm font-medium ${isSelected ? "text-primary" : "text-muted-foreground"}`}
        >
          {text}
        </span>
      </div>
    </>
  );
};

export default ExamAnswerItem;
