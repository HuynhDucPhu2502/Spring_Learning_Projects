import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch } from "@/features/hooks";
import {
  getAccount,
  getErrorMessage,
} from "@/features/slices/auth/authThunk.ts";
import { getUserDetails } from "@/services/authApi.ts";
import {
  selfUserAvatarUpdateApi,
  selfUserPasswordUpdateApi,
  selfUserProfileUpdateApi,
} from "@/services/userApi";
import type {
  SelfUserUpdatePasswordRequestDto,
  SelfUserUpdateProfileRequestDto,
  UserDetailsResponseDto,
} from "@/types/user.d.ts";
import {
  Cake,
  Calendar,
  Camera,
  Clock,
  Edit,
  Lock,
  Mail,
  MapPin,
  Shield,
  User,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import AvatarUploadForm from "./AvatarUploadForm";
import PasswordChangeForm from "./PasswordChangeForm";
import ProfileEditForm from "./ProfileEditForm";

const UserInfoPage = () => {
  const dispatch = useAppDispatch();

  // Data
  const [userDetails, setUserDetails] = useState<UserDetailsResponseDto>();
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Avatar versionning
  const [avatarVersion, setAvatarVersion] = useState(Date.now());

  // Form State
  const [isOpenProfileEditForm, setIsOpenProfileEditForm] = useState(false);
  const [isOpenPasswordChangeForm, setIsOpenPasswordChangeForm] =
    useState(false);
  const [isOpenAvatarUploadForm, setIsOpenAvatarUploadForm] = useState(false);

  // Ref
  const profileFormRef = useRef<HTMLDivElement | null>(null);
  const passwordFormRef = useRef<HTMLDivElement | null>(null);

  // ======================================
  // Handle Fetching User Details
  // ====================================
  const fetchUserDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getUserDetails();
      setUserDetails(res.data.data);

      setAvatarVersion(Date.now());
    } catch (err) {
      toast.error(
        getErrorMessage(
          err,
          "Không thể lấy thông tin chi tiết người dùng thất bại",
        ),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  // ======================================
  // Handle Open Form
  // ======================================
  useEffect(() => {
    if (isOpenProfileEditForm && profileFormRef.current) {
      profileFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isOpenProfileEditForm]);

  useEffect(() => {
    if (isOpenPasswordChangeForm && passwordFormRef.current) {
      passwordFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isOpenPasswordChangeForm]);

  // ======================================
  // Handle Actions Call API
  // ======================================
  const handleUpdateProfile = async (data: SelfUserUpdateProfileRequestDto) => {
    try {
      setIsUpdating(true);
      await selfUserProfileUpdateApi(data);
      await fetchUserDetails();
      dispatch(getAccount());
      toast.success("Cập nhật thông tin thành công");
      setIsOpenProfileEditForm(false);
    } catch (err) {
      toast.error(getErrorMessage(err, "Thao tác thất bại"));
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdatePassword = async (
    data: SelfUserUpdatePasswordRequestDto,
  ) => {
    try {
      setIsUpdating(true);
      await selfUserPasswordUpdateApi(data);
      await fetchUserDetails();
      toast.success("Cập nhật mật khẩu thành công");
      setIsOpenPasswordChangeForm(false);
    } catch (err) {
      toast.error(getErrorMessage(err, "Thao tác thất bại"));
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAvatarUpload = async (avatarFile: File) => {
    try {
      setIsUpdating(true);

      const data = new FormData();
      if (avatarFile) data.append("avatar", avatarFile);
      else toast.error("File ảnh không được trống");

      await selfUserAvatarUpdateApi(data);
      await fetchUserDetails();
      dispatch(getAccount());
      setAvatarVersion(Date.now());
      toast.success("Cập nhật ảnh đại diện thành công");
      setIsOpenAvatarUploadForm(false);
    } catch (err) {
      toast.error(getErrorMessage(err, "Thao tác thất bại"));
    } finally {
      setIsUpdating(false);
    }
  };

  // ===================
  // Helper Functions
  // ===================
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDateOfBirth = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getGenderLabel = (gender: string) => {
    switch (gender) {
      case "MALE":
        return "Nam";
      case "FEMALE":
        return "Nữ";
      case "OTHER":
        return "Khác";
      default:
        return gender;
    }
  };

  const getGenderColor = (gender: string) => {
    switch (gender) {
      case "MALE":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "FEMALE":
        return "bg-pink-100 text-pink-800 border-pink-200";
      case "OTHER":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-orange-100 text-orange-800 border-orange-200";
    }
  };

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 p-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-1">
              <CardContent className="p-6">
                <div className="space-y-4 text-center">
                  <Skeleton className="mx-auto h-32 w-32 rounded-full" />
                  <Skeleton className="mx-auto h-6 w-32" />
                  <Skeleton className="mx-auto h-4 w-20" />
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-2">
              <CardContent className="space-y-6 p-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-white to-amber-50 p-6">
        <Card className="w-full max-w-md">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">
              Không thể tải thông tin người dùng
            </p>
            <Button
              onClick={fetchUserDetails}
              className="bg-orange-500 text-white hover:bg-orange-600"
            >
              Thử lại
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      {/* PROFILE */}
      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="border-orange-200 shadow-lg lg:col-span-1">
          <CardContent className="p-6">
            <div className="space-y-6 text-center">
              {/* Avatar with Camera Hover */}
              <div className="group relative inline-block">
                <Avatar className="h-32 w-32 border-4 border-gray-200">
                  <AvatarImage
                    src={
                      userDetails.logoUrl
                        ? `${userDetails.logoUrl}?v=${avatarVersion}`
                        : "/placeholder.svg"
                    }
                    alt={userDetails.name}
                  />
                  <AvatarFallback className="bg-blue-500 text-2xl font-bold text-white">
                    {getUserInitials(userDetails.name)}
                  </AvatarFallback>
                </Avatar>

                {/* Camera Overlay */}
                <div
                  className="bg-opacity-50 absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-gray-300 opacity-0 transition-opacity duration-200 group-hover:opacity-90"
                  onClick={() => setIsOpenAvatarUploadForm(true)}
                >
                  <Camera className="h-8 w-8 text-white" />
                </div>
              </div>

              {/* User Info */}
              <div>
                <h2 className="mb-1 text-2xl font-bold text-gray-900">
                  {userDetails.name}
                </h2>
                <p className="mb-3 font-medium text-orange-600">
                  #{userDetails.id}
                </p>
                <Badge
                  className={`${getGenderColor(userDetails.gender)} border px-3 py-1 text-sm`}
                >
                  {getGenderLabel(userDetails.gender)}
                </Badge>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={() => setIsOpenProfileEditForm(true)}
                  className="w-full bg-orange-500 text-white hover:bg-orange-600"
                  size="lg"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Cập nhật thông tin
                </Button>

                <Button
                  onClick={() => setIsOpenPasswordChangeForm(true)}
                  variant="outline"
                  className="w-full border-orange-500 bg-transparent text-orange-600 hover:bg-orange-50"
                  size="lg"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Đổi mật khẩu
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Details Card */}
        <Card className="border-orange-200 shadow-lg lg:col-span-2">
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Personal Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 font-semibold text-orange-700">
                  <User className="h-5 w-5" />
                  <span>Thông tin cá nhân</span>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <div className="mb-2 flex items-center gap-3">
                      <Mail className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-medium text-gray-600">
                        Email
                      </span>
                    </div>
                    <p className="pl-7 font-medium text-gray-900">
                      {userDetails.email}
                    </p>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4">
                    <div className="mb-2 flex items-center gap-3">
                      <Cake className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-medium text-gray-600">
                        Ngày sinh
                      </span>
                    </div>
                    <p className="pl-7 font-medium text-gray-900">
                      {formatDateOfBirth(userDetails.dob)}
                    </p>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4">
                    <div className="mb-2 flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-medium text-gray-600">
                        Địa chỉ
                      </span>
                    </div>
                    <p className="pl-7 font-medium text-gray-900">
                      {userDetails.address}
                    </p>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4">
                    <div className="mb-2 flex items-center gap-3">
                      <Users className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-medium text-gray-600">
                        Giới tính
                      </span>
                    </div>
                    <p className="pl-7 font-medium text-gray-900">
                      {getGenderLabel(userDetails.gender)}
                    </p>
                  </div>
                </div>
              </div>

              {/* System Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 font-semibold text-orange-700">
                  <Shield className="h-5 w-5" />
                  <span>Thông tin hệ thống</span>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <div className="mb-2 flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-medium text-gray-600">
                        Ngày tạo tài khoản
                      </span>
                    </div>
                    <p className="pl-7 font-medium text-gray-900">
                      {formatDate(userDetails.createdAt)}
                    </p>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4">
                    <div className="mb-2 flex items-center gap-3">
                      <Clock className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-medium text-gray-600">
                        Cập nhật lần cuối
                      </span>
                    </div>
                    <p className="pl-7 font-medium text-gray-900">
                      {formatDate(userDetails.updatedAt)}
                    </p>
                  </div>

                  {/* Additional Info Card */}
                  <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                    <h4 className="mb-2 font-semibold text-orange-800">
                      Trạng thái tài khoản
                    </h4>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-sm text-gray-700">
                        Tài khoản đang hoạt động
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Forms */}

      {userDetails && (
        <div>
          <div ref={profileFormRef}>
            {isOpenProfileEditForm && (
              <ProfileEditForm
                userDetails={userDetails}
                onSubmit={handleUpdateProfile}
                onCancel={() => setIsOpenProfileEditForm(false)}
                isLoading={isUpdating}
              />
            )}
          </div>

          <div ref={passwordFormRef}>
            {isOpenPasswordChangeForm && (
              <PasswordChangeForm
                onSubmit={handleUpdatePassword}
                onCancel={() => setIsOpenPasswordChangeForm(false)}
                isLoading={isUpdating}
              />
            )}
          </div>

          {isOpenAvatarUploadForm && (
            <AvatarUploadForm
              currentAvatarUrl={
                userDetails.logoUrl
                  ? `${userDetails.logoUrl}?v=${avatarVersion}`
                  : "/placeholder.svg"
              }
              userName={userDetails.name}
              onSubmit={handleAvatarUpload}
              onCancel={() => setIsOpenAvatarUploadForm(false)}
              isLoading={isUpdating}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default UserInfoPage;
