import App from "@/App";
import About from "@/pages/About/About";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import Verify from "@/pages/Verify/Verify";
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