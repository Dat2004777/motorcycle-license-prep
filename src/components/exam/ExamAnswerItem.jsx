import { Input } from "../ui/input";

const ExamAnswerItem = ({ text, isSelected, onSelect }) => {
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
        <div className="flex items-center justify-center shrink-0">
          <Input
            type="radio"
            checked={isSelected}
            onChange={onSelect}
            className="w-4 h-4 text-primary border-slate-200 focus:ring-primary cursor-pointer accent-primary"
          />
        </div>

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
