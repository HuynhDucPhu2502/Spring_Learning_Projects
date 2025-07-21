import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import RichTextEditor from "@/components/custom/RichText/index-editor";
import SkillSelection from "./SkillSelection";
import type { CompanySummary, JobUpsertDto, SkillSummary } from "@/types/job";
import CompanySelection from "./CompanySelection.tsx";
import { getErrorMessage } from "@/features/slices/auth/authThunk";
import { toast } from "sonner";
import { getJobById, saveJob, updateJobById } from "@/services/jobApi";
import { formatISOToYMD } from "@/utils/convertHelper.ts";

const levels = [
  { value: "INTERN", label: "Intern" },
  { value: "FRESHER", label: "Fresher" },
  { value: "MIDDLE", label: "Middle" },
  { value: "SENIOR", label: "Senior" },
];

export default function JobUpsertPage() {
  // ============================
  // Checking is edit or create
  // ============================
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const isEdit = !!id;

  // ============================
  // Form data
  // ============================
  const [formData, setFormData] = useState<JobUpsertDto>({
    name: "",
    location: "",
    salary: 0,
    quantity: 1,
    level: "INTERN",
    description: "",
    startDate: "",
    endDate: "",
    active: true,
    company: null,
    skills: [],
  });

  const [selectedSkills, setSelectedSkills] = useState<SkillSummary[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<
    CompanySummary | undefined
  >();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const res = await getJobById(parseInt(id));
          const job = res.data.data;
          job.startDate = formatISOToYMD(job.startDate);
          job.endDate = formatISOToYMD(job.endDate);

          setFormData(job);
          setSelectedCompany(job.company);
          setSelectedSkills(job.skills);
        } catch (err) {
          toast.error(getErrorMessage(err, "Không tìm thấy công việc này"));
          setSearchParams({});
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [id, setSearchParams]);

  // ============================
  // Skill selection handler
  // ============================
  const addSkill = (skill: SkillSummary) => {
    const exists = selectedSkills.some((s) => s.id === skill.id);
    if (exists) return;

    const updated = [...selectedSkills, skill];
    const skillIds = updated.map((s) => ({ id: s.id }));

    setSelectedSkills(updated);
    setFormData((form) => ({ ...form, skills: skillIds }));
  };

  const removeSkill = (skill: SkillSummary) => {
    const updated = selectedSkills.filter((s) => s.id !== skill.id);
    const skillIds = updated.map((s) => ({ id: s.id }));

    setSelectedSkills(updated);
    setFormData((form) => ({ ...form, skills: skillIds }));
  };
  // ============================
  // Company selection handler
  // ============================
  const addCompany = (company: CompanySummary) => {
    const newCompany = selectedCompany?.id === company.id ? undefined : company;

    setSelectedCompany(newCompany);

    const companyIds = newCompany ? { id: newCompany.id } : null;
    setFormData((prev) => ({ ...prev, company: companyIds }));
  };

  const removeCompany = () => {
    setSelectedCompany(undefined);
    setFormData((prev) => ({ ...prev, company: null }));
  };

  // ============================
  // General Field Handler
  // ============================
  const handleInputChange = (
    field: keyof JobUpsertDto,
    value: string | number | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toISODate = (dateStr: string): string => {
    return new Date(dateStr).toISOString();
  };

  // ============================
  // Form Submit Handler
  // ============================

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let newCopy = { ...formData };
      newCopy = {
        ...newCopy,
        startDate: toISODate(newCopy.startDate),
        endDate: toISODate(newCopy.endDate),
      };

      if (isEdit) await updateJobById(parseInt(id), newCopy);
      else await saveJob(newCopy);

      handleBack();
    } catch (err) {
      toast.error(getErrorMessage(err, "Thêm công việc mới thất bại"));
    } finally {
      setIsLoading(false);
    }
  };

  // ============================
  // Ultils Handler
  // ============================
  const handleBack = () => {
    navigate("/admin/recruitment/job-manager");
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={handleBack} className="cursor-pointer">
              Quản lý việc làm
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {isEdit ? "Cập nhật" : "Tạo mới"} việc làm
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">
            {isEdit ? "Chỉnh sửa Job" : "Thêm Job mới"}
          </h1>
          <p className="text-muted-foreground">
            {isEdit ? "Cập nhật thông tin job" : "Tạo job mới trong hệ thống"}
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Thông tin Job</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Tên Job <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Nhập tên công việc..."
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">
                  Địa điểm <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="location"
                  placeholder="Nhập địa điểm làm việc..."
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="salary">
                  Mức lương <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="salary"
                    placeholder="Nhập mức lương"
                    type="number"
                    value={formData.salary}
                    onChange={(e) =>
                      handleInputChange("salary", Number(e.target.value))
                    }
                    required
                    className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <span className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2">
                    VND
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">
                  Số lượng <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="quantity"
                  placeholder="Nhập số lượng"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) =>
                    handleInputChange("quantity", Number(e.target.value))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">
                  Trình độ <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.level}
                  onValueChange={(value) =>
                    handleInputChange("level", value as JobUpsertDto["level"])
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn cấp độ" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="startDate">
                  Ngày bắt đầu <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    handleInputChange("startDate", e.target.value)
                  }
                  required
                  className="w-fit"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">
                  Ngày kết thúc <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  required
                  className="w-fit"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Trạng thái</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="status"
                    checked={formData.active}
                    onCheckedChange={(checked) =>
                      handleInputChange("active", checked)
                    }
                  />
                  <Label htmlFor="status" className="text-sm font-medium">
                    {formData.active ? "ACTIVE" : "INACTIVE"}
                  </Label>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Miêu tả job <span className="text-red-500">*</span>
              </Label>
              <RichTextEditor
                value={formData.description}
                onChange={(value) => handleInputChange("description", value)}
                placeholder="Nhập mô tả chi tiết về job..."
              />
            </div>

            {/* Skills and Company Section */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Skills */}
              <SkillSelection
                selectedSkills={selectedSkills}
                onAddSkill={addSkill}
                onRemoveSkill={removeSkill}
              />

              {/* Company */}
              <CompanySelection
                selectedCompany={selectedCompany}
                addCompany={addCompany}
                removeCompany={removeCompany}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={handleBack}>
                Hủy
              </Button>
              <Button
                type="button"
                onClick={handleFormSubmit}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? "Đang xử lý..." : isEdit ? "Cập nhật" : "Thêm mới"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
