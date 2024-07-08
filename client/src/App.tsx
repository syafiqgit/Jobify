import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { QueryClient } from "@tanstack/react-query";
import { userLoader } from "./lib/loaders/user.loader";
import Profile from "./pages/Profile";
import CreateJob from "./pages/CreateJob";
import { loginAction, registerAction } from "./lib/actions/auth.action";
import {
  createJobAction,
  deleteJobAction,
  editJobAction,
} from "./lib/actions/job.action";
import AllJobs from "./pages/AllJobs";
import { getJobById, jobsLoader } from "./lib/loaders/job.loader";
import Stats from "./pages/Stats";
import { statsLoader } from "./lib/loaders/stats.loader";
import Admin from "./pages/Admin";
import { adminLoader } from "./lib/loaders/admin.loader";
import ProtectedRoute from "./ProtectedRoute";
import { updateProfile } from "./lib/actions/user.action";
import EditJob from "./pages/EditJob";

export const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Login />,
          action: loginAction,
        },
        {
          path: "/register",
          element: <Register />,
          action: registerAction,
        },
        {
          path: "/home",
          element: <Home />,
          loader: userLoader,
          children: [
            {
              index: true,
              element: <AllJobs />,
              loader: jobsLoader,
            },
            {
              path: "profile",
              element: <Profile />,
              action: updateProfile,
            },
            {
              path: "create-job",
              element: <CreateJob />,
              action: createJobAction,
            },
            {
              path: "edit-job/:id",
              element: <EditJob/>,
              loader: getJobById,
              action: editJobAction,
            },
            {
              path: "delete-job/:id",
              action: deleteJobAction,
            },
            {
              path: "stats",
              element: <Stats />,
              loader: statsLoader,
            },
            {
              path: "admin",
              element: <Admin />,
              loader: adminLoader,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
