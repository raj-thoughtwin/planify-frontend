import { Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import Dashboard from "../pages/Dashboard";
import Login from "../components/auth/LoginComponent";
import Register from "../components/auth/RegisterComponent";
import Settings from "../pages/Settings";
import ProtectedRoute from "./ProtectedRoute";
import ChatComponent from "../components/ChatComponent";
import CreateTask from "../pages/CreateTask";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes Wrapper */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
         <Route
          path="/create-task"
          element={
            <Layout>
              <CreateTask />
            </Layout>
          }
        />
        <Route
        path="/chat"
        element={
          <Layout>
            <ChatComponent />
          </Layout>
        }
        ></Route>
        <Route
          path="/settings"
          element={
            <Layout>
              <Settings />
            </Layout>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
