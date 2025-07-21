// React router
import { createBrowserRouter, Navigate } from "react-router-dom";

// CLIENT PAGE
import RootPage from "@/pages/client";
import AuthPage from "@/pages/client/auth-page";
import HomePage from "@/pages/client/home-page";
import CompanyClientPage from "@/pages/client/company-page";
import CompanyDetailsClientPage from "@/pages/client/company-page/details";
import JobClientPage from "@/pages/client/job-page";
import JobDetailsClientPage from "@/pages/client/job-page/details";
import UserPage from "@/pages/user";
import UserInfoPage from "@/pages/user/user-info-page";
import UserResumePage from "@/pages/user/user-resume-page";
import UserSessionPage from "@/pages/user/user-session-page";

// ADMIN PAGE
import AdminPage from "@/pages/admin";
import CompanyManagerPage from "@/pages/admin/company-page";
import DashboardPage from "@/pages/admin/dashboard-page";
import RecruitmentManagerPage from "@/pages/admin/recruitment-page";
import SkillManagerAdminPage from "@/pages/admin/recruitment-page/skill-manage-page";
import JobManagerPage from "@/pages/admin/recruitment-page/job-manager-page";
import JobUpsertPage from "@/pages/admin/recruitment-page/job-manager-page/job-upsert-page";
import ResumeManagerPage from "@/pages/admin/resume-page";
import AccessControlPage from "@/pages/admin/access-control-page";
import PermissionManagerPage from "@/pages/admin/access-control-page/permission-page";
import RoleManagerPage from "@/pages/admin/access-control-page/role-page";
import UserManagerPage from "@/pages/admin/user-page";
import UserUpsertPage from "@/pages/admin/user-page/user-upsert-page";

// RECRUITER PAGE
import RecruiterPage from "@/pages/recruiter";
import SkillManagerRecruiterPage from "@/pages/recruiter/skill-manager-page";

// Components
import ErrorPage from "@/components/custom/ErrorPage";
import { ProtectedRoute } from "@/pages/common/ProtectedRoute.tsx";

const router = createBrowserRouter([
  // =========================
  // CLIENT ROUTE GROUP
  // =========================
  {
    path: "",
    element: <RootPage />,
    children: [
      { index: true, element: <Navigate to={"/home"} /> },
      { path: "home", element: <HomePage /> },
      { path: "auth", element: <AuthPage /> },
      { path: "companies", element: <CompanyClientPage /> },
      { path: "companies/:id", element: <CompanyDetailsClientPage /> },
      { path: "jobs", element: <JobClientPage /> },
      { path: "jobs/:id", element: <JobDetailsClientPage /> },
      {
        path: "user",
        element: <UserPage />,
        children: [
          {
            index: true,
            element: <Navigate to={"info"} />,
          },
          { path: "info", element: <UserInfoPage /> },
          { path: "resumes", element: <UserResumePage /> },
          { path: "sessions", element: <UserSessionPage /> },
        ],
      },
    ],
  },

  // =========================
  // ADMIN ROUTE GROUP
  // =========================
  {
    path: "admin",
    element: (
      <ProtectedRoute to="/" requiredPermission={"GET /admin"}>
        <AdminPage />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      // AUTO NAVIGATION
      { index: true, element: <Navigate to={"/admin/dashboard"} /> },

      // DASHBOARD
      { path: "dashboard", element: <DashboardPage /> },

      // COMPANY MANAGER
      {
        path: "company",
        element: (
          <ProtectedRoute to="/admin" requiredPermission="GET /companies">
            <CompanyManagerPage />
          </ProtectedRoute>
        ),
      },

      // RECRUITMENT MANAGER
      {
        path: "recruitment",
        element: <RecruitmentManagerPage />,
        children: [
          {
            index: true,
            element: <Navigate to={"/admin/recruitment/job-manager"} />,
          },
          {
            path: "skill-manager",
            element: (
              <ProtectedRoute to="/admin" requiredPermission="GET /skills">
                <SkillManagerAdminPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "job-manager",
            element: (
              <ProtectedRoute to="/admin" requiredPermission="GET /jobs">
                <JobManagerPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "job-manager/upsert",
            element: <JobUpsertPage />,
          },
        ],
      },

      // RESUME MANAGER
      {
        path: "resume",
        element: (
          <ProtectedRoute to="/admin" requiredPermission="GET /resumes">
            <ResumeManagerPage />
          </ProtectedRoute>
        ),
      },

      // USER MANAGER
      {
        path: "user-manager",
        element: (
          <ProtectedRoute to="/admin" requiredPermission="GET /users">
            <UserManagerPage />
          </ProtectedRoute>
        ),
      },
      { path: "user-manager/upsert", element: <UserUpsertPage /> },

      // ACCESS CONTROL MANAGER
      {
        path: "access-control",
        element: <AccessControlPage />,
        children: [
          {
            index: true,
            element: <Navigate to={"/admin/access-control/permission"} />,
          },
          {
            path: "permission",
            element: (
              <ProtectedRoute
                to="/admin"
                requiredPermission="GET /permissions/*"
              >
                <PermissionManagerPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "role",
            element: (
              <ProtectedRoute to="/admin" requiredPermission="GET /roles">
                <RoleManagerPage />
              </ProtectedRoute>
            ),
          },
        ],
      },

      // NOT FOUND
      { path: "*", element: <ErrorPage /> },
    ],
  },

  // =========================
  // RECRUITER ROUTE GROUP
  // =========================
  {
    path: "recruiter",
    element: <RecruiterPage />,
    children: [
      {
        path: "skill-manager",
        element: (
          <ProtectedRoute to="/recruiter" requiredPermission="GET /skills">
            <SkillManagerRecruiterPage />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default router;
