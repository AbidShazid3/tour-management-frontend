import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { userSidebarItems } from "@/routes/userSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (UserRole: TRole) => {

    switch (UserRole) {
        case role.SUPER_ADMIN:
            return [...adminSidebarItems];
        case role.ADMIN:
            return [...adminSidebarItems];
        case role.USER:
            return [...userSidebarItems];
        default:
            return [];
    }
}