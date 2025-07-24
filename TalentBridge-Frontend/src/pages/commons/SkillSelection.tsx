import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Search, Wrench, X } from "lucide-react";
import { toast } from "sonner";
import { findAllSkills } from "@/services/skillApi.ts";
import { getErrorMessage } from "@/features/slices/auth/authThunk.ts";
import type { SkillSummary } from "@/types/job";
import type { DefaultSkillResponseDto } from "@/types/skill.d.ts";
import LoadingSpinner from "@/components/custom/LoadingSpinner.tsx";
import { EmptyState } from "@/components/custom/EmptyState.tsx";
import Pagination from "@/components/custom/Pagination.tsx";
import { DialogDescription } from "@radix-ui/react-dialog";

interface SkillSelectionProps {
  selectedSkills: SkillSummary[];
  onAddSkill: (skill: SkillSummary) => void;
  onRemoveSkill: (skill: SkillSummary) => void;
}

const SkillSelection = ({
  selectedSkills,
  onAddSkill,
  onRemoveSkill,
}: SkillSelectionProps) => {
  // ============================
  // Modal State
  // ============================
  const [showDialog, setShowDialog] = useState(false);
  const closeModal = () => setShowDialog(false);

  // ============================
  // Pagination State
  // ============================
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  // ============================
  // Fetching State
  // ============================
  const [allSkills, setAllSkills] = useState<SkillSummary[]>([]);
  const [searchName, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchSkills = async (
    searchName: string,
    currentPage: number,
    itemsPerPage: number,
  ) => {
    try {
      setIsLoading(true);
      const filter = searchName ? `name ~ '*${searchName}*'` : null;
      const res = await findAllSkills({
        page: currentPage,
        size: itemsPerPage,
        filter,
      });
      const data = res.data.data;

      const mapped: SkillSummary[] = data.content.map((item: DefaultSkillResponseDto) => ({
        id: item.id,
        name: item.name,
      }));

      setAllSkills(mapped);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
      setIsLoading(false);
    } catch (err) {
      toast.error(getErrorMessage(err, "Không thể lấy danh sách kỹ năng."));
    }
  };

  useEffect(() => {
    fetchSkills(searchName, currentPage, itemsPerPage);
  }, [searchName, currentPage, itemsPerPage]);

  // ============================
  // Handle Add/Remove Skill
  // ============================
  const handleToggleSkill = (skill: SkillSummary) => {
    const exists = selectedSkills.some((s) => s.id === skill.id);
    if (exists) {
      onRemoveSkill(skill);
    } else {
      onAddSkill(skill);
    }
  };

  return (
    <div className="space-y-2">
      <Label>
        Kỹ năng yêu cầu <span className="text-red-500">*</span>
      </Label>

      <div className="rounded-md border bg-gray-50/50 p-3">
        {selectedSkills && selectedSkills.length > 0 && (
          <div className="mb-3 min-h-[100px]">
            <div className="flex flex-wrap gap-2">
              {selectedSkills.map((skill) => (
                <Badge key={skill.id} className="flex items-center gap-1">
                  {skill.name}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-red-500"
                    onClick={() => onRemoveSkill(skill)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {selectedSkills.length === 0 && (
          <div className="mb-3 flex min-h-[100px] w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
            <div>
              <Wrench className="mx-auto mb-2 h-8 w-8 text-gray-400" />
              <p className="text-sm text-gray-500">Chưa chọn kỹ năng</p>
            </div>
          </div>
        )}

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full">
              <Wrench className="mr-2 h-4 w-4" />
              {selectedSkills.length > 0 ? "Chỉnh sửa kỹ năng" : "Chọn kỹ năng"}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Chọn kỹ năng yêu cầu</DialogTitle>
              <DialogDescription>skill selection panel</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="relative">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  placeholder="Tìm kiếm kỹ năng..."
                  value={searchName}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="max-h-60 min-h-[300px] space-y-2 overflow-y-auto">
                {isLoading && (
                  <div className="flex justify-center py-6">
                    <LoadingSpinner />
                  </div>
                )}

                {!isLoading && allSkills.length === 0 && (
                  <EmptyState
                    title="Không tìm thấy kỹ năng nào"
                    description="Thử thay đổi tiêu chí tìm kiếm hoặc thêm kỹ năng mới"
                    icon={
                      <Wrench className="text-muted-foreground mb-4 h-12 w-12" />
                    }
                  />
                )}

                {!isLoading &&
                  allSkills.length > 0 &&
                  allSkills.map((skill) => (
                    <div key={skill.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`skill-${skill.id}`}
                        checked={selectedSkills.some((s) => s.id === skill.id)}
                        onCheckedChange={() => handleToggleSkill(skill)}
                      />
                      <Label
                        htmlFor={`skill-${skill.id}`}
                        className="flex-1 cursor-pointer"
                      >
                        {skill.name}
                      </Label>
                    </div>
                  ))}
              </div>

              {!isLoading && totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                  totalElements={totalElements}
                  itemsPerPage={itemsPerPage}
                  setItemsPerPage={setItemsPerPage}
                  showItemsPerPageSelect={false}
                />
              )}

              <div className="flex justify-end gap-2">
                <Button onClick={closeModal}>Xác nhận</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SkillSelection;
