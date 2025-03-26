"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { usePanel } from "@/hooks/use-panel";
import { Loader } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import { Thread } from "@/features/messages/components/thread";
import { Profile } from "@/features/members/components/profile";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

interface WorkspaceIdLayoutProps {
  children: React.ReactNode;
}

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
  const { parentMessageId, profileMemberId, onClose } = usePanel();
  const showPanel = !!parentMessageId || !!profileMemberId;

  return (
    <div className="h-full flex flex-col lg:flex-row">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <ResizablePanelGroup
            direction="horizontal"
            autoSaveId="workspace-layout"
            className="flex-1"
          >
            {/* Main Content */}
            <ResizablePanel minSize={40} defaultSize={60} className="flex">
              <div className="flex flex-col flex-1">
                {children}
                <div className="min-h-[80vh] flex-1 rounded-xl bg-muted/50 p-4 md:min-h-min" />
              </div>
            </ResizablePanel>

            {/* Show Panel (Thread/Profile) */}
            {showPanel && (
              <>
                <ResizableHandle withHandle />
                <ResizablePanel
                  minSize={20}
                  defaultSize={30}
                  className="bg-white shadow-lg rounded-md p-4"
                >
                  <div className="flex flex-col h-full">
                    {parentMessageId ? (
                      <div className="h-full overflow-y-auto">
                        <Thread
                          messageId={parentMessageId as Id<"messages">}
                          onClose={onClose}
                        />
                      </div>
                    ) : profileMemberId ? (
                      <div className="h-full overflow-y-auto">
                        <Profile
                          memberId={profileMemberId as Id<"members">}
                          onClose={onClose}
                        />
                      </div>
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Loader className="size-5 animate-spin text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default WorkspaceIdLayout;
