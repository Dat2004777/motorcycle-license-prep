import { Link } from "react-router";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "@/components/ui/button";

const TestCard = ({ exam }) => {
  return (
    <>
      <Card className="transition-all duration-250 hover:-translate-y-1.5">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <h2 className="text-xl font-semibold">{exam.title}</h2>
            {/* <Badge>Chưa làm</Badge> */}
          </CardTitle>
          <CardDescription>
            Cấu trúc đề thi chuẩn, thời gian 10 phút. Bao gồm các câu hỏi hay
            gặp.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link to={`/exam-test/${exam.id}`}>
            <Button className="w-full p-6">Bắt đầu làm bài</Button>
          </Link>
        </CardContent>
      </Card>
    </>
  );
};

export default TestCard;
