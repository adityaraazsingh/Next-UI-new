// "use client"

// import { ChevronRight, type LucideIcon } from "lucide-react"

// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible"
// import {
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
// } from "@/components/ui/sidebar"

// export function NavMain({
//   items,
// }: {
//   items: {
//     title: string
//     url: string
//     icon?: LucideIcon
//     isActive?: boolean
//     items?: {
//       title: string
//       url: string
//     }[]
//   }[]
// }) {
//   return (
//     <SidebarGroup>
//       <SidebarGroupLabel>Channels</SidebarGroupLabel>
//       <SidebarMenu>
//         {items.map((item) => (
//           <Collapsible
//             key={item.title}
//             asChild
//             defaultOpen={item.isActive}
//             className="group/collapsible"
//           >
//             <SidebarMenuItem>
//               <CollapsibleTrigger asChild>
//                 <SidebarMenuButton tooltip={item.title}>
//                   {item.icon && <item.icon />}
//                   <span>{item.title}</span>
//                   <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//                 </SidebarMenuButton>
//               </CollapsibleTrigger>
//               <CollapsibleContent>
//                 <SidebarMenuSub>
//                   {item.items?.map((subItem) => (
//                     <SidebarMenuSubItem key={subItem.title}>
//                       <SidebarMenuSubButton asChild>
//                         <a href={subItem.url}>
//                           <span>{subItem.title}</span>
//                         </a>
//                       </SidebarMenuSubButton>
//                     </SidebarMenuSubItem>
//                   ))}
//                 </SidebarMenuSub>
//               </CollapsibleContent>
//             </SidebarMenuItem>
//           </Collapsible>
//         ))}
//       </SidebarMenu>
//     </SidebarGroup>
//   )
// }

"use client";

import { ChevronRight, type LucideIcon, AlertTriangle, Loader, HashIcon, UserIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useMemberId } from "@/hooks/use-member-id";
import { useChannelId } from "@/hooks/use-channel-id";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-worspace";
import { useGetChannels } from "@/features/Channels/api/use-get-channels";
import { useGetMember } from "@/features/members/api/use-get-member";
import { useCreateChannelModal } from "@/features/Channels/store/use-create-channel-modal";



export function NavMain() {
  const workspaceId = useWorkspaceId();
  const memberId = useMemberId();
  const channelId = useChannelId();

  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: channels } = useGetChannels({
    workspaceId,
  });
  const { data: members } = useGetMember({
    workspaceId,
  });
  const [_open, setOpen] = useCreateChannelModal();

  if (workspaceLoading || memberLoading) {
    return (
      <div className="flex flex-col bg-[#9564da] h-auto items-center justify-center">
        <Loader className="size-5 animate-spin text-white" />
      </div>
    );
  }

  if (!workspace || !member) {
    return (
      <div className="flex flex-col bg-[#9564da] h-auto items-center justify-center">
        <AlertTriangle className="size-5 text-white" />
        <p className="text-white">Workspace not found</p>
      </div>
    );
  }

  const sidebarItems = [
    {
      title: "Channels",
      url: "",
      icon: HashIcon, // Add # icons for channels
      isActive: false,
      items: channels?.map((channel) => ({
        title: channel.name,
        url: `/workspaces/${workspaceId}/channel/${channel._id}`,
      })),
    },
    {
      title: "Direct Messages",
      url: "",
      icon: UserIcon, // Add lucide-react UserIcon for Direct Messages
      isActive: false,
      items: members
        ?.filter((memberItem) => memberItem !== member) // Exclude current user
        .map((memberItem) => ({
          title: memberItem.user.name,
          url: `/workspaces/${workspaceId}/member/${memberItem._id}`,
        })),
    }
    ,
  ];

  return (
    <SidebarGroup>
      
      <SidebarMenu>
        {sidebarItems.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {item.items && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
