import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const Page: React.FC = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Header Section */}
      <header className="h-12 bg-gray-100 flex items-center px-4 shadow-md">
        <SidebarTrigger className="mr-4" />
        <h1 className="text-lg font-semibold">Video Calling</h1>
      </header>

      {/* Main Content: SidebarTrigger + Video Call */}
      <div className="flex flex-grow">
        {/* Sidebar Section */}
        <div className="w-16 flex items-center justify-center border-r border-gray-300">
          <SidebarTrigger />
        </div>

        {/* Video Call Section */}
        <iframe
          src="https://7700585dca04aff5d1ed.vercel.app/"
          className="flex-grow w-full border-none"
          title="Video Calling"
          allow="camera; microphone; display-capture"
        />
      </div>
    </div>
  );
};

export default Page;