"use client";

import { getErrorMessage } from "@/features/slices/auth/authThunk";
import { getSessions } from "@/services/authApi";
import type { SessionMetaResponse } from "@/types/user.types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  LogOut,
  Shield,
  Clock,
  MapPin,
  AlertTriangle,
} from "lucide-react";

const UserSessionPage = () => {
  const [sessions, setSessions] = useState<SessionMetaResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState<string | null>(null);

  // console.log(sessions);

  const fetchSessions = async () => {
    try {
      setIsLoading(true);
      const res = (await getSessions()).data;
      // Sort sessions: current session first, then by login time (newest first)
      const sortedSessions = res.data.sort(
        (a: SessionMetaResponse, b: SessionMetaResponse) => {
          if (a.current && !b.current) return -1;
          if (!a.current && b.current) return 1;
          return new Date(b.loginAt).getTime() - new Date(a.loginAt).getTime();
        },
      );
      setSessions(sortedSessions);
    } catch (err) {
      toast.error(
        getErrorMessage(err, "Không thể lấy danh sách phiên đăng nhập."),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoutSession = async (sessionId: string) => {
    try {
      setIsLoggingOut(sessionId);
      // TODO: Implement actual logout session API call
      // await logoutSession(sessionId)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Remove session from list
      setSessions((prev) =>
        prev.filter((_, index) => index.toString() !== sessionId),
      );
      toast.success("Đã đăng xuất phiên thành công");
    } catch (err) {
      toast.error(getErrorMessage(err, "Không thể đăng xuất phiên này"));
    } finally {
      setIsLoggingOut(null);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  // Helper functions
  const getDeviceIcon = (deviceType?: string | null) => {
    if (!deviceType) return <Globe className="h-5 w-5 text-orange-500" />;

    switch (deviceType.toLowerCase()) {
      case "mobile":
      case "smartphone":
        return <Smartphone className="h-5 w-5 text-orange-500" />;
      case "tablet":
        return <Tablet className="h-5 w-5 text-orange-500" />;
      case "desktop":
      case "computer":
        return <Monitor className="h-5 w-5 text-orange-500" />;
      default:
        return <Globe className="h-5 w-5 text-orange-500" />;
    }
  };

  const formatLoginTime = (loginAt: string) => {
    const date = new Date(loginAt);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    switch (true) {
      case diffMinutes < 1:
        return "Vừa đăng nhập";
      case diffMinutes < 5:
        return "Dưới 5 phút trước";
      case diffMinutes < 15:
        return "Dưới 15 phút trước";
      case diffMinutes < 30:
        return "Dưới 30 phút trước";
      case diffMinutes < 60:
        return `${diffMinutes} phút trước`;
      case diffHours === 1:
        return "1 giờ trước";
      case diffHours < 24:
        return `${diffHours} giờ trước`;
      case diffDays === 1:
        return "1 ngày trước";
      case diffDays < 7:
        return `${diffDays} ngày trước`;
      default:
        return date.toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
    }
  };

  const getBrowserInfo = (userAgent?: string | null) => {
    if (!userAgent) return "Trình duyệt không xác định";
    if (userAgent.includes("Chrome")) return "Chrome";
    if (userAgent.includes("Firefox")) return "Firefox";
    if (userAgent.includes("Safari")) return "Safari";
    if (userAgent.includes("Edge")) return "Edge";
    if (userAgent.includes("Opera")) return "Edge";
    return "Trình duyệt khác";
  };

  const getLocationInfo = (userAgent?: string | null) => {
    if (!userAgent) return "Không xác định";
    if (userAgent.includes("Windows")) return "Windows";
    if (userAgent.includes("Mac")) return "macOS";
    if (userAgent.includes("Linux")) return "Linux";
    if (userAgent.includes("Android")) return "Android";
    if (userAgent.includes("iOS")) return "iOS";
    return "Không xác định";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-6">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <Skeleton className="mb-2 h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Phiên đăng nhập
          </h1>
          <p className="text-gray-600">
            Quản lý các thiết bị đã đăng nhập vào tài khoản của bạn
          </p>
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
          {sessions.length === 0 ? (
            <Card className="border-orange-200">
              <CardContent className="py-12 text-center">
                <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-orange-400" />
                <p className="text-gray-600">Không có phiên đăng nhập nào</p>
              </CardContent>
            </Card>
          ) : (
            sessions.map((session, index) => (
              <Card
                key={index}
                className={`border-2 shadow-lg transition-all duration-200 hover:shadow-xl ${
                  session.current
                    ? "border-orange-400 bg-gradient-to-r from-orange-50 to-amber-50"
                    : "border-orange-200 hover:border-orange-300"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getDeviceIcon(session.deviceType)}
                      <div>
                        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                          {session.deviceName}
                          {session.current && (
                            <Badge className="border-green-200 bg-green-100 text-xs text-green-800">
                              <Shield className="mr-1 h-3 w-3" />
                              Phiên hiện tại
                            </Badge>
                          )}
                        </CardTitle>
                        <p className="mt-1 text-sm text-gray-600">
                          {getBrowserInfo(session.userAgent)} •{" "}
                          {getLocationInfo(session.userAgent)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="h-4 w-4 text-orange-500" />
                      <div>
                        <span className="font-medium text-gray-700">
                          Thời gian đăng nhập:
                        </span>
                        <p className="text-gray-600">
                          {formatLoginTime(session.loginAt)}
                        </p>
                      </div>
                    </div>

                    {session.current ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleLogoutSession(index.toString())}
                        disabled={isLoggingOut === index.toString()}
                        className="border-red-300 text-red-600 hover:border-red-400 hover:bg-red-50"
                      >
                        {isLoggingOut === index.toString() ? (
                          <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
                            Đang đăng xuất...
                          </>
                        ) : (
                          <>
                            <LogOut className="mr-2 h-4 w-4" />
                            Đăng xuất
                          </>
                        )}
                      </Button>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* User Agent Details */}
                  <div className="mt-4 rounded-lg bg-gray-50 p-3">
                    <p className="mb-1 text-xs font-medium text-gray-500">
                      Chi tiết trình duyệt:
                    </p>
                    <p className="text-xs break-all text-gray-600">
                      {session.userAgent}
                    </p>
                  </div>

                  {session.current && (
                    <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-600" />
                        <p className="text-sm font-medium text-green-800">
                          Đây là phiên đăng nhập hiện tại của bạn
                        </p>
                      </div>
                      <p className="mt-1 text-xs text-green-600">
                        Bạn không thể đăng xuất phiên này. Để đăng xuất, vui
                        lòng sử dụng nút đăng xuất chính.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSessionPage;
