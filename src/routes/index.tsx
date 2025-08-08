import App from "@/App";
import AdminLayout from "@/components/layout/AdminLayout";
import About from "@/pages/About/About";
import Analytics from "@/pages/Analytics/Analytics";
import { createBrowserRouter } from "react-router";


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
  }, {
    path: "/admin",
    Component: AdminLayout,
    children: [
      {
       
        path: "analytics",
        Component: Analytics,
      }
]
  }
]);