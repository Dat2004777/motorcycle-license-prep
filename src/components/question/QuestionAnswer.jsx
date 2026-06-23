import { Input } from "../ui/input";

const QuestionAnswer = ({
  label,
  value,
  onChangeAnswerText,
  isSelected,
  onSelectCorrect,
}) => {
  return (
    <>
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center px-1">
          <span className="text-sm font-medium text-muted-foreground">
            Đáp án {label}
          </span>
          <Input
            type="radio"
            name="correct-answer"
            checked={isSelected}
            onChange={() => onSelectCorrect(label)}
            className="w-4 h-4 focus:ring-primary cursor-pointer"
          />
        </div>

        <div
          className={`flex items-center rounded-xl border overflow-hidden transition-all duration-200 bg-white shadow-sm ${
            isSelected
              ? "border-primary ring-2 ring-primary/10"
              : "border-slate-200 hover:border-slate-300"
          }`}
        >
          <div
            className={`flex h-12 w-12 items-center justify-center font-bold text-sm shrink-0 transition-colors duration-200 ${
              isSelected
                ? "bg-primary text-white"
                : "bg-slate-100 text-muted-foreground border-r border-slate-200"
            }`}
          >
            {label}
          </div>

          <Input
            type="text"
            value={value}
            onChange={(e) => onChangeAnswerText(e.target.value)}
            className="border-0 focus-visible:ring-0 text-sm px-4"
          />
        </div>
      </div>

      {/* <hr className="border-slate-200/60 my-1" /> */}

      {/* <div className="flex flex-col gap-2.5">
              <p className="text-sm font-medium text-muted-foreground">
                Hoặc chọn Đáp án đúng từ danh sách
              </p>
              <div className="inline-flex items-center bg-white border border-slate-200 rounded-xl px-4 py-2.5 w-fit shadow-sm font-medium text-sm">
                Đáp án {correctOption}{" "}
                <span className="text-muted-foreground ml-1">(Đang chọn)</span>
              </div>
            </div> */}
      {/* </CardContent>
        </Card>
      </div> */}
    </>
  );
};

export default QuestionAnswer;
