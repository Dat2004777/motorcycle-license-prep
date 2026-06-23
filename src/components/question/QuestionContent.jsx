import { TableOfContents } from "lucide-react";
import { Textarea } from "../ui/textarea";

const QuestionContent = ({ questionContent, onChangeSetQuestionContent }) => {
  return (
    <>
      <div className="flex gap-2 items-center px-1">
        <TableOfContents className="text-primary" size={16} />
        <p>Nội dung câu hỏi</p>
      </div>
      <div className="mt-4">
        <Textarea
          value={questionContent}
          onChange={(e) => onChangeSetQuestionContent(e.target.value)}
          type="text"
          className="h-24 resize-none"
        />
      </div>
    </>
  );
};

export default QuestionContent;
