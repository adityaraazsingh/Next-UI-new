"use client";

import {
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
  type LucideIcon,
  UserPlus,
  VideoIcon,
  WavesIcon,
} from "lucide-react";

import { Doc } from "../../convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useState } from "react";
import { InviteModal } from "@/app/workspaces/[workspaceId]/invite-modal";
import { PreferencesModal } from "@/app/workspaces/[workspaceId]/preferences-modal";
import Link from "next/link";

interface NavProjectsProps {
  workspace: Doc<"workspaces">;
  isAdmin: boolean;
}

export function NavProjects({ workspace, isAdmin }: NavProjectsProps) {
  // State for modals
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);

  return (
    <>
      {/* Include Modals */}
      <InviteModal
        open={inviteOpen}
        setOpen={setInviteOpen}
        name={workspace.name || "Workspace"} // Fallback name for workspace
        joinCode={workspace.joinCode || "No Join Code"} // Fallback join code
      />
      <PreferencesModal
        open={preferencesOpen}
        setOpen={setPreferencesOpen}
        initialvalue={workspace.name || "Workspace"} // Fallback for preferences
      />

      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Projects</SidebarGroupLabel>
        <SidebarMenu>
          {/* Add Video Call Option */}
          <SidebarMenuItem>
            <SidebarMenuButton className="text-sidebar-foreground">
              <VideoIcon className="text-sidebar-foreground" />
              <span><Link href={`/workspaces/${workspace._id}/videocall`}>Video Call</Link></span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {/* Add Video Call Option */}
          <SidebarMenuItem>
            <SidebarMenuButton className="text-sidebar-foreground">
              <WavesIcon className="text-sidebar-foreground" />
              <span><Link href={`/workspaces/${workspace._id}/design`}>Design Flows</Link></span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Add Invite Workspace Option */}
          {isAdmin && (
            <SidebarMenuItem>
              <SidebarMenuButton
                className="text-sidebar-foreground/70"
                onClick={() => setInviteOpen(true)}
              >
                <UserPlus className="text-sidebar-foreground" />
                <span>Invite</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}

          {/* Add Delete Workspace Option */}
          {isAdmin && (
            <SidebarMenuItem>
              <SidebarMenuButton
                className="text-sidebar-foreground/70"
                onClick={() => setPreferencesOpen(true)}
              >
                <Trash2 className="text-sidebar-foreground" />
                <span>Delete Workspace</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}
