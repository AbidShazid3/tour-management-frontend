import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About/About";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import Verify from "@/pages/Verify/Verify";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/Unauthorized";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import Tours from "@/pages/Tours/Tours";
import TourDetails from "@/pages/TourDetails/TourDetails";
import Booking from "@/pages/Booking/Booking";
import Homepage from "@/pages/Homepage/Homepage";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Homepage
      },
      {
        path: "about",
        Component: withAuth(About)
      },
      {
        path: "tours",
        Component: Tours
      },
      {
        path: "tours/:slug",
        Component: TourDetails
      },
      {
        path: "booking",
        Component: Booking
      },
    ]
  },
  {
    path: "/admin",
    Component: withAuth(DashboardLayout, role.SUPER_ADMIN as TRole),
    children: [
      { index: true, element: <Navigate to={'/admin/analytics'} /> },
      ...generateRoutes(adminSidebarItems)
    ],
  },
  {
    path: "/user",
    Component: withAuth(DashboardLayout, role.USER as TRole),
    children: [
      { index: true, element: <Navigate to={'/user/bookings'} /> },
      ...generateRoutes(userSidebarItems)
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/verify",
    Component: Verify,
  },
  {
    path: "/unauthorized",
    Component: Unauthorized,
  },
]);