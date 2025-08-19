import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About/About";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import Verify from "@/pages/Verify/Verify";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "about",
        Component: About
      }
    ]
  },
  {
    path: "/admin",
    Component: DashboardLayout,
    children: [...generateRoutes(adminSidebarItems)],
  },
  {
    path: "/user",
    Component: DashboardLayout,
    children: [...generateRoutes(userSidebarItems)],
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
]);