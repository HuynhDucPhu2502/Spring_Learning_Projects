// React router
import { createBrowserRouter, Navigate } from "react-router-dom";

// CLIENT PAGE
import RootPage from "@/pages/client";
import AuthPage from "@/pages/client/auth-page";
import HomePage from "@/pages/client/home-page";
import CompanyClientPage from "@/pages/client/company-page";
import CompanyDetailsClientPage from "@/pages/client/company-details-page";
import JobClientPage from "@/pages/client/job-page";
import JobDetailsClientPage from "@/pages/client/job-details-page";
import UserPage from "@/pages/user";
import UserInfoPage from "@/pages/user/user-info-page";
import UserResumePage from "@/pages/user/user-resume-page";
import UserSessionPage from "@/pages/user/user-session-page";

// ADMIN PAGE
import AdminPage from "@/pages/admin";
import CompanyManagerPage from "@/pages/admin/company-page";
import DashboardPage from "@/pages/admin/dashboard-page";
import RecruitmentManagerPage from "@/pages/admin/recruitment-page";
import SkillManagerAdminPage from "@/pages/admin/recruitment-page/skill-page";
import JobManagerPage from "@/pages/admin/recruitment-page/job-page";
import JobUpsertPage from "@/pages/admin/recruitment-page/job-upsert-page";
import ResumeManagerPage from "@/pages/admin/recruitment-page/resume-page";
import AccessControlPage from "@/pages/admin/access-control-page";
import PermissionManagerPage from "@/pages/admin/access-control-page/permission-page";
import RoleManagerPage from "@/pages/admin/access-control-page/role-page";
import UserManagerPage from "@/pages/admin/user-page/user-manager-page";
import UserUpsertPage from "@/pages/admin/user-page/user-upsert-page";
import UserSubscriberPage from "@/pages/user/user-subscriber-page";

// RECRUITER PAGE
import RecruiterPage from "@/pages/recruiter";
import SkillManagerRecruiterPage from "@/pages/recruiter/skill-page";
import ResumeManagerRecruiterPage from "@/pages/recruiter/resume-page";
import JobManagerRecruiterPage from "@/pages/recruiter/job-page";
import JobUpsertRecruiterPage from "@/pages/recruiter/job-upsert-page";
import CompanyManagerRecruiterPage from "@/pages/recruiter/self-company-page";
import MemberManagePage from "@/pages/recruiter/member-page";

// Components
import ErrorPage from "@/components/custom/ErrorPage";
import { ProtectedRoute } from "@/pages/commons/ProtectedRoute.tsx";

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
          {
            path: "subscriber",
            element: (
              <ProtectedRoute
                to="/user"
                requiredPermission="GET /subscribers/me"
              >
                <UserSubscriberPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "resumes",
            element: (
              <ProtectedRoute to="/user" requiredPermission="POST /resumes">
                <UserResumePage />
              </ProtectedRoute>
            ),
          },
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
    element: (
      <ProtectedRoute to="/" requiredPermission="GET /recruiter">
        <RecruiterPage />
      </ProtectedRoute>
    ),
    children: [
      // AUTO NAVIGATION
      { index: true, element: <Navigate to={"/recruiter/company"} /> },

      // SKILL MANAGER
      {
        path: "skills",
        element: (
          <ProtectedRoute to="/recruiter" requiredPermission="GET /skills">
            <SkillManagerRecruiterPage />
          </ProtectedRoute>
        ),
      },

      // RESUME RECRUITER MANAGER
      {
        path: "resumes",
        element: (
          <ProtectedRoute
            to="/recruiter"
            requiredPermission="GET /resumes/company"
          >
            <ResumeManagerRecruiterPage />
          </ProtectedRoute>
        ),
      },

      // RESUME RECRUITER MANAGER
      {
        path: "jobs",
        element: (
          <ProtectedRoute
            to="/recruiter"
            requiredPermission="GET /jobs/company"
          >
            <JobManagerRecruiterPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "jobs/upsert",
        element: <JobUpsertRecruiterPage />,
      },

      // COMPANY RECRUITER MANAGER
      {
        path: "company",
        element: (
          <ProtectedRoute
            to="/recruiter"
            requiredPermission="GET /companies/me"
          >
            <CompanyManagerRecruiterPage />
          </ProtectedRoute>
        ),
      },

      // MEMBER MANAGER
      {
        path: "members",
        element: (
          <ProtectedRoute
            to="/recruiter"
            requiredPermission="GET /companies/me/users"
          >
            <MemberManagePage />
          </ProtectedRoute>
        ),
      },

      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default router;
