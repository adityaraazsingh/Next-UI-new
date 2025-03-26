import { UserButton } from "@/features/auth/components/user-button";
import { WorkspaceSwitcher } from "./workspaceswitcher";
import { SidebarButton } from "./sidebarbutton";
import { Bell, Home, MessagesSquare, MoreHorizontal } from "lucide-react";
import { usePathname } from "next/navigation";


export const Sidebar = () => {
  const pathname = usePathname();


  return (
    <aside className="w-[70px] h-auto bg-[#481493]  ">
      <div className="flex flex-col items-center justify-between gap-y-1 mt-auto h-full">
        <div className="flex flex-col justify-evenly p-1 gap-y-3">
          <WorkspaceSwitcher />
          
          <SidebarButton
            icon={Home}
            label="Home"
            
            isActive={pathname.includes("/workspaces")}
          />
          <SidebarButton icon={MessagesSquare} label="DMs" />
          <SidebarButton icon={Bell} label="Activity" />
          <SidebarButton icon={MoreHorizontal} label="More" />
        </div>
        <div>
          <UserButton />
        </div>
      </div>
    </aside>
  );
};
