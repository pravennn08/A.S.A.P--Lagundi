import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./pages/public/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import AdminLayout from "./components/layout/AdminLayout";
import PersonnelLayout from "./components/layout/PersonnelLayout";
import ReportForm from "./pages/public/ReportForm";
import ReportsManagement from "./pages/report/ReportsManagement";
import UserManagement from "./pages/users/UserManagement";
import ScheduleManagement from "./pages/users/ScheduleManagement";
import Notifications from "./pages/notifications/Notifications";
import Settings from "./pages/settings/Settings";
import Spinner from "./utils/Spinner.jsx";
import { useAuthStore } from "./store/useAuthStore.js";
import { useEffect } from "react";
import ReportSuccessPage from "./pages/public/ReportSuccessPage.jsx";

function App() {
  const { isCheckingAuth, isAuthenticated, checkUserAuth, user } =
    useAuthStore();

  const ProtectRoute = ({ children, role }) => {
    if (isCheckingAuth) return <Spinner />;

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    if (role && user?.role !== role) {
      return <Navigate to="/" />;
    }

    return children;
  };

  useEffect(() => {
    checkUserAuth();
  }, []);

  console.log("IsAuthenticated:", isAuthenticated);
  console.log("User:", user);

  if (isCheckingAuth) return <Spinner />;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/login"
          element={
            isAuthenticated ? (
              user?.role === "admin" ? (
                <Navigate to="/admin/dashboard" />
              ) : (
                <Navigate to="/personnel/dashboard" />
              )
            ) : (
              <LoginPage />
            )
          }
        />

        <Route path="/ReportForm" element={<ReportForm />} />
        <Route path="/ReportSuccess" element={<ReportSuccessPage />} />

        <Route
          path="/admin"
          element={
            <ProtectRoute role="admin">
              <AdminLayout />
            </ProtectRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="reports" element={<ReportsManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="scheduling" element={<ScheduleManagement />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/*  Personnel routes  */}
        <Route
          path="/personnel"
          element={
            <ProtectRoute role="tanod">
              <PersonnelLayout />
            </ProtectRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="reports" element={<ReportsManagement />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </>,
    ),
  );

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
