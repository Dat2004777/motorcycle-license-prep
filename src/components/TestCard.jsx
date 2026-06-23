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
            Cấu trúc đề thi chuẩn, thời gian 5 phút. Bao gồm các câu hỏi hay
            gặp.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full p-6">Bắt đầu làm bài</Button>
        </CardContent>
      </Card>
    </>
  );
};

export default TestCard;
