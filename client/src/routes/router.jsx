import { createBrowserRouter } from "react-router";
import ErrorPage from "../pages/ErrorPage";
import LoadingSpinner from "../components/LoadingSpinner";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";
import Register from "../pages/Register";
import Login from "../pages/Login";
import CourseDetails from "../pages/CourseDetails";
import AllCourses from "../components/AllCourses";
import MyEnrolledCourse from "../pages/MyEnrolledCourse";
import AddCourse from "../pages/AddCourse";
import MyAddedCourse from "../pages/MyAddedCourse";
import AboutUs from "../pages/AboutUs";
import ProfilePage from "../pages/ProfilePage";
import UpdateCourse from "../pages/UpdateCourse";
import MainLayout from "../layout/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <LoadingSpinner />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/courses",
        element: <AllCourses />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/courses/:id",
        element: (
          <PrivateRoute>
            <CourseDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard/my-enrolled",
        element: (
          <PrivateRoute>
            <MyEnrolledCourse />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/add-course",
        element: (
          <PrivateRoute>
            <AddCourse />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-course/:id",
        element: (
          <PrivateRoute>
            <UpdateCourse />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-added",
        element: (
          <PrivateRoute>
            <MyAddedCourse />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
