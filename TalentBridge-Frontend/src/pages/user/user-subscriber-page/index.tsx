import { getErrorMessage } from "@/features/slices/auth/authThunk";
import {
  deleteSelfSubscriber,
  findSelfSubscriber,
  saveSelfSubscriber,
  updateSelfSubscriber,
} from "@/services/subscriberApi";
import type { SkillSummary } from "@/types/job";
import type {
  DefaultSubscriberRequestDto,
  DefaultSubscriberResponseDto,
} from "@/types/subscriber";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  Bell,
  BellOff,
  CheckCircle,
  Edit,
  Loader2,
  Save,
  Trash,
  User,
  Wrench,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import SkillSelection from "@/pages/commons/SkillSelection";
import { DeleteConfirmDialog } from "@/components/custom/DeleteConfirmationDialog";

const UserSubscriberPage = () => {
  // Data
  const [subscriber, setSubscriber] =
    useState<DefaultSubscriberResponseDto | null>();

  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form State
  const [selectedSkills, setSelectedSkills] = useState<SkillSummary[]>([]);

  // =========================================================
  // Handle Fetching
  // =========================================================
  const fetchSubscriber = async () => {
    try {
      setIsChecking(true);
      const res = await findSelfSubscriber();
      const subscriberData = res.data.data;
      setSubscriber(subscriberData);

      // Set selected skills from subscriber data
      if (subscriberData?.skills) {
        setSelectedSkills(
          subscriberData.skills.map((skill: SkillSummary) => ({
            id: skill.id,
            name: skill.name,
          })),
        );
      }
    } catch {
      setSubscriber(null);
      setSelectedSkills([]);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    fetchSubscriber();
  }, []);

  // =========================================================
  // Handle Create or Update
  // =========================================================
  const handleCreateOrUpdateSubscriber = async () => {
    if (selectedSkills.length === 0) {
      toast.error("Vui lòng chọn ít nhất một kỹ năng");
      return;
    }

    try {
      setIsLoading(true);

      const data: DefaultSubscriberRequestDto = {
        skills: selectedSkills.map((s) => s.id),
      };

      let res;
      const isUpdate = !!subscriber;

      if (isUpdate) {
        res = await updateSelfSubscriber(data);
        toast.success("Cập nhật đăng ký thành công");
      } else {
        res = await saveSelfSubscriber(data);
        toast.success("Đăng ký nhận thông báo thành công");
      }

      setSubscriber(res.data.data);
      setIsEditing(false);
    } catch (err) {
      toast.error(getErrorMessage(err, "Thao tác thất bại"));
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================================
  // Handle Delete
  // =========================================================
  const handleDelete = async () => {
    try {
      setIsLoading(true);

      await deleteSelfSubscriber();
      setSubscriber(null);
      setSelectedSkills([]);
      setIsEditing(false);
      toast.success("Hủy đăng ký thành công");
    } catch (err) {
      toast.error(getErrorMessage(err, "Thao tác thất bại"));
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================================
  // Skill selection handler
  // =========================================================
  const addSkill = (skill: SkillSummary) => {
    const exists = selectedSkills.some((s) => s.id === skill.id);
    if (exists) return;

    const updated = [...selectedSkills, skill];
    setSelectedSkills(updated);
  };

  const removeSkill = (skill: SkillSummary) => {
    const updated = selectedSkills.filter((s) => s.id !== skill.id);
    setSelectedSkills(updated);
  };

  // =========================================================
  // Handle Edit Mode
  // =========================================================
  const handleStartEdit = () => {
    setIsEditing(true);
    // Reset selected skills to current subscriber skills
    if (subscriber?.skills) {
      setSelectedSkills(
        subscriber.skills.map((skill: SkillSummary) => ({
          id: skill.id,
          name: skill.name,
        })),
      );
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset selected skills to current subscriber skills
    if (subscriber?.skills) {
      setSelectedSkills(
        subscriber.skills.map((skill: SkillSummary) => ({
          id: skill.id,
          name: skill.name,
        })),
      );
    } else {
      setSelectedSkills([]);
    }
  };

  if (isChecking) {
    return (
      <div className="container mx-auto max-w-4xl p-6">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
            <p className="text-muted-foreground">Đang tải dữ liệu...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-3xl font-bold">
            Đăng ký nhận thông báo việc làm
          </h1>
          <p className="text-muted-foreground mt-1">
            Nhận thông báo về các công việc phù hợp với kỹ năng của bạn
          </p>
        </div>
      </div>

      <Separator />

      {/* Current Subscription Status */}
      {subscriber && !isEditing && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <CardTitle className="text-xl">Trạng thái đăng ký</CardTitle>
              </div>
            </div>
            <CardDescription>
              Bạn đang nhận thông báo cho các kỹ năng sau
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="mb-2 flex items-center gap-2 font-medium">
                <Wrench className="h-4 w-4" />
                Kỹ năng đã đăng ký ({subscriber.skills?.length || 0})
              </h4>
              <div className="flex flex-wrap gap-2">
                {subscriber.skills?.map((skill: SkillSummary) => (
                  <Badge
                    key={skill.id}
                    variant="outline"
                    className="bg-orange-100 text-orange-700"
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleStartEdit}
                variant="outline"
                className="border border-orange-500 bg-white py-3 font-semibold text-orange-500 hover:border-orange-600 hover:bg-orange-50"
              >
                <Edit className="mr-2 h-4 w-4" />
                Chỉnh sửa
              </Button>

              <DeleteConfirmDialog
                onConfirm={handleDelete}
                description="Bạn chắc chắn muốn hủy đăng ký không?"
              >
                <Button variant="destructive">
                  <Trash className="mr-2 h-4 w-4" />
                  Hủy đăng ký
                </Button>
              </DeleteConfirmDialog>
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Subscription State */}
      {!subscriber && !isEditing && (
        <Card>
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
              <BellOff className="text-muted-foreground h-16 w-16" />
            </div>
            <CardTitle className="text-xl">
              Chưa đăng ký nhận thông báo
            </CardTitle>
            <CardDescription>
              Đăng ký ngay để nhận thông báo về các công việc phù hợp với kỹ
              năng của bạn
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => setIsEditing(true)} size="lg">
              <Bell className="mr-2 h-4 w-4" />
              Đăng ký ngay
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Edit/Create Form */}
      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {subscriber ? "Chỉnh sửa đăng ký" : "Đăng ký nhận thông báo"}
            </CardTitle>
            <CardDescription>
              {subscriber
                ? "Cập nhật kỹ năng để nhận thông báo phù hợp hơn"
                : "Chọn kỹ năng để nhận thông báo về các công việc phù hợp"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Bell className="h-4 w-4" />
              <AlertDescription>
                Chọn các kỹ năng mà bạn quan tâm. Hệ thống sẽ gửi thông báo khi
                có công việc yêu cầu những kỹ năng này.
              </AlertDescription>
            </Alert>

            <SkillSelection
              selectedSkills={selectedSkills}
              onAddSkill={addSkill}
              onRemoveSkill={removeSkill}
            />

            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleCreateOrUpdateSubscriber}
                disabled={isLoading || selectedSkills.length === 0}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" />
                {subscriber ? "Cập nhật" : "Đăng ký"}
              </Button>

              <Button
                variant="outline"
                onClick={handleCancelEdit}
                disabled={isLoading}
              >
                Hủy
              </Button>
            </div>

            {selectedSkills.length === 0 && (
              <Alert>
                <AlertDescription className="text-amber-600">
                  Vui lòng chọn ít nhất một kỹ năng để tiếp tục.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserSubscriberPage;
