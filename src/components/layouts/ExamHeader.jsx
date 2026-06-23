import { Button } from "@/components/ui/button";
import Logo from "../Logo";

const ExamHeader = () => {
  return (
    <div className="flex justify-between p-4 shadow-md">
      <Logo />

      <div>
        <Button variant="destructive">Thoát bài thi</Button>
      </div>
    </div>
  );
};

export default ExamHeader;
