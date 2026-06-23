import { Card, CardContent } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TriangleAlert } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

const QuestionFilter = ({
  categories,
  selectedCategory,
  isCritical,
  onChangeSetCategory,
  onChangeSetCritical,
}) => {
  return (
    <>
      <Card className="w-full">
        <CardContent>
          <p className="font-semibold uppercase">Danh mục & Phân loại</p>

          <div className="mt-4">
            <Select
              onValueChange={onChangeSetCategory}
              value={selectedCategory}
            >
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4">
            <Card className="border border-red-500/50 bg-red-500/5">
              <CardContent>
                <div className="flex gap-4">
                  <Checkbox
                    checked={isCritical}
                    onCheckedChange={onChangeSetCritical}
                    className="mt-0.5"
                    aria-invalid
                  />
                  <div>
                    <div className="flex items-center gap-1 text-red-500">
                      <TriangleAlert size={16} />
                      <p className="text-md">Câu hỏi điểm liệt</p>
                    </div>

                    <div>
                      Học viên trả lời sai câu này sẽ bị đánh trượt ngay lập tức
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default QuestionFilter;
