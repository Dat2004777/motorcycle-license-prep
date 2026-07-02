import { Button } from "@/components/ui/button";
import Logo from "../Logo";
import { useNavigate, useLocation } from "react-router";

const ExamHeader = ({ setIsConfirmOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isTestingPage = location.pathname.includes("/exam-test");

  const handleBackAction = () => {
    if (isTestingPage) {
      if (setIsConfirmOpen) {
        setIsConfirmOpen(true);
      } else {
        navigate("/");
      }
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex justify-between p-4 shadow-md">
      <Logo disabled={isTestingPage} />

      <div>
        {isTestingPage ? (
          <Button variant="destructive" onClick={handleBackAction}>
            Thoát bài thi
          </Button>
        ) : (
          <Button variant="outline" onClick={handleBackAction}>
            Quay trở lại
          </Button>
        )}
      </div>
    </div>
  );
};

export default ExamHeader;
