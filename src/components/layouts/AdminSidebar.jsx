import { LucideFileText } from "lucide-react";
import Logo from "../Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import User from "../User";
import { Link, useLocation } from "react-router";

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <div className="flex mx-auto my-4">
            <Logo />
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-lg font-semibold">
              Quản lý
            </SidebarGroupLabel>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={location.pathname.startsWith("/admin/questions")}
              >
                <Link
                  to={"/admin/questions"}
                  className="flex items-center gap-3"
                >
                  <LucideFileText className="w-5 h-5" />
                  <span>Câu hỏi</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* <SidebarMenuItem>
              <SidebarMenuButton>
                <Link to={"/admin/tests"} className="flex items-center gap-3">
                  <LucideFileText className="w-5 h-5" />
                  <span>Bộ đề</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem> */}
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <div className="flex flex-col mx-auto gap-4 mb-4">
            <User />
          </div>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default AdminSidebar;
