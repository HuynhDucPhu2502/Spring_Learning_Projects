import { getErrorMessage } from "@/features/slices/auth/authThunk";
import { getSessions, removeSessionId } from "@/services/authApi";
import type { SessionMetaResponse } from "@/types/user";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut, Shield, Clock, AlertTriangle } from "lucide-react";
import {
  getBrowserInfo,
  getDeviceIcon,
  getLocationInfo,
} from "@/utils/sessionHelper";
import { formatLoginTime } from "@/utils/convertHelper";
import { DeleteConfirmDialog } from "@/components/custom/DeleteConfirmationDialog";

const UserSessionPage = () => {
  // Data
  const [sessions, setSessions] = useState<SessionMetaResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState<string | null>(null);

  // Fetching Data
  const fetchSessions = async () => {
    try {
      setIsLoading(true);

      const res = (await getSessions()).data;
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

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleLogoutSession = async (sessionId: string) => {
    try {
      setIsLoggingOut(sessionId);
      await removeSessionId(sessionId);
      toast.success("Đăng xuất phiên thành công");
      fetchSessions();
    } catch (err) {
      toast.error(getErrorMessage(err, "Không thể đăng xuất phiên này"));
    } finally {
      setIsLoggingOut(null);
    }
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
                  <div className="grid grid-cols-3">
                    <div className="flex items-center gap-3">
                      {getDeviceIcon(session.deviceType)}
                      <div>
                        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                          {session.deviceName}
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
                      <div></div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <DeleteConfirmDialog
                          onConfirm={() =>
                            handleLogoutSession(session.sessionId)
                          }
                        >
                          <Button
                            variant="outline"
                            size="sm"
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
                        </DeleteConfirmDialog>
                      </div>
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
