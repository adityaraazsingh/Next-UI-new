"use client"
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-worspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import {
  AlertTriangle,
  Loader,
} from "lucide-react";

import { useGetMember } from "@/features/members/api/use-get-member";

import { useCreateChannelModal } from "@/features/Channels/store/use-create-channel-modal";

import { useChannelId } from "@/hooks/use-channel-id";
import { useGetChannels } from "@/features/Channels/api/use-get-channels";
import { useMemberId } from "@/hooks/use-member-id";
import * as React from "react"
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,

} from "lucide-react"

import { NavMain } from "@/app/workspaces/[workspaceId]/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button";
import { ModeToggle } from "./modeToggle";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  
  // projects: [
  //   {
  //     name: "Design ",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Video Call",
  //     url: "#",
  //     icon: VideoIcon,
  //   },
    
  // ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {


  const memberId= useMemberId();

  const channelId= useChannelId();

  const workspaceId = useWorkspaceId();

  
  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: channels,  } = useGetChannels({
    workspaceId,
  });
  const { data: members,  } = useGetMember({
    workspaceId,
  });
  const [_open , setOpen] = useCreateChannelModal();


  if (workspaceLoading || memberLoading) {
    return (
      <div className="flex flex-col  h-auto items-center justify-center ">
        <Loader className="size-5 animate-spin text-white" />
      </div>
    );
  }

  if (!workspace || !member) {
    return (
      <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <WorkspaceSwitcher/> */}
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain  />
        {/* <NavProjects 
        workspace={workspace}
        isAdmin={member.role === "admin"} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser  />
        
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
    );
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <WorkspaceSwitcher/> */}
        <TeamSwitcher teams={data.teams} />
        {/* <span className="gap-4">

        <Button variant='outline'> Theme </Button>
        <ModeToggle/>
        </span> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain  />
        <NavProjects 
        workspace={workspace}
        isAdmin={member.role === "admin"} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser  />
        
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
