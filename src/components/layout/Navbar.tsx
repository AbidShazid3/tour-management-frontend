import Logo from "@/assets/icons/Logo"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "./ModeTggler"
import { Link } from "react-router"
import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { toast } from "sonner"
import { useAppDispatch } from "@/redux/hook"
import { role } from "@/constants/role"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/user", label: "Dashboard", role: role.USER },
  { href: "/admin", label: "Dashboard", role: role.ADMIN },
  { href: "/admin", label: "Dashboard", role: role.SUPER_ADMIN },
]

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
    toast.success('Logout successfully');
  }

  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full h-full">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
                <SheetDescription>
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col h-full">
                <nav className="flex flex-col items-center justify-center gap-4 text-lg font-medium">
                  {navigationLinks.map((link, index) => {
                    if (link.role === "PUBLIC" || link.role === data?.data?.role) {
                      return (
                        <SheetClose asChild key={index}>
                          <Link
                            to={link.href}
                            className="hover:text-primary">
                            {link.label}
                          </Link>
                        </SheetClose>
                      )
                    }
                    return null
                  })}
                </nav>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button className="cursor-pointer" size={"sm"}>Close</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Link to={'/'} className="text-primary hover:text-primary/90">
              <Logo />
            </Link>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => {
                  if (link.role === 'PUBLIC' || link.role === data?.data?.role) {
                    return (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                          asChild
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        >
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )
                  }
                  return null
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          {data?.data?.email && (
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-sm cursor-pointer"
            >
              Logout
            </Button>
          )}
          {!data?.data?.email && (
            <Button asChild className="text-sm cursor-pointer">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
